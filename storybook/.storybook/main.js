import path from 'path';
import {WebpackSvgComponentPlugin} from 'monkey-d/modules';

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../static', '../../src/assets', {
    from: "../../src/assets/font",
    to: path.resolve(__dirname, "../../src/assets/font")
  }],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-react-docgen',
  ],
  framework: {
    name: '@storybook/nextjs'
  },
  docs: {
    autodocs: 'tag'
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => {
        return prop.parent ? prop.parent.name !== 'DOMAttributes' && prop.parent.name !== 'HTMLAttributes' && prop.parent.name !== 'AriaAttributes' : true;
      }
    }
  },
  webpackFinal: async (config) => {
    if (!config?.resolve || !config?.module || !config?.plugins) return config;
    if (!config.module.rules) config.module.rules = [];

    config.module.rules.push({
      test: /\.module\.s(a|c)ss$/,
      loader: 'sass-loader',
      options: {
        additionalData: (content) => {
          // :global 블록 내부에 있는지 확인하는 함수
          const isInGlobalScope = (content, position) => {
            const contentBeforePosition = content.slice(0, position);
            const globalBlocks = contentBeforePosition.match(/:global\s*{/g) || [];
            const closingBraces = contentBeforePosition.match(/}/g) || [];
            return globalBlocks.length > closingBraces.length;
          };

          // &:global 블록 내부에 있는지 확인
          const isInNestedGlobalScope = (content, position) => {
            const lines = content.slice(0, position).split('\n');
            return lines.some(line => line.trim().includes('&:global'));
          };

          // 가상 선택자나 특수 선택자가 포함된 라인인지 확인
          const isSpecialSelector = (line) => {
            const specialSelectors = ['&::', '&:', ':global'];
            return specialSelectors.some(selector => line.trim().includes(selector));
          };

          const modifiedContent = content.replace(
            /\.(?!wemixplay-ui)[a-zA-Z][\w-]*/g,
            (match, offset) => {
              // :global 블록 내부이거나 &:global 중첩 구조 내부인 경우 변환하지 않음
              if (isInGlobalScope(content, offset) || isInNestedGlobalScope(content, offset) || isSpecialSelector(content)) {
                return match;
              }
              return `.wm-ui${match}, ${match}`;
            }
          );

          return `
            @import "../src/styles/abstracts/_variables.scss"; 
            @import "../src/styles/abstracts/_mixin.scss";
            
            ${modifiedContent}
          `;
        }
      },
    });

    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            }
          ]
        },
        titleProp: true
      },
      test: /\.svg$/
    });

    config.plugins.push(new WebpackSvgComponentPlugin({
      svgFileDir: '../src/assets/svgs',
      outputDir: '../src/assets/svgs',
      useSvgr: true,
      typescript: true
    }))
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../src')
    };

    return config;
  },
  env: config => ({
    ...config,
    ...process.env
  })
};

export default config;
