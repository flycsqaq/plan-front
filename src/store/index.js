import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Plan from './plan'
import Book from './book'
import Article from './article'
import getters from './getters'
import Color from './color'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Plan,
    Book,
    Article,
    Color
  },
  getters
})
