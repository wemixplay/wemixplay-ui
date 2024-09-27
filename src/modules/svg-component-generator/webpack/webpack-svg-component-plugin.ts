import chokidar from 'chokidar';
import path from 'path';
import SvgComponentGenerator, { type SvgComponentGeneratorOption } from '../svgComponentGenerator';

type WebpackPluginOptions = SvgComponentGeneratorOption & {
  // Types
};

type Compiler = {
  hooks: {
    emit: {
      tap: (name: string, callback: (stats: unknown) => void) => void;
    };
    done: {
      tap: (name: string, callback: (stats: unknown) => void) => void;
    };
  };
  assets: JSONObject;
};

class WebpackSvgComponentPlugin {
  private readonly svgCompGenertor: SvgComponentGenerator;
  private readonly svgFileDir: string;
  private readonly outputDir: string;
  private watcher?: chokidar.FSWatcher;

  constructor({ svgFileDir, outputDir, typescript, title, description }: WebpackPluginOptions) {
    this.svgFileDir = path.join(process.cwd(), svgFileDir);
    this.outputDir = outputDir;
    this.svgCompGenertor = new SvgComponentGenerator({
      svgFileDir,
      outputDir,
      typescript,
      title,
      description
    });
  }

  async apply(compiler: Compiler) {
    compiler.hooks.emit.tap('SvgComponentGeneratorPlugin', (_stats) => {
      void this.svgCompGenertor.generate();
    });

    if (process.env.NODE_ENV === 'development') {
      if (!this.watcher) {
        this.watcher = chokidar.watch(this.svgFileDir, {
          persistent: true,
          ignored: [new RegExp(this.outputDir), /\/svg\/types\//] // outputDir을 감시 대상에서 제외
        });

        this.watcher.on('add', () => this.svgCompGenertor.generate());
        this.watcher.on('unlink', () => this.svgCompGenertor.generate());

        process.once('SIGINT', () => {
          if (this.watcher) {
            this.watcher.close();
          }

          process.exit(0);
        });
      }
    }
  }
}

export default WebpackSvgComponentPlugin;
