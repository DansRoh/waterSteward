// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		curDevIdx: 0, // 当前选择净水器的索引
	},
	mutations: {
		changeCurDevIdx(state, idx) {
			state.curDevIdx = idx
		}
	},
	actions: {
	},
	getters: {
		getCount: state => {
			return state.count
		}
	},
})

export default store