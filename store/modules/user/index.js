// store/modules/user/index.js

const state = {
  userInfo: {
		name: 'luoda'
	}
}

const mutations = {
  SET_USER_INFO (state, payload) {
    state.userInfo = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
