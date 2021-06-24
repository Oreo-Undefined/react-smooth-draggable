import { defineConfig } from 'umi';
import { resolve as _ } from 'path';
const resolve = (...args) => _(__dirname, ...args);

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  title: 'ant-umi-admin',
  dva: {
    immer: false,
    hmr: true,
  },
  dynamicImport: {
    loading: '@lib/loading',
  },
  links: [
    {
      href: '//at.alicdn.com/t/font_2055185_x819c50wu98.css',
      rel: 'stylesheet',
    },
  ],
  alias: {
    '@config': resolve('./src/config'),
    '@util': resolve('./src/util'),
    '@lib': resolve('./src/lib'),
    '@const': resolve('./src/constant'),
    '@service': resolve('./src/service/index'),
    '@hooks': resolve('./src/hooks'),
  },
  proxy: {
    '/api': {
      target: 'http://39.106.104.216',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
