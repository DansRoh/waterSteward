<template>
	<view class="page-login">
		<van-image src="/static/icon/03_waterStewardLogo.png" width="400rpx" height="150rpx" class="logo-box">
		</van-image>
		<van-button :disabled="isBtnLoading" @tap="handleClickWxLogin" icon="/static/icon/01_wechartLogo.png"
			class="login-btn" type="primary" block round>微信授权登录</van-button>
		<van-button :disabled="isBtnLoading" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
			icon="/static/icon/02_phone.png" class="login-btn" color="#23D8FF" plain block hairline round>手机快捷登录</van-button>
	</view>
</template>

<script>
	import {
		debounce,
		throttle
	} from '@/utils/tool.js'
	export default {
		data() {
			return {
				isBtnLoading: false,
			};
		},
		onLoad() {
			// 判断是否有登录
			const isLogin = uni.getStorageSync("isLogin")
			if (isLogin) {
				uni.redirectTo({
					url: '/pages/home/home'
				})
			}
		},
		methods: {
			async getPhoneNumber(e) {
				if (e.detail.code) {
					// 获取到用户手机号和国家码
					const {
						statusCode,
						data
					} = await this.$http('/consumer/profile/phone', 'GET', {
						code: e.detail.code
					})
					if (statusCode === 200) {
						uni.setStorageSync('phone', data.phone)
						uni.setStorageSync('country_code', data.country_code)
						uni.navigateTo({
							url: "/pages/getVerificationCode/getVerificationCode"
						})
					} else {
						uni.showToast({
							title: '网络错误',
							icon: 'error'
						})
					}
				}
			},
			handleClickWxLogin: throttle(function() {
				const that = this
				that.isBtnLoading = true
				wx.login({
					async success(res) {
						const {
							code
						} = res
						if (code) {
							const {
								statusCode,
								data
							} = await that.$http('/consumer/session/wechat', 'PUT', {
								code
							})
							if (statusCode === 201) {
								// 登录成功
								uni.setStorageSync("isLogin", true)
								uni.setStorageSync('token', data.token)
								uni.redirectTo({
									url: '/pages/home/home'
								})
							} else if (statusCode === 424) {
								// 用户未注册
								uni.navigateTo({
									url: '/pages/writeUserInfo/writeUserInfo?wechat_openid=' + data.wechat_openid,
								})
							} else {
								// 登录失败
								uni.showToast({
									title: '登录失败',
									icon: 'error'
								})
							}
						} else {
							wx.showToast('登录失败')
						}
						that.isBtnLoading = false
					},
					fail(e) {
						console.log('e', e);
						uni.showToast({
							title: '微信授权失败',
							icon: 'error'
						})
						that.isBtnLoading = false
					},
				})
			}, 1000)
		}
	}
</script>

<style lang="less">
	.page-login {
		height: 100vh;
		background-color: #F2F4F7;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo-box {
			margin-top: 190rpx;
			margin-bottom: 140rpx;
		}

		.login-btn {
			width: 656rpx;
			height: 96rpx;
			margin-bottom: 40rpx;
		}
	}
</style>