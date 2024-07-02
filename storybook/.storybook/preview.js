import '@/styles/theme.scss';
import '@/styles/global.scss';
import '../styles/storybook.scss';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
  },
  decorators: [
    (Story) => {
      return (
          <Story />
      )
    }
  ]
};

export default preview;
