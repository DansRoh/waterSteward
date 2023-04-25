import data from 'area-data'
import request from '../request.js'

// 获取验证码
export const apiregister = async (params) => {
	return await request('/consumer/verify_codes/register', "POST", params)
}

// 手机号登录
export const apisms = (params) => {
	return request('/consumer/session/sms', "PUT", params)
}

// 微信登录
export const apiwechat = (params) => {
	return request('/consumer/session/wechat', 'PUT', params)
}

//获取账户信息
export const apiprofile = () => {
	return request('/consumer/profile', 'GET')
}