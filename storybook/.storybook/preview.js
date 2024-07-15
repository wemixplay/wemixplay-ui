// import '@/styles/theme.scss';
import '@/styles/global.scss';
import '../styles/storybook.scss';
import {pretendard, twkEverett} from '@/constants/font.c'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^(on|handle)(?!Icon)[A-Z].*' },
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
        <div className={`storybook-font ${pretendard.variable} ${twkEverett.variable}`}>
          <Story />
        </div>
      )
    }
  ]
};

export default preview;
