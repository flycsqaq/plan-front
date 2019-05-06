import { getPlan, postPlan, putPlan, deletePlan } from '@/api/plan'

const state = {
  plan: []
}

const mutations = {
  GET_PLAN(state, data) {
    state.plan = data
  }
}

const actions = {
  getPlan({ commit }) {
    return new Promise((resolve, reject) => {
      getPlan()
        .then(res => {
          const { data } = res
          commit('GET_PLAN', data)
          resolve()
        }).catch(error => reject(error))
    })
  },
  postPlan({ dispatch }, planInfo) {
    return new Promise((resolve, reject) => {
      const { title, time, end, description, isCompleted = false } = planInfo
      postPlan({ title, time, end, description, isCompleted })
        .then(() => {
          dispatch('getPlan')
            .then(() => resolve())
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  },
  putPlan({ dispatch }, planInfo) {
    return new Promise((resolve, reject) => {
      const { id, title, time, end, description, isCompleted = false } = planInfo
      putPlan(id, { title, time, end, description, isCompleted })
        .then(() => {
          dispatch('getPlan')
            .then(() => resolve())
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  },
  deletePlan({ dispatch }, id) {
    return new Promise((resolve, reject) => {
      deletePlan(id)
        .then(() => {
          dispatch('getPlan')
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
