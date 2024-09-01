// import '@/styles/theme.scss';
// import '@/styles/base/_reset.scss';
// import '@/styles/global.scss';
import { useEffect } from 'react'
import '../styles/storybook.scss';
import {pretendard, twkEverett} from '@/constants/font.c';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^(on|handle)(?!Icon)[A-Z].*' },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#141415',
        }
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
    (Story, context) => {
      const backgrounds = context.backgrounds;

      useEffect(() => {
        document.body.setAttribute('data-theme', backgrounds === '#141415' ? 'dark' : 'light');
      }, [backgrounds]);

      return (
        <div className={`storybook-font ${pretendard.variable} ${twkEverett.variable}`}>
          <Story />
        </div>
      )
    }
  ]
};

export default preview;
