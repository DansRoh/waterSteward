<template>
	<scroll-view scroll-into-view="target-deal" class="page-planMenu">
		<view class="every-day-plan-box">
			<view class="title">
				套餐选择
				<van-icon class="title-del-icon" name="/static/icon/36_del.png" size="20rpx"></van-icon>
			</view>
			<view class="plan-section-spacing">
				<scroll-view :scroll-left="curItemScroll" :scroll-with-animation="true" class="plan-list" :scroll-x="true">
					<view :id="'item'+idx" v-for="(item,idx) in planMenuData" :key="item.id" class="plan-item" :class="curPlanIdx===idx ? 'activate-plan' : ''"
						@tap="handleClickPlanItem(idx)">
						<view class="plan-item-wrapper">
							<view class="plan-name">
								{{item.title}}
							</view>
							<view class="plan-detail">
								{{ planDetails.find(val => val.type === item.type).detail }}
								<br>
								{{ planDetails.find(val => val.type === item.type).tip }}
							</view>
							<view class="price-box">
								¥
								<text class="price">
									{{item.price}}
								</text>
								/月
							</view>
							<view v-show="curPlanIdx === idx" class="plan-item-activate-icon">
								<van-image src="/static/icon/37_activate.png" width="116rpx" height="98rpx"></van-image>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<view class="plan-required-box">
				<template v-if="isHaveServicePrice">
					<view class="first-recharge-tips">
						首充金额
					</view>
					<view class="plan-item-box">
						<view class="qeury-icon">
							?
						</view>
						<view class="item-left">
							<view class="icon">
								¥
							</view>
							<view class="price">
								360
							</view>
						</view>
						<view class="item-right">
							<view class="plan-name">
								基础服务费，全额逐月返！
							</view>
							<view class="plan-tips">
								月套餐: 每月返10元
							</view>
							<view class="plan-tips">
								年套餐: 每年返120元
							</view>
						</view>
						<view class="plan-item-activate-icon">
							<van-image src="/static/icon/38_required.png" width="116rpx" height="98rpx"></van-image>
						</view>
					</view>
				</template>
				<view class="refer-code">
					<van-field label="推荐码" @click-icon="scanCode" @change="vanFieldChange" icon="/static/icon/05_scan.png"
						placeholder="推荐码必填" placeholder-style="font-size: 24rpx; color: #CECFD0;" :value='refer_code'
						:border="false" />
				</view>
				<view id="target-deal" class="agreement">
					<van-checkbox :value="isCheckAgreement" @change="onChangeAgreement">
						我同意鲜水管家*****
					</van-checkbox>
					<view class="c00B8DF" @tap="jumpToProtocol">开通协议</view>
				</view>
			</view>
		</view>
		<view class="bottom-pay-box">
			<view class="left-price-detail">
				<view class="price">
					实付
					<view class="price-num">
						¥ {{(isHaveServicePrice ? 350 : 0) + Number(planMenuData[curPlanIdx] && planMenuData[curPlanIdx].price)}}
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
		<van-overlay :show="isPriceDetailShow" z-index="300">
			<view v-if="isPriceDetailShow" class="model-price-detail">
				<view class="title">
					支付明细
				</view>
				<view class="bill-list">
					<view v-if="isHaveServicePrice" class="bill-item">
						<view class="bill-left-desc">
							<view class="bill-type">商品</view>
							<view class="bill-name">首充金额</view>
						</view>
						<view class="bill-right-num">¥360</view>
					</view>
					<view class="bill-item">
						<view class="bill-left-desc">
							<view class="bill-type">商品</view>
							<view class="bill-name">{{ planMenuData[curPlanIdx].title }}</view>
						</view>
						<view class="bill-right-num">¥{{ planMenuData[curPlanIdx].price }}</view>
					</view>
					<view v-if="isHaveServicePrice" class="bill-item">
						<view class="bill-left-desc">
							<view class="bill-type">优惠</view>
							<view class="bill-name">首充每月返</view>
						</view>
						<view class="bill-right-num">-¥10</view>
					</view>
				</view>
				<view @tap="()=>{isPriceDetailShow = false}" class="close">
					<van-icon name="/static/icon/06_close.png" size="54rpx"></van-icon>
				</view>
			</view>
		</van-overlay>
	</scroll-view>
</template>

<script>
	import {
		requestPaymentFun,
		rollTarget,
		rollTargetX
	} from "@/utils/tool.js"
	export default {
		data() {
			return {
				planMenuData: [],
				isCheckAgreement: false, // 用户是否同意开通鲜水管家协议
				isPriceDetailShow: false, // 价格明细弹窗是否显示
				curPlanIdx: 0, // 当前选择的套餐
				isHaveFirst: true, // 是否有首充
				address_id: '',
				refer_code: '', //推荐码
				touchx: '',
				curItemScroll: 0,
				planDetails: [{
					type: 1,
					detail: '共60升水，套餐外0.6元/升',
					tip: '69元封顶，无限量使用'
				}, {
					type: 2,
					detail: '共60升水，套餐外0.4元/升',
					tip: '69元封顶，无限量使用'
				}, {
					type: 3,
					detail: '包月套餐，无限量使用',
					tip: ''
				}, {
					type: 4,
					detail: '试用套餐，试用期内不限量使用',
					tip: ''
				}]
			};
		},
		computed: {
			isHaveServicePrice() {
				return (this.curPlanIdx !== 3)
			}
		},
		onLoad(option) {
			this.getPlanMenuData();
			this.address_id = option.address_id
		},
		methods: {
			vanFieldChange({
				detail
			}) {
				this.refer_code = detail
			},
			scanCode() {
				uni.scanCode({
					success(res) {
						console.log(res.result);
						this.refer_code = res.result
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			onChangeAgreement(e) {
				this.isCheckAgreement = e.detail
			},
			handleClickPlanItem(index) {
				this.curPlanIdx = index

				const query = uni.createSelectorQuery().in(this)
				query.select("#item" + index).boundingClientRect((rect) => {
					if (!rect) return
					// const targetLeft = rect[0].left + rect[1].scrollLeft
					console.log(rect);
				}).exec()
				this.curItemScroll = 344 * index
			},
			// 获取套餐数据
			getPlanMenuData() {
				this.$http('/consumer/plans', 'GET').then(({
					statusCode,
					data
				}) => {
					if (statusCode === 200) {
						const {
							records,
							first_time
						} = data
						this.planMenuData = records
						this.isHaveFirst = first_time
					} else {
						uni.showToast({
							title: '网络错误',
							icon: "error"
						})
					}
				})
			},
			async handleClickTransact() {
				const that = this
				if (!this.refer_code) {
					uni.showToast({
						title: '请填写推荐码',
						icon: 'error'
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
								plan_id: that.planMenuData[that.curPlanIdx].id,
								code: loginRes.code,
								type: "Installation",
								refer_code: that.refer_code,
								address_id: that.address_id
							}
							const res = await that.$http('/consumer/orders', 'POST', params)
							if (res.statusCode === 201) {
								const {
									nonceStr,
									package: prepayId,
									paySign,
									signType,
									timeStamp
								} = res.data.payment
								// 调用微信支付api
								try {
									const payRes = await requestPaymentFun(prepayId, nonceStr, timeStamp, signType, paySign)
									uni.navigateTo({
										url: `/pages/rechargeSuccess/rechargeSuccess?total=${res.data.total}&number=${res.data.number}`
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
			},
			handleShowPriceDetail() {
				this.isPriceDetailShow = !this.isPriceDetailShow
			},
			jumpToProtocol() {
				uni.navigateTo({
					url: '/pages/protocol/protocol'
				})
			},
		},
	}
</script>

<style lang="less">
	.page-planMenu {
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
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			>.title {
				position: relative;
				width: 100vw;
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

			.plan-section-spacing {
				width: 100vw;

				.plan-list {
					white-space: nowrap;
					background-color: #fff;

					.plan-item {
						width: 656rpx;
						height: 404rpx;
						margin: 36rpx 0;
						margin-left: 30rpx;
						border-radius: 28rpx;
						box-shadow: 4rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.17);
						display: inline-block;

						&:last-child {
							margin-right: 30rpx;
						}

						.plan-item-wrapper {
							width: 100%;
							height: 100%;
							display: flex;
							flex-direction: column;
							align-items: center;
							position: relative;

							.plan-name {
								background-color: #1677FF;
								width: 450rpx;
								line-height: 86rpx;
								text-align: center;
								color: #FEFFFF;
								font-size: 40rpx;
								margin-top: 44rpx;
								border-radius: 43rpx;
							}

							.plan-detail {
								width: 390rpx;
								color: #828698;
								font-size: 28rpx;
								margin-top: 22rpx;
								text-align: center;
							}

							.price-box {
								margin-top: 34rpx;
								color: #17DA9C;
								font-size: 28rpx;

								.price {
									font-size: 72rpx;

								}
							}
							
							.plan-item-activate-icon {
								position: absolute;
								right: -2rpx;
								bottom: -12rpx;
							}
						}
					}
					.activate-plan {
						border: 4rpx solid #00D893;
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
					height: 180rpx;
					background: #FFFFFF;
					border-radius: 28rpx;
					box-shadow: 4rpx 8rpx 48rpx 0rpx rgba(0, 0, 0, 0.17);
					border: 4rpx solid #000;

					.qeury-icon {
						text-align: center;
						position: absolute;
						border-radius: 50%;
						top: 37rpx;
						right: 16rpx;
						width: 32rpx;
						line-height: 32rpx;
						background-color: #CECFD0;
						color: #828698;
						font-size: 24rpx
					}

					.item-left {
						margin-right: 50rpx;

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

				.refer-code {
					margin: 0 auto;
					width: 666rpx;
					margin-top: 40rpx;
					box-shadow: 4rpx 8rpx 48rpx 0rpx rgba(0, 0, 0, 0.17);
					border-radius: 28rpx;
					overflow: hidden;
				}

				.agreement {
					margin-top: 56rpx;
					display: flex;
					justify-content: center;
				}
			}
		}

		.bottom-pay-box {
			position: fixed;
			z-index: 888;
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
</style>