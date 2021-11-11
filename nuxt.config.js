export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'proyecto-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://preview.colorlib.com/theme/winter/css/A.style.css.pagespeed.cf.F6SlnAxQ2U.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css' },
    ],
    script:[
       {src: 'js/pace.min.js'}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/styles.css',
    '@/assets/css/responsive.css',
    '@/assets/css/pace.css',
  ],
  script:[
    '@/assets/js/script.js',
    '@/assets/js/pace.min.js',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL: 'http://127.0.0.1:8000'
  //   }
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    'nuxt-sweetalert2',
  //  '@nuxtjs/axios',
  ],
  nuxtValidate: {
    lang: 'es',
    nuxti18n: {
      locale: {
        'zh-CN': 'zh_CN'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['axios']
  },
  axios: {
    baseURL: 'http://127.0.0.1:8000'
  },
  // module.exports = {
  //   build: {
  //     vendor: ['axios']
  //   }
  // }
}
