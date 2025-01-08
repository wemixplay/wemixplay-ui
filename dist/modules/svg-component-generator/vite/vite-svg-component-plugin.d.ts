import { type SvgComponentGeneratorOption } from '../svgComponentGenerator';
type VitePluginOptions = SvgComponentGeneratorOption & {};
declare const ViteSvgComponentPlugin: ({ svgFileDir, outputDir, typescript, title, description }: VitePluginOptions) => {
    name: string;
    buildStart(): void;
    buildEnd(): void;
};
export { ViteSvgComponentPlugin };
