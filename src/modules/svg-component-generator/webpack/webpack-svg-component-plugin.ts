import chokidar from 'chokidar';
import path from 'path';
import SvgComponentGenerator, { type SvgComponentGeneratorOption } from '../svgComponentGenerator';
import type { Compiler } from 'webpack';

type WebpackPluginOptions = SvgComponentGeneratorOption & {
  // Types
};

class WebpackSvgComponentPlugin {
  private svgCompGenerator: SvgComponentGenerator;
  private readonly svgFileDir: string;
  private readonly outputDir: string;
  private watcher?: chokidar.FSWatcher;

  constructor({ svgFileDir, outputDir, typescript, title, description }: WebpackPluginOptions) {
    this.svgFileDir = path.join(process.cwd(), svgFileDir);
    this.outputDir = outputDir ?? '';
    this.svgCompGenerator = new SvgComponentGenerator({
      svgFileDir,
      outputDir,
      typescript,
      title,
      description
    });
  }

  generate() {
    this.svgCompGenerator.generate();
  }

  async apply(compiler: Compiler) {
    compiler.hooks.compile.tap('WebpackSvgComponentPlugin', () => {
      if (process.env.NODE_ENV === 'development') {
        if (!this.watcher) {
          // Watcher가 이미 존재하지 않는 경우에만 생성
          this.watcher = chokidar.watch(this.svgFileDir, {
            persistent: true,
            ignored: /\/svg\/types\//
          });

          this.watcher.on('add', this.generate);
          this.watcher.on('unlink', this.generate);
        }
      } else {
        void this.svgCompGenerator.generate();
      }

      process.once('SIGINT', () => {
        if (this.watcher) {
          this.watcher.close();
        }

        process.exit(0);
      });
    });

    compiler.hooks.done.tap('WebpackSvgComponentPlugin', () => {
      if (this.watcher) {
        this.watcher.close();
        this.watcher = null;
      }
    });
  }
}

export default WebpackSvgComponentPlugin;
