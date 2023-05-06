<template>
	<view class="page-writeUserInfo" :style="{paddingTop: ptHeight+'px'}">
		<navbar needBack title="鲜水管家"></navbar>
		<view class="title">
			<view class="title-content">
				完善信息
			</view>
			<view class="title-tip">
				免费领取净水器 · 滤芯免费
			</view>
		</view>
		<view class="form-user-info">
			<view class="form-item">
				<view class="item-label label-name">
					姓名
				</view>
				<van-field input-class="custom-field" :value="userInfo.userName" @change="vanFieldChange('userName', $event)"
					placeholder="请输入姓名" :border="false" />
			</view>
			<view class="form-item">
				<view class="item-label">
					手机号码
				</view>
				<van-field type="number" input-class="custom-field custom-phone" :value="userInfo.phoneNum"
					@change="vanFieldChange('phoneNum', $event)" :border="false" />
			</view>
			<view class="form-item">
				<view class="item-label">
					收获地址
				</view>
				<picker mode="region" @change="bindRegionChange" :value="userInfo.region">
					<view class="custom-picker-class custom-field">
						{{userInfo.region[0]}}，{{userInfo.region[1]}}，{{userInfo.region[2]}}
					</view>
				</picker>
				<!-- <van-field input-class="custom-field" :value="userInfo.local" readonly :border="false" /> -->
			</view>
			<view class="form-item">
				<view class="item-label">
					详细地址
				</view>
				<van-field @change="vanFieldChange('localDetail', $event)" input-class="custom-field" placeholder="请输入详细地址"
					:value="userInfo.localDetail" :border="false" />
			</view>
			<view class="form-item">
				<view class="item-label">
					推荐码
				</view>
				<van-field @tap-icon="scanCode" input-class="custom-field" icon="/static/icon/05_scan.png"
					placeholder="无可暂时不填" placeholder-style="font-size: 24rpx; color: #CECFD0;" :value='referCode'
					:border="false" />
			</view>
			<view class="form-item">
				<van-button @tap="handleClickTransact" class="transaction-btn" type="primary" block round>立即办理</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	export default {
		comments: {
			navbar
		},
		data() {
			return {
				userInfo: {
					userName: "",
					phoneNum: "",
					region: ['重庆市', '重庆市', '渝中区'],
					localDetail: "",
					referCode: '',
				},
				ptHeight: 60,
				wechat_openid: ''
			}
		},
		onLoad(option) {
			this.wechat_openid = option.wechat_openid
			this.userInfo.phoneNum = uni.getStorageSync('phone')
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
		},
		methods: {
			async handleClickTransact() {
				// 校验数据
				for (let key in this.userInfo) {
					if ((this.userInfo[key] === '') && (key !== 'referCode')) {
						uni.showToast({
							title: "请填写完整信息",
							icon: "error"
						})
						return
					}
				}

				// 发送请求
				const {
					phoneNum,
					userName,
					referCode,
					localDetail,
					region
				} = this.userInfo
				const params = {
					phone: phoneNum,
					name: userName,
					refer_code: referCode,
					address_attributes: {
						region: region,
						detail: localDetail,
					},
					wechat_openid: this.wechat_openid
				}
				const {
					statusCode,
					data
				} = await this.$http('/consumer/profile', "POST", params)

				if (statusCode === 201) {
					// 注册成功
					uni.setStorageSync('token', data.token)
					uni.setStorageSync("isLogin", true)
					uni.redirectTo({
						url: '/pages/planMenu/planMenu'
					})
				} else {
					// 注册失败
					uni.showToast({
						title: '注册失败',
						icon: 'error'
					})
				}
			},
			scanCode() {
				uni.scanCode({
					success(res) {
						console.log(res.result);
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			handleClickAddressBtn() {
				uni.chooseAddress({
					success(res) {
						console.log('res', res);
					}
				})
			},
			bindRegionChange(e) {
				this.userInfo.region = e.detail.value
			},
			vanFieldChange(key, {
				detail
			}) {
				this.userInfo[key] = detail
			},
			handleConfirmArea({
				detail
			}) {
				const {
					index,
					values
				} = detail;
				if (values[0].name === values[1].name) {
					this.userInfo.local = values[0].name + values[2].name
				} else {
					this.userInfo.local = values[0].name + values[1].name + values[2].name
				}

				this.showAreaModel = false
			}
		}
	}
</script>

<style lang="less">
	.page-writeUserInfo {
		box-sizing: border-box;
		padding: 0 48rpx;

		.title {
			padding: 70rpx 0;

			.title-content {
				font-size: 48rpx;
				font-weight: 600;
				color: #262626;
			}

			.title-tip {
				font-size: 24rpx;
				font-weight: 400;
				color: #17DA9C;
			}
		}

		.form-user-info {
			.form-item {
				display: flex;

				.item-label {
					min-width: 104rpx;
					line-height: 88rpx;
					color: #828698;
					font-size: 28rpx
				}

				.label-name {
					text-align: justify;
					text-align-last: justify;
				}

				.custom-field {
					width: 462rpx;
					font-size: 36rpx;
					color: #262626;
				}

				.custom-picker-class {
					padding: 10px 16px;
				}

				.custom-phone {
					padding-left: 80rpx;
					position: relative;

					&::after {
						content: "+86";
						display: block;
						position: absolute;
						left: 0;
						top: 0;
						color: #828698;
						font-size: 32rpx;
					}
				}
			}

			.transaction-btn {
				flex: 1;
				margin-top: 56rpx;
			}
		}
	}
</style>