<template>
	<view class="page-writeUserInfo">
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
				<view class="item-label">
					姓名
				</view>
				<van-field input-class="custom-field" :value="userInfo.userName" @change="vanFieldChange('userName', $event)"
					placeholder="请输入姓名" :border="false" />
			</view>
			<view class="form-item">
				<view class="item-label">
					身份证号
				</view>
				<van-field input-class="custom-field" placeholder-style="font-size: 24rpx; color: #CECFD0;" :value='userInfo.id'
					@change="vanFieldChange('id', $event)" :border="false">
					<view slot="right-icon">
						<ocr-navigator @onSuccess="scanId" certificateType="idCard" :opposite="false">
							<button class="scanId-btn"
								style="background-color: #fff;line-height: unset;padding: 0;margin: 0;display: flex;overflow: visible;"
								type="primary"><van-icon name="/static/icon/05_scan.png" size="32rpx"></van-icon></button>
						</ocr-navigator>
					</view>
				</van-field>
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
					安装地址
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
			<view class="form-item accept-protocol">
				<van-checkbox :value="isAccept" shape="square" @change="onChangeIsAccept">
					我已阅读并同意
				</van-checkbox>
				<text class="c00B8DF" @tap="jumpToProtocol(1)">使用条款、</text><text class="c00B8DF"
					@tap="jumpToProtocol(2)">隐私政策</text>
			</view>
			<view class="form-item">
				<van-button @tap="handleClickTransact" class="transaction-btn" type="primary" block round>立即办理</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isValidPhoneNumber,
		validateIdNumber
	} from '../../utils/tool.js'
	export default {
		comments: {},
		data() {
			return {
				userInfo: {
					userName: "",
					phoneNum: "",
					region: ['重庆市', '重庆市', '渝中区'],
					localDetail: "",
					id: '',
				},
				wechat_openid: '',
				isAccept: false
			}
		},
		onLoad() {
			this.wechat_openid = uni.getStorageSync('wechat_openid')
			this.userInfo.phoneNum = uni.getStorageSync('phone')
		},
		methods: {
			jumpToProtocol(type) {
				switch (type) {
					case 1:
						uni.navigateTo({
							url: "/pages/userServerProtocol/userServerProtocol"
						})
						break;
					case 2:
						uni.navigateTo({
							url: "/pages/privacyProtocol/privacyProtocol"
						})
						break;
					default:
						break;
				}
			},
			onChangeIsAccept(e) {
				this.isAccept = e.detail
			},
			async handleClickTransact() {
				// 校验数据
				for (let key in this.userInfo) {
					if ((this.userInfo[key] === '')) {
						uni.showToast({
							title: "请填写完整信息",
							icon: "error"
						})
						return
					}
				}
				if (this.userInfo.userName.length < 2 || this.userInfo.userName.length > 9) {
					uni.showToast({
						title: '限制2-9个字符',
						icon: 'error'
					})
					return
				}
				if (!isValidPhoneNumber(this.userInfo.phoneNum)) {
					uni.showToast({
						title: '手机号格式错误',
						icon: 'error'
					})
					return
				}
				if (!validateIdNumber(this.userInfo.id)) {
					uni.showToast({
						title: '身份证格式错误',
						icon: 'error'
					})
					return
				}

				// 同意协议
				if (!this.isAccept) {
					uni.showToast({
						title: "请阅读并同意协议",
						icon: "none"
					})
					return
				}

				// 发送请求
				const {
					phoneNum,
					userName,
					localDetail,
					region
				} = this.userInfo
				const params = {
					phone: phoneNum,
					name: userName,
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
					uni.redirectTo({
						url: `/pages/planMenu/planMenu`
					})
				} else {
					// 注册失败
					uni.showToast({
						title: '注册失败',
						icon: 'error'
					})
				}
			},
			scanId(e) {
				this.userInfo.id = e.detail.id.text
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
				.scanId-btn::after {
					display: none;
					content: '';
				}

				.item-label {
					width: 134rpx;
					line-height: 88rpx;
					color: #828698;
					font-size: 28rpx
				}

				.custom-field {
					flex: 1;
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

			.accept-protocol {
				margin-top: 60rpx;
				justify-content: center;
				align-items: center;
			}

			.transaction-btn {
				flex: 1;
				margin-top: 56rpx;
			}
		}
	}
</style>