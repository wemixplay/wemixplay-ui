import path from 'path';
import { remove, existsSync, promises } from 'fs-extra';
import _debounce from 'lodash/debounce';
import _startCase from 'lodash/startCase';

const { readdir, writeFile, mkdir } = promises;

export type SvgComponentGeneratorOption = {
  svgFileDir: string;
  outputDir?: string;
  typescript?: boolean;
  title?: boolean;
  description?: boolean;
};

const generating = false;

/**
 * SvgComponentGenerator 클래스는 SVG 파일들을 React 컴포넌트로 변환합니다.
 * 이 클래스는 SVG 파일들이 저장된 디렉토리를 읽고, 각 SVG 파일을 React 컴포넌트로 변환하여
 * 지정된 출력 디렉토리에 저장합니다. TypeScript를 지원하며, 필요에 따라 SVGR을 사용할 수 있습니다.
 */
class SvgComponentGenerator {
  /**
   * SVG 파일들이 위치한 디렉토리 경로
   */
  private readonly svgFileDir: string;
  /**
   * TypeScript를 사용할지 여부
   */
  private readonly typescript: boolean;
  /**
   * 변환된 컴포넌트들이 저장될 출력 디렉토리 경로
   */
  private readonly outputDir: string;
  /**
   * SVG Title 태그를 노출할지 여부
   */
  private readonly title: boolean;
  /**
   * SVG Desc 태그를 노출할지 여부
   */
  private readonly description: boolean;

  /**
   * SvgComponentGenerator 클래스의 생성자입니다.
   * @param {SvgComponentGeneratorOption} SVG 컴포넌트 생성 옵션 객체
   */
  constructor({
    svgFileDir,
    outputDir,
    typescript = false,
    title = false,
    description = false
  }: SvgComponentGeneratorOption) {
    this.svgFileDir = svgFileDir;
    this.outputDir = outputDir ?? svgFileDir;
    this.typescript = typescript;
    this.title = title;
    this.description = description;
  }

  /**
   * SVG 파일 리스트를 파싱하여 타입 정의를 생성합니다.
   * @param {string[]} list SVG 파일 이름 리스트
   * @returns 타입 정의 문자열
   */
  parseSvgListForType(list: string[]) {
    const fileList = list.map((file) => `${file.replace('.svg', '')}`);

    const staticSvgIconName = fileList.map((item) => `'${item}'`).join(' | ') || `''`;
    const svgComponentName =
      fileList
        .map(
          (item) =>
            `'${`Svg${_startCase(item.replace(/\//gi, '-').replace('.svg', '')).replace(/ /gi, '')}'`}`
        )
        .join(' | ') || `''`;
    const particalSvgObj = fileList
      .filter((item) => item.includes('/'))
      .reduce<Record<string, string>>((acc, cur) => {
        const arr = cur.split('/');
        const fileName = arr.pop() || '';

        const directoryPascalName = _startCase(arr.join('-')).replace(/ /gi, '');

        return {
          ...acc,
          [directoryPascalName]: acc[directoryPascalName]
            ? `${acc[directoryPascalName]} | '${fileName}'`
            : `'${fileName}'`
        };
      }, {});

    const particalSvgIconName = Object.entries(particalSvgObj)
      .map(([key, value]) => `export type ${key}IconType = ${value};\n`)
      .join('');

    return { staticSvgIconName, particalSvgIconName, svgComponentName };
  }

  /**
   * SVG 파일 리스트를 파싱하여 파일 객체를 생성하고 React 컴포넌트 문자열을 생성합니다.
   * @param {string[]} list SVG 파일 이름 리스트
   * @returns React 컴포넌트 문자열과 관련 정보
   */
  async parseSvgListForFile(list: string[]) {
    const fileObject = list.reduce<Record<string, string>>((acc, cur) => {
      const fileName = `Svg${_startCase(cur.replace(/\//gi, '-').replace('.svg', '')).replace(/ /gi, '')}`;
      acc = {
        ...acc,
        [fileName]: cur
      };

      return acc;
    }, {});
    const fileList = Object.entries(fileObject);
    const relativePath = path.relative(this.outputDir, this.svgFileDir).replace(/\\/gi, '/');
    const importString = fileList
      .reduce((acc, [key, value]) => {
        acc += `import ${key} from '${relativePath}/${value}';\n`;
        return acc;
      }, '')
      .replace(/\n/gi, '');

    const exportString = fileList
      .reduce((acc, [key, _value], index) => {
        if (index === 0) {
          acc = 'export {\n';
        }

        acc += `${index !== 0 ? ',' : ''}  ${key}\n`;
        if (index === Object.entries(fileObject).length - 1) {
          acc += ' };';
        }

        return acc;
      }, '')
      .replace(/\n/gi, '');

    return { importString, exportString };
  }

  /**
   * 주어진 파일 리스트에서 SVG 파일 이름만 필터링합니다.
   * @param {string[]} list 파일 이름 리스트
   * @returns SVG 파일 이름 리스트
   */
  filterSvgFileNameList(list: string[]) {
    return list.filter((name) => name.endsWith('.svg'));
  }

  /**
   * 지정된 디렉토리에서 SVG 파일 리스트를 읽습니다.
   * @param {string} dir SVG 파일이 위치한 디렉토리 경로
   * @param {string} [dirName=''] 현재 디렉토리 이름
   * @returns SVG 파일 경로 리스트
   */
  readSvgFileList = async (dir: string, dirName = ''): Promise<string[]> => {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map(async (dirent) => {
        const newDirName = `${dirName ? `${dirName}/` : ''}${dirent.name}`;
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() && dirent.name !== 'types'
          ? this.readSvgFileList(res, newDirName)
          : newDirName;
      })
    );
    const concatList = Array.prototype.concat(...files) as string[];

    return concatList;
  };

  /**
   * SVG 타입 파일을 생성합니다.
   * @param {string[]} list SVG 파일 이름 리스트
   */
  async writeSvgTypeFile(list: string[]) {
    if (!this.typescript) {
      return;
    }

    const { staticSvgIconName, particalSvgIconName, svgComponentName } =
      this.parseSvgListForType(list);

    const typeDir = `${this.outputDir}/types`;

    await mkdir(typeDir, { recursive: true });

    if (existsSync(typeDir)) {
      return writeFile(
        `${typeDir}/index.d.ts`,
        `/* eslint-disable */\nexport type StaticSvgIconName = ${staticSvgIconName};\n${particalSvgIconName}` +
          `export type SvgComponentName = ${svgComponentName}`,
        { flag: 'w' }
      )
        .then(() => {
          console.log('✨[Static Svg Type File] is Generated!');
        })
        .catch(console.error);
    }
  }

  /**
   * 정적 SVG export 파일을 생성합니다.
   * @param {string[]} list SVG 파일 이름 리스트
   */
  async writeStaticSvgExportFile(list: string[]) {
    const { importString, exportString } = await this.parseSvgListForFile(list);

    const toBeDeleteFile = `${this.outputDir}/index.${this.typescript ? 'jsx' : 'tsx'}`;
    const toBeMakeFile = `${this.outputDir}/index.${this.typescript ? 'tsx' : 'jsx'}`;

    await mkdir(this.outputDir, { recursive: true });

    if (existsSync(toBeDeleteFile)) {
      remove(toBeDeleteFile);
    }

    return writeFile(
      toBeMakeFile,
      `/* eslint-disable */ \nimport React from "react";\n\n${importString}\n${exportString}`,
      { flag: 'w' }
    )
      .then(() => {
        console.log('✨[Static Svg Export File] is Generated!');
      })
      .catch(console.error);
  }

  generate = _debounce(async () => {
    const fileNameList = await this.readSvgFileList(this.svgFileDir);
    const svgFileList = this.filterSvgFileNameList(fileNameList);

    await this.writeSvgTypeFile(svgFileList);
    await this.writeStaticSvgExportFile(svgFileList);
  }, 1500);
}

export default SvgComponentGenerator;
