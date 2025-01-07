// import '@/styles/theme.scss';
// import '@/styles/base/_reset.scss';
// import '@/styles/global.scss';
import { useEffect, useState } from 'react'
import '../styles/storybook.scss';
import {pretendard, twkEverett} from '@/constants/font.c';
import WemixplayUIProvider from '@/providers/WemixplayUi';
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
      const backgrounds = context.globals?.backgrounds?.value;

      const [theme, setTheme] = useState('light');

      useEffect(() => {
        console.log('backgrounds', backgrounds);
        setTheme(backgrounds === '#141415' ? 'dark' : 'light');
      }, [backgrounds]);

      return (
        <div className={`storybook-font ${pretendard.variable} ${twkEverett.variable}`}>
            <WemixplayUIProvider theme={theme}>
              {/* Story의 내용이 WemixplayUIProvider의 컨텍스트를 사용합니다. */}
              <Story />
            </WemixplayUIProvider>
     
        </div>
      )
    }
  ]
};

export default preview;
