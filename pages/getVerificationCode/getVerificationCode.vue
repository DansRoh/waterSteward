<template>
	<view class="page-getVerificationCode">
		<view class="title">
			<view class="title-content">
				登录/注册
			</view>
			<view class="title-tip">
				省心入户·鲜水管家欢迎你~
			</view>
		</view>

		<view class="form-phone-verification">
			<van-field :value="phoneNum" type="number" clearable label="+86" placeholder="请输入手机号" @change="(e)=>{phoneNum = e.detail}"
				:border="true" />
			<van-field :value="veriCode" type="number" @change="(e)=>{veriCode = e.detail}" placeholder="请输入验证码" center
				clearable label="验证码" :border="true" use-button-slot>
				<van-button :disabled="isVericodeBtnDisable" type="primary" size="small" color="#fff"
					custom-style="color:#00D893" @tap="handleClickGetVericodeBtn" slot="button" class="get-vericode-btn">
					{{vericodeBtnText}}
				</van-button>
			</van-field>
			<van-button :disabled="!Boolean(''+veriCode)" @click="handleClickLogin" class="login-btn" type="primary" block
				round>立即登录</van-button>
		</view>
	</view>
</template>

<script>
	import {
		isValidPhoneNumber
	} from "../../utils/tool.js"
	export default {
		data() {
			return {
				veriCode: '', // 验证码
				vericodeBtnText: "获取验证码",
				isVericodeBtnDisable: false,
				phoneNum: ''
			};
		},
		onShow() {
			this.phoneNum = uni.getStorageSync("phone")
		},
		methods: {
			async handleClickLogin() {
				const params = {
					phone: this.phoneNum,
					code: this.veriCode
				}
				const {
					data,
					statusCode
				} = await this.$http('/consumer/session/sms', "PUT", params)
				if (statusCode === 201) {
					uni.setStorageSync('token', data.token)
					// 判断用户是否办理过套餐
					if (!data.devices.length) {
						uni.navigateTo({
							url: "/pages/planMenu/planMenu"
						})
						return
					}
					// 登录成功
					uni.redirectTo({
						url: '/pages/home/home'
					})
				} else if (statusCode === 424) {
					// 用户未注册
					uni.setStorageSync("phone", this.phoneNum)
					uni.navigateTo({
						url: "/pages/writeUserInfo/writeUserInfo"
					})
				} else {
					uni.showToast({
						title: '网络错误',
						icon: 'error'
					})
				}
			},
			async handleClickGetVericodeBtn() {
				// 校验手机号
				if (!isValidPhoneNumber(this.phoneNum)) {
					uni.showToast({
						title: '手机号格式错误',
						icon: "error"
					})
					return
				}

				this.isVericodeBtnDisable = true;
				this.vericodeBtnText = "剩余60s"
				let num = 59
				const vericodeBtnTimer = setInterval(() => {
					if (num === 0) {
						this.vericodeBtnText = "获取验证码";
						this.isVericodeBtnDisable = false
						clearInterval(vericodeBtnTimer);
					} else {
						this.vericodeBtnText = "剩余" + num + "s"
						num--;
					}
				}, 1000)
				// 发送请求
				const data = {
					phone: this.phoneNum,
					debug: false
				}
				// 获取验证码
				const {
					statusCode
				} = await this.$http('/consumer/verify_codes/register', "POST", data)
				if (statusCode !== 201) {
					uni.showToast({
						title: '获取验证码失败',
						icon: 'error'
					})
					return
				}
			}

		}
	}
</script>

<style lang="less">
	.page-getVerificationCode {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		padding-top: 66rpx;

		.title {
			width: 626rpx;
			padding: 0 30rpx;
			align-self: center;
			margin-bottom: 90rpx;

			.title-content {
				font-size: 48rpx;
				font-weight: 600;
				color: #262626;
				;
			}

			.title-tip {
				font-size: 24rpx;
				font-weight: 400;
				color: #828698;
			}
		}

		.form-phone-verification {
			display: flex;
			flex-direction: column;
			align-self: center;
			width: 656rpx;

			.get-vericode-btn {
				color: #00D893;
				font-size: 24rpx;
			}

			.login-btn {
				margin-top: 64rpx;
			}
		}
	}
</style>