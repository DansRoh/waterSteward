<template>
	<view class="page-changePhone">
		<view class="field-box">
			<van-field custom-style="height: 100rpx" label-class="custom-label" input-class="custom-inp" size="lanrge" title-width="100rpx" label="+86" placeholder="输入新号码"
				:value="newPhone" @change="changeNewPhone" type="number"></van-field>
		</view>
		<view class="field-box">
			<van-field title-width="100rpx" input-class="cus-inp-veri" label="验证码" size="large" :value="veriCode"
				@change="changeVeriCode" type="number">
				<van-button @click="handleClickGetVericodeBtn" :disabled="isVericodeBtnDisable" slot="button" size="small" round
					color="#17DA9C">{{vericodeBtnText}}</van-button>
			</van-field>
		</view>
		<van-button @click="handleClickConfirm" :disabled="isDisabled" custom-class="mt60"
			custom-style="width: 590rpx;height: 110rpx; font-size: 36rpx;" round color="#5A92FF" block>完 成</van-button>
	</view>
</template>

<script>
	import {
		isValidPhoneNumber
	} from "../../utils/tool.js"
	export default {
		data() {
			return {
				newPhone: '',
				veriCode: '',
				isVericodeBtnDisable: false,
				vericodeBtnText: '获取验证码'
			};
		},
		computed: {
			isDisabled() {
				return !(isValidPhoneNumber(this.newPhone) && this.veriCode)
			}
		},
		methods: {
			handleClickConfirm() {
				
			},
			changeNewPhone(e) {
				this.newPhone = e.detail
			},
			changeVeriCode(e) {
				this.veriCode = e.detail
			},
			async handleClickGetVericodeBtn() {
				// 校验手机号
				if (!isValidPhoneNumber(this.newPhone)) {
					uni.showToast({
						title: '手机号格式错误',
						icon: "error"
					})
					return
				}
				// 发送请求
				const data = {
					phone: this.newPhone,
					debug: true
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
			}
		}
	}
</script>

<style lang="less">
	.page-changePhone {
		padding-top: 10rpx;
		height: 100vh;
		background-color: #F2F4F7;

		.field-box {
			height: 112rpx;
			margin-top: 20rpx;

			.custom-inp {
				font-size: 36rpx;
				margin-top: 11rpx;
			}

			.cus-inp-veri {
				margin-top: -4rpx;
			}
			.custom-label {
				margin-top: 11rpx;
			}
		}
	}
</style>