<template>
	<scroll-view scroll-into-view="target-deal" class="page-upPlan">
		<view class="page-title">
			套餐选择
		</view>
		<van-empty v-if="planMenuData.length===0" description="暂无数据" />
		<view v-else class="every-day-plan-box">
			<view class="title">
				每日鲜套餐
				<van-icon class="title-del-icon" name="/static/icon/36_del.png" size="20rpx"></van-icon>
			</view>
			<view class="plan-menu">
				<view @tap="handleClickPlanItem(idx)" class="plan-item-box" :class="selectPlanIdx===idx ? 'activate-plan' : ''"
					v-for="(item,idx) in planMenuData" :key="item.id">
					<view class="item-left">
						<view class="icon">
							¥
						</view>
						<view class="price">
							{{Number(item.price)}}
						</view>
						<view class="unit">
							/月
						</view>
					</view>
					<view v-if="item.type === 4" class="item-right">
						<view class="plan-name">
							{{item.title}}
						</view>
						<view class="plan-tips">
							<view class="stress-box">
								水不限量供应
							</view>
						</view>
					</view>
					<view v-else class="item-right">
						<view class="plan-name">
							{{item.title}}
						</view>
						<view class="plan-tips">
							共<view class="stress-box">
								{{item.amount}}升
							</view>水，相当于5L桶 * <view class="stress-box">
								{{item.amount/5}}桶
							</view>
						</view>
					</view>
					<view v-show="selectPlanIdx === idx" class="plan-item-activate-icon">
						<van-image src="/static/icon/37_activate.png" width="116rpx" height="98rpx"></van-image>
					</view>
				</view>
			</view>
			<view class="plan-required-box">
				<view id="target-deal" class="agreement df">
					<van-checkbox :value="isCheckAgreement" @change="onChangeAgreement">
						我同意鲜水管家*****
					</van-checkbox>
					<view class="c00B8DF" @tap="jumpToProtocol">开通协议</view>
				</view>
			</view>
			<view class="bottom-pay-box">
				<view class="left-price-detail">
					<view class="price">
						实付
						<view class="price-num">
							¥ {{ planMenuData[selectPlanIdx].price }}
						</view>
					</view>
					<view @tap="handleShowPriceDetail" class="price-detail df aic">
						明细
						<van-icon v-if="!isPriceDetailShow" name="/static/icon/21_del02.png" size="34rpx"></van-icon>
						<van-icon v-else name="/static/icon/22_del03.png" size="34rpx"></van-icon>
					</view>
				</view>
				<van-button @tap="handleClickTransact" class="transaction-btn" type="primary" color="#00D893" block
					round>立即办理</van-button>
			</view>
			<!-- 支付明细model -->
			<van-overlay :show="isPriceDetailShow" @tap="()=>{isPriceDetailShow = false}">
				<view v-if="isPriceDetailShow" class="model-price-detail">
					<view class="title">
						支付明细
					</view>
					<view class="bill-list">
						<view class="bill-item">
							<view class="bill-left-desc">
								<view class="bill-type">商品</view>
								<view class="bill-name">{{ planMenuData[selectPlanIdx].title }}</view>
							</view>
							<view class="bill-right-num">¥{{ planMenuData[selectPlanIdx].price }}</view>
						</view>
					</view>
					<view @tap="()=>{isPriceDetailShow = false}" class="close">
						<van-icon name="/static/icon/06_close.png" size="54rpx"></van-icon>
					</view>
				</view>
			</van-overlay>
		</view>
	</scroll-view>
</template>

<script>
	import {
		requestPaymentFun,
		rollTarget
	} from "@/utils/tool.js"
	export default {
		data() {
			return {
				planMenuData: [], // 账单支付明细
				isCheckAgreement: false, // 用户是否同意开通鲜水管家协议
				isPriceDetailShow: false, // 价格明细弹窗是否显示
				selectPlanIdx: 0, // 当前选择的套餐
			};
		},
		computed: {
			curDevIdx() {
				return this.$store.state.curDevIdx
			},
			curDevInfo() {
				return this.$store.state.userInfo.devices[this.curDevIdx]
			}
		},
		onLoad() {
			this.getPlanMenuData()
		},
		methods: {
			onChangeAgreement(e) {
				this.isCheckAgreement = e.detail
			},
			handleClickPlanItem(index) {
				this.selectPlanIdx = index
			},
			// 获取套餐数据
			async getPlanMenuData() {
				try {
					const {
						statusCode,
						data
					} = await this.$http('/consumer/plans', 'GET')
					if (statusCode === 200) {
						this.planMenuData = data.records
					} else {
						uni.showToast({
							title: '网络错误',
							icon: "error"
						})
					}
				} catch (e) {
					//TODO handle the exception
					console.log('服务器错误', e);
				}
			},
			handleClickTransact() {
				const that = this
				console.log(111, this.curDevInfo, this.planMenuData[this.selectPlanIdx].id);
				if (this.curDevInfo.plan_id === this.planMenuData[this.selectPlanIdx].id) {
					uni.showToast({
						title: '您已是该套餐',
						icon: "none"
					})
					return
				}
				if (!this.isCheckAgreement) {
					uni.showToast({
						title: '请勾选用户协议',
						icon: "error"
					})
					// 页面高度跳转至用户协议
					rollTarget('#target-deal', this)
				} else {
					// 微信支付
					uni.login({
						provider: 'weixin',
						async success(loginRes) {
							const params = {
								device_id: that.curDevInfo.id,
								plan_id: that.planMenuData[that.selectPlanIdx].id,
								code: loginRes.code,
								type: "Upgrade"
							}
							const {
								statusCode,
								data
							} = await that.$http('/consumer/orders', 'POST', params)
							if (statusCode === 201) {
								const {
									nonceStr,
									package: prepayId,
									paySign,
									signType,
									timeStamp
								} = data.payment
								// 调用微信支付api
								try {
									const payRes = await requestPaymentFun(prepayId, nonceStr, timeStamp, signType, paySign)
									uni.navigateTo({
										url: `/pages/rechargeSuccess/rechargeSuccess?total=${data.total}&number=${data.number}`
									})
								} catch (e) {
									//TODO handle the exception
									console.log('e', e);
									uni.showToast({
										title: '充值失败',
										icon: "error"
									})
								}
							}
						},
						fail(err) {
							console.log('loginErr', err);
						}
					})
				}
				// uni.navigateTo({
				// 	url: "/pages/recharge/recharge"
				// })
			},
			handleShowPriceDetail() {
				this.isPriceDetailShow = !this.isPriceDetailShow
			},
			jumpToProtocol() {
				uni.navigateTo({
					url: '/pages/protocol/protocol'
				})
			}
		},
	}
</script>

<style lang="less">
	.page-upPlan {
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 160rpx;
		background-color: #F2F4F7;

		.page-title {
			font-size: 48rpx;
			padding: 56rpx 0;
			margin-left: 42rpx;
		}

		.every-day-plan-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			>.title {
				position: relative;
				width: 672rpx;
				line-height: 80rpx;
				border-top-right-radius: 26rpx;
				border-top-left-radius: 26rpx;
				background-color: #00D893;
				font-size: 36rpx;
				color: #FFF;
				text-align: center;

				.title-del-icon {
					position: absolute;
					bottom: -18rpx;
					left: 0;
				}
			}

			>.plan-menu {
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #fff;
				width: 100vw;
				min-height: 870rpx;

				.plan-item-box {
					margin-top: 32rpx;
					overflow: hidden;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-around;
					padding: 26rpx;
					box-sizing: border-box;
					width: 666rpx;
					height: 160rpx;
					background: #FFFFFF;
					border-radius: 28rpx;
					box-shadow: 4rpx 8rpx 48rpx 0rpx rgba(0, 0, 0, 0.17);

					&.activate-plan {
						border: 4rpx solid rgba(0, 216, 147, 1);
					}

					.item-left {
						>view {
							display: inline-block;
							color: #17DA9C;
						}

						.icon {
							font-size: 28rpx;
						}

						.price {
							font-size: 72rpx;
						}

						.unit {
							font-size: 28rpx;
						}
					}

					.item-right {
						width: 400rpx;

						.plan-name {
							font-size: 36rpx;
							color: #000000;

							.plan-type {
								display: inline;
								color: #00D893;
							}
						}

						.plan-tips {
							font-size: 24rpx;
							color: #828698;

							.stress-box {
								display: inline;
								color: #262626;
							}
						}
					}

					.plan-item-activate-icon {
						position: absolute;
						right: -2rpx;
						bottom: -12rpx;
					}
				}
			}

			.plan-required-box {
				padding-bottom: 60rpx;

				.first-recharge-tips {
					padding: 30rpx 0;
				}

				.plan-item-box {
					position: relative;
					overflow: hidden;
					display: flex;
					align-items: center;
					justify-content: space-around;
					padding: 26rpx;
					box-sizing: border-box;
					width: 666rpx;
					height: 160rpx;
					background: #FFFFFF;
					border-radius: 28rpx;
					box-shadow: 4rpx 8rpx 48rpx 0rpx rgba(0, 0, 0, 0.17);
					border: 4rpx solid #000;

					.item-left {
						>view {
							display: inline-block;
							color: #262626;
						}

						.icon {
							font-size: 28rpx;
						}

						.price {
							font-size: 72rpx;
						}

						.unit {
							font-size: 28rpx;
						}
					}

					.item-right {
						width: 400rpx;

						.plan-name {
							font-size: 32rpx;
							color: #23D8FF;
						}

						.plan-tips {
							font-size: 24rpx;
							color: #828698;
						}
					}

					.plan-item-activate-icon {
						position: absolute;
						right: -2rpx;
						bottom: -12rpx;
					}
				}

				.agreement {
					margin-top: 56rpx;
					display: flex;
					justify-content: center;
				}
			}

			.bottom-pay-box {
				position: fixed;
				z-index: 200;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 36rpx;
				padding-bottom: 60rpx;
				bottom: 0;
				box-sizing: border-box;
				width: 100vw;
				height: 160rpx;
				background-color: #FFFFFF;

				.left-price-detail {
					.price {
						display: flex;
						align-items: center;
						font-size: 36rpx;
						color: #262626;

						.price-num {
							margin-left: 30rpx;
							font-size: 48rpx;
							color: #00B8DF;
						}
					}

					.price-detail {
						font-size: 24rpx;
						color: #828698;
					}
				}

				.transaction-btn {
					width: 240rpx;
					height: 96rpx;
				}

				.model-price-bg {
					position: fixed;
					bottom: 158rpx;
					left: 0;
					width: 100vw;
					height: 100vh;
					background-color: rgba(0, 0, 0, 0.6);
				}


			}

			.model-price-detail {
				position: absolute;
				box-sizing: border-box;
				bottom: 158rpx;
				left: 0;
				width: 100vw;
				padding: 50rpx;
				background-color: #F2F4F7;

				.title {
					font-size: 36rpx;
					color: #262626;
					margin-bottom: 48rpx;
				}

				.bill-list {
					.bill-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 650rpx;
						height: 128rpx;

						.bill-left-desc {
							.bill-type {
								font-size: 24rpx;
								color: #828698;
							}

							.bill-name {
								font-size: 32rpx;
								color: #5E5E5E;
							}
						}

						.bill-right-num {
							font-size: 36rpx;
							color: #262626;
						}
					}
				}

				.close {
					position: absolute;
					top: 50rpx;
					right: 50rpx;
				}
			}
		}
	}
</style>