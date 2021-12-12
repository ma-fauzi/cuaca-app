import Cuaca from '@/api/cuaca'

const init = {
  list: [],
  info: {},
  infoFromClick: {}
}

export const state = () => init

export const getters = {
  list (state) {
    return state.list
  },
  info (state) {
    return state.info
  },
  infoFromClick (state) {
    return state.infoFromClick
  }
}

export const mutations = {
  setList (state, payload) {
    if (!payload) { return }
    state.list = payload
  },
  removeList (state) {
    state.list = []
  },
  setInfo (state, payload) {
    if (!payload) { return }
    state.info = payload
  },
  removeInfo (state) {
    state.info = {}
  },
  setInfoFromClick (state, payload) {
    if (!payload) { return }
    state.infoFromClick = payload
  },
  removeInfoFromClick (state) {
    state.infoFromClick = {}
  }
}

export const actions = {
  async getCuaca ({ commit }, data) {
    try {
      const dtCuaca = await Cuaca.getCuaca(data)
      commit('setList', dtCuaca)
    } catch (err) {
      commit('removeList')
      return Promise.reject(err)
    }
  },
  async getDetailCuaca ({ commit }, data) {
    try {
      const dtDetail = await Cuaca.getDetailCuaca(data)
      commit('setInfo', dtDetail)
    } catch (err) {
      commit('removeInfo')
      return Promise.reject(err)
    }
  },
  async getDetailCuacaByClick ({ commit }, data) {
    try {
      const dtDetail = await Cuaca.getDetailCuaca(data)
      commit('setInfoFromClick', dtDetail)
    } catch (err) {
      commit('removeInfoFromClick')
      return Promise.reject(err)
    }
  }
}
