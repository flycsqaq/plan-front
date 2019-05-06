import { getBook, postBook, putBook, deleteBook } from '@/api/book'

const state = {
  book: []
}

const mutations = {
  GET_BOOK(state, data) {
    state.book = data
  }
}

const actions = {
  getBook({ commit }) {
    return new Promise((resolve, reject) => {
      getBook()
        .then(res => {
          const { data } = res
          commit('GET_BOOK', data)
          resolve()
        }).catch(error => reject(error))
    })
  },
  postBook({ dispatch }, bookInfo) {
    return new Promise((resolve, reject) => {
      const { name, author, picture } = bookInfo
      postBook({ name, author, picture })
        .then(() => {
          dispatch('getBook')
            .then(() => resolve())
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  },
  putBook({ dispatch }, bookInfo) {
    return new Promise((resolve, reject) => {
      const { id, name, author, picture } = bookInfo
      putBook(id, { name, author, picture })
        .then(() => {
          dispatch('getBook')
            .then(() => resolve())
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  },
  deleteBook({ dispatch }, id) {
    return new Promise((resolve, reject) => {
      deleteBook(id)
        .then(() => {
          dispatch('getBook')
            .then(() => resolve())
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
