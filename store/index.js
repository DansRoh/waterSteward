// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 0,
		userInfo: {}
	},
	mutations: {
		increment(state) {
			state.count++
		}
	},
	actions: {
		increment({
			commit
		}) {
			commit('increment')
		},
		
	},
	getters: {
		getCount: state => {
			return state.count
		}
	},
})

export default store