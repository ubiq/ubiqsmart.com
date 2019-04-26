const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00ea90' },

  /*
  ** Global CSS
  */
  css: [
    '@/scss/style.scss'
  ],

  /*
  ** router middleware
  */
  router: {
    middleware: 'i18n'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
    { src: '~/plugins/clipboard.js', ssr: false },
    { src: '~/plugins/particles.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/vaso2/nuxt-fontawesome#readme
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        // import brand icons (fab)
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faWindows', 'faApple', 'faLinux', 'faChrome', 'faAndroid', 'faTwitter', 'faGithub', 'faYoutube', 'faLinkedin', 'faReddit', 'faMedium', 'faDiscord']
        },
        // import solid icons (fas)
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faUser', 'faUsers', 'faWallet']
        }
      ]
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
