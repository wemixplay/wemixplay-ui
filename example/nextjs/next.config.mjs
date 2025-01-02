import { WebpackSvgComponentPlugin } from 'wemixplay-ui/modules'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {

    if (!isServer) {

      config.resolve.fallback = {
        fs: false,
      };
    }

      const fileLoaderRule = config.module.rules.find(
        (rule) => typeof rule.test === 'string' && rule.test.test('.svg')
      );
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/;
      }

      config.module.rules.push(
        {
          test: /\.svg$/,
          use: {
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
            }
          }
        }
      );
      /**
       * public/imgs/svgs 디렉토리에 svg 파일이 추가/이동/삭제 되었을때 자동으로 감지하여
       * 'src/public/components/atom/svgs' 디렉토리 index.tsx파일에 컴포넌트로 변환하여 export
       */
      config.plugins.push(
        new WebpackSvgComponentPlugin({
          svgFileDir: 'public/assets/imgs/svgs',
          outputDir: 'src/shared/components/atom/svgs',
          typescript: true
        })
      );

      
     

    return {
        ...config
      };
  }
};

export default nextConfig;
