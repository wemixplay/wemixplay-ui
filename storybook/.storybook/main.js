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
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    'storybook-addon-react-docgen'
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
      test: /\.s(a|c)ss$/,
      loader: 'sass-loader',
      options: {
        additionalData:  `
          @import "../src/styles/abstracts/_variables.scss"; 
          @import "../src/styles/abstracts/_mixin.scss";
          @import "../src/styles/abstracts/_animation.scss";
          @import "../src/styles/base/_reset.scss";
          @import "../src/styles/theme.scss";
        `
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
