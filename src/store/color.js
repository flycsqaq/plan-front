const state = {
  color: ['#303f9f', '#f50057']
}

const mutations = {
  CHANGE_COLOR(state, color) {
    const { main, assist } = color
    state.color = [main, assist]
  }
}

const actions = {
  changeColor({ commit }, payload) {
    commit('CHANGE_COLOR', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
