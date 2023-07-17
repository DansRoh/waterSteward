<template>
	<view class="page-newDevInfoWrite">
		<view class="title">
			<view class="title-content">
				完善信息
			</view>
		</view>
		<view class="form-user-info">
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
			<view class="form-item">
				<view class="item-label">
					推荐码
				</view>
				<van-field @click-icon="scanCode" @change="vanFieldChange('referCode', $event)" input-class="custom-field" icon="/static/icon/05_scan.png"
					placeholder="请填写推荐码" placeholder-style="font-size: 24rpx; color: #CECFD0;" :value='userInfo.referCode'
					:border="false" />
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
					region: ['重庆市', '重庆市', '渝中区'],
					localDetail: "",
					referCode: '',
				},
			}
		},
		methods: {
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
				const params = {
					region: this.userInfo.region,
					detail: this.userInfo.localDetail,
					default: false
				}
				const {
					statusCode,
					data
				} = await this.$http("/consumer/addresses", "post", params)
				if (statusCode === 201) {
					uni.navigateTo({
						url: `/pages/planMenu/planMenu?address_id=${data.id}&refer_code=${this.userInfo.referCode}`
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
			scanId(e) {
				this.userInfo.id = e.detail.id.text
			},
			bindRegionChange(e) {
				console.log(e);
				if (e.detail.code[2] !== "500103") {
					uni.showToast({
						title: "当前地区暂不支持"
					})
				}
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
	.page-newDevInfoWrite {
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
					min-width: 110rpx;
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