import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// import Fonts from 'unplugin-fonts/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      VueRouter({
        routesFolder:[
          {
            src: 'src/renderer/src/pages'
          }
        ],
        dts: 'src/renderer/src/typed-router.d.ts',
      }),
      vue({ template: { transformAssetUrls } }),
      Layouts({
        layoutsDirs: 'src/renderer/src/layouts',
        pagesDirs: 'src/renderer/src/pages',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          {
            'vue-router/auto': ['useRoute', 'useRouter'],
          },
          {
            'pinia': ["storeToRefs"]
          }
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Components({
        dts: 'src/components.d.ts',
      }),
      Vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      // Fonts({
      //   google: {
      //     families: [ {
      //       name: 'Roboto',
      //       styles: 'wght@100;300;400;500;700;900',
      //     }],
      //   },
      // }),
    ]
  }
})
