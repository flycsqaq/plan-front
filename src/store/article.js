import { getArticle, postArticle, putArticle, deleteArticle } from '@/api/book'

const state = {
  article: []
}

const mutations = {
  GET_ARTICLE(state, data) {
    state.article = data
  }
}

const actions = {
  getArticle({ commit }) {
    return new Promise((resolve, reject) => {
      getArticle()
        .then(res => {
          const { data } = res
          commit('GET_ARTICLE', data)
          resolve()
        }).catch(error => reject(error))
    })
  },
  postArticle({ dispatch }, articleInfo) {
    return new Promise((resolve, reject) => {
      const { title, time, description, body, book } = articleInfo
      postArticle({ title, time, description, body, book })
        .then(() => {
          dispatch('getArticle')
            .then(() => resolve())
            .catch(error => reject(error))
        }).then(error => reject(error))
    })
  },
  putArticle({ dispatch }, articleInfo) {
    return new Promise((resolve, reject) => {
      const { id, title, time, description, body, book } = articleInfo
      putArticle(id, { title, time, description, body, book })
        .then(() => {
          dispatch('getArticle')
            .then(() => resolve())
            .catch(error => reject(error))
        }).then(error => reject(error))
    })
  },
  deleteArticle({ dispatch }, id) {
    return new Promise((resolve, reject) => {
      deleteArticle(id)
        .then(() => {
          dispatch('getArticle')
            .then(() => resolve())
            .catch(error => reject(error))
        }).then(error => reject(error))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
