// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 0,
		userInfo: {},
		curDevIdx: 0, // 当前选择净水器的索引
	},
	mutations: {
		increment(state) {
			state.count++
		},
		changeCurDevIdx(state, idx) {
			state.curDevIdx = idx
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