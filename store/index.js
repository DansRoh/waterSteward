// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import {
	request
} from "../utils/request.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		curDevIdx: 0, // 当前选择净水器的索引
		userInfo: {}, // 用户信息
	},
	mutations: {
		changeCurDevIdx(state, idx) {
			state.curDevIdx = idx
		},
		changeUserInfo(state, data) {
			state.userInfo = data
		}
	},
	actions: {
		async changeUserInfoSync({
			commit
		}) {
			const {
				statusCode,
				data
			} = await request('/consumer/profile', 'get')
			console.log('userInfo', data);
			if (statusCode === 200) {
				commit('changeUserInfo', data)
			}
		}
	},
	getters: {
		getCount: state => {
			return state.count
		}
	},
})

export default store