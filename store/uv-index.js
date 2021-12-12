import UvIndex from '@/api/uv-index'

const init = {
  info: {}
}

export const state = () => init

export const getters = {
  info (state) {
    return state.info
  }
}

export const mutations = {
  setInfo (state, payload) {
    if (!payload) { return }
    state.info = payload
  },
  removeInfo (state) {
    state.info = {}
  }
}

export const actions = {
  async getUvIndex ({ commit }, data) {
    try {
      const dtCuaca = await UvIndex.getUvIndex(data)
      commit('setInfo', dtCuaca)
    } catch (err) {
      commit('removeInfo')
      return Promise.reject(err)
    }
  }
}
