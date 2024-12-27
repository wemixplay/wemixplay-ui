import { type SvgComponentGeneratorOption } from '../svgComponentGenerator';
import type { Compiler } from 'webpack';
type WebpackPluginOptions = SvgComponentGeneratorOption & {};
declare class WebpackSvgComponentPlugin {
    private svgCompGenerator;
    private readonly svgFileDir;
    private readonly outputDir;
    private watcher?;
    constructor({ svgFileDir, outputDir, typescript, title, description }: WebpackPluginOptions);
    apply(compiler: Compiler): Promise<void>;
}
export default WebpackSvgComponentPlugin;
