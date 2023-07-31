import { Environments } from "./enviroment";

const appEnv = process.env.NODE_ENV || 'development'
let ENV_DATA = (appEnv in Environments[appEnv]) ? Environments[appEnv] : process.env
const THEME = ENV_DATA?.THEME || 'default'

export default defineNuxtConfig({
  ssr: true,
  dir: {
    middleware: `middlewares`,
    pages: `themes/${THEME}/pages`,
    assets: `themes/${THEME}/assets`,
    public: `themes/${THEME}/public`,
    layouts: `themes/${THEME}/layouts`,
  },

  components: {
    dirs: [`~/themes/${THEME}/components`],
  },

  modules: ["@nuxtjs/device"],  
  
  sourcemap: {
    "server": false,
    "client": false
  },
  
  runtimeConfig: {
    public: { ...ENV_DATA }, //process.env
  },
  
  app: {
    keepalive: false,
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
