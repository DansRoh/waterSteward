<template>
	<view class="page-login" :style="{paddingTop: ptHeight+'px'}">
		<navbar needBack title="鲜水管家"></navbar>
		<van-image src="/static/icon/03_waterStewardLogo.png" width="400rpx" height="150rpx" class="logo-box">
		</van-image>
		<van-button @click="handleClickWxLogin" icon="/static/icon/01_wechartLogo.png"  class="login-btn" type="primary"
			block round>微信授权登录</van-button>
		<van-button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" icon="/static/icon/02_phone.png"
			class="login-btn" type="info" color="#23D8FF" block plain hairline round>手机快捷登录</van-button>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	export default {
		components: {
			navbar
		},
		data() {
			return {
				ptHeight: 60
			};
		},
		onLoad() {
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
		},
		methods: {
			async getPhoneNumber(e) {
				if (e.detail.code) {
					// 获取到用户手机号和国家码
					const { statusCode, data } = await this.$http('/consumer/profile/phone', 'GET', {code: e.detail.code})
					if(statusCode === 200) {
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
				console.log(e)
			},
			handleClickWxLogin() {
				const that = this
				wx.login({
					async success(res) {
						const {
							code
						} = res
						if (code) {
							const {
								statusCode,
								wechat_openid,
								token
							} = await that.$http('/consumer/session/wechat', 'PUT', {
								code
							})
							if (statusCode === 201) {
								// 登录成功
								uni.setStorageSync("isLogin", true)
								uni.setStorageSync("token", token)
								uni.redirectTo({
									url: '/pages/home/home'
								})
							} else if (statusCode === 424) {
								// 用户未注册
								uni.navigateTo({
									url: '/pages/writeUserInfo/writeUserInfo?wechat_openid=' + wechat_openid,
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
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.page-login {
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