import Vue from 'vue'
import Vuex from 'vuex'

import dafn from './module/datafn'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dafn
  },
  strict: process.env.NODE_ENV !== 'production'
})
