import path from 'path';

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../static'],
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
        ` +
        "$env: '" +
        process.env.NEXT_PUBLIC_S3_BUCKET_URL +
        "';"
      },
    });

    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../src'),
    };

    return config;
  },
  env: config => ({
    ...config,
    ...process.env
  })
};

export default config;
