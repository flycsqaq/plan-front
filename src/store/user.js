import { login, logout } from '@/api/user'
import { saveToken, getToken } from '@/api/token'

const state = {
  username: window.localStorage['fyUsername'],
  token: getToken()
}

const mutations = {
  LOGIN(state, { token, username }) {
    state.token = token
    state.username = username
  },
  LOGOUT(state) {
    state.token = ''
    state.username = ''
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username = '', password = '' } = userInfo
    return new Promise((resolve, reject) => {
      login(username, password)
        .then(res => {
          const { data } = res
          commit('LOGIN', { token: data.token, username })
          saveToken(res.data.token, username)
          resolve()
        }).catch(error => reject(error))
    })
  },
  logout({ commit }) {
    logout()
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
