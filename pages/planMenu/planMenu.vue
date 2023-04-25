<template>
	<scroll-view scroll-into-view="target-deal" class="page-planMenu" :style="{paddingTop: ptHeight+'px'}">
		<navbar needBack title="套餐办理"></navbar>
		<view class="page-title">
			套餐选择
		</view>
		<view class="every-day-plan-box">
			<view class="title">
				每日鲜套餐
				<van-icon class="title-del-icon" name="/static/icon/36_del.png" size="20rpx"></van-icon>
			</view>
			<view class="plan-menu">
				<view @click="handleClickPlanItem(idx)" class="plan-item-box" :class="curPlanIdx===idx ? 'activate-plan' : ''"
					v-for="(item,idx) in planMenuData" :key="item.planType">
					<view class="item-left">
						<view class="icon">
							¥
						</view>
						<view class="price">
							{{item.price}}
						</view>
						<view class="unit">
							/月
						</view>
					</view>
					<view v-if="item.planType === 'D'" class="item-right">
						<view class="plan-name">
							每日鲜 <view class="plan-type">
								D
							</view> 套餐（大家庭）
						</view>
						<view class="plan-tips">
							<view class="stress-box">
								水不限量供应
							</view>
						</view>
					</view>
					<view v-else class="item-right">
						<view class="plan-name">
							每日鲜 <view class="plan-type">
								{{item.planType}}
							</view> 套餐（{{item.numOfPeople}}人）
						</view>
						<view class="plan-tips">
							共<view class="stress-box">
								{{item.numOfStere}}
							</view>水，相当于5L桶 * <view class="stress-box">
								{{item.numOfBucket}}
							</view>
						</view>
					</view>
					<view v-show="curPlanIdx === idx" class="plan-item-activate-icon">
						<van-image src="/static/icon/37_activate.png" width="116rpx" height="98rpx"></van-image>
					</view>
				</view>
			</view>
			<view class="plan-required-box">
				<view class="first-recharge-tips">
					首充金额
				</view>
				<view class="plan-item-box">
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
							首充￥360，全额逐月返！
						</view>
						<view class="plan-tips">
							36个月每月反10元。
						</view>
					</view>
					<view class="plan-item-activate-icon">
						<van-image src="/static/icon/38_required.png" width="116rpx" height="98rpx"></van-image>
					</view>
				</view>
				<view id="target-deal" class="agreement">
					<van-checkbox :value="isCheckAgreement" @change="onChangeAgreement">我同意鲜水管家*****开通协议</van-checkbox>
				</view>
			</view>
			<view class="bottom-pay-box">
				<view class="left-price-detail">
					<view class="price">
						实付
						<view class="price-num">
							¥369
						</view>
					</view>
					<view @click="handleShowPriceDetail" class="price-detail df aic">
						明细
						<van-icon v-if="!isPriceDetailShow" name="/static/icon/21_del02.png" size="34rpx"></van-icon>
						<van-icon v-else name="/static/icon/22_del03.png" size="34rpx"></van-icon>
					</view>
				</view>
				<van-button @click="handleClickTransact" class="transaction-btn" type="primary" color="#00D893" block
					round>立即办理</van-button>
				<view v-if="isPriceDetailShow" class="model-price-bg">
					<view class="model-price-detail">
						<view class="title">
							支付明细
						</view>
						<view class="bill-list">
							<view v-for="item in priceDetailData" :key="item.id" class="bill-item">
								<view class="bill-left-desc">
									<view class="bill-type">
										{{item.billType === 1 ? "商品" : "优惠"}}
									</view>
									<view class="bill-name">
										{{item.billName}}
									</view>
								</view>
								<view class="bill-right-num">
									{{item.billType === 2 ? "-" : ""}}¥{{item.priceNum}}
								</view>
							</view>
						</view>
						<view @click="()=>{isPriceDetailShow = false}" class="close">
							<van-icon name="/static/icon/06_close.png" size="54rpx"></van-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default {
		components: {
			navbar
		},
		data() {
			return {
				ptHeight: 60,
				planMenuData: [{
						price: 29,
						planType: "A",
						numOfPeople: "1-2",
						numOfStere: "60升",
						numOfBucket: "12桶"
					},
					{
						price: 39,
						planType: "B",
						numOfPeople: "3",
						numOfStere: "90升",
						numOfBucket: "18桶"
					},
					{
						price: 49,
						planType: "C",
						numOfPeople: "4-5",
						numOfStere: "120升",
						numOfBucket: "24桶"
					},
					{
						price: 69,
						planType: "D",
						numOfPeople: "*",
						numOfStere: "",
						numOfBucket: ""
					}
				],
				priceDetailData: [{
						id: 1,
						billType: 1,
						billName: "首充金额",
						priceNum: 360,
					},
					{
						id: 2,
						billType: 1,
						billName: "首充金额",
						priceNum: 29,
					},
					{
						id: 3,
						billType: 2,
						billName: "首充每月返",
						priceNum: 10,
					}
				], // 账单支付明细
				isCheckAgreement: false, // 用户是否同意开通鲜水管家协议
				isPriceDetailShow: false, // 价格明细弹窗是否显示
				curPlanIdx: 0, // 当前选择的套餐
			};
		},
		onLoad() {
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
			
			this.getPlanMenuData()
		},
		methods: {
			onChangeAgreement(e) {
				this.isCheckAgreement = e.detail
			},
			handleClickPlanItem(index) {
				this.curPlanIdx = index
			},
			// 获取套餐数据
			async getPlanMenuData() {
				const {
					statusCode,
					data
				} = await this.$http('/consumer/plans', 'GET')
				if (statusCode === 200) {
					console.log('data', data);
				} else {
					uni.showToast({
						title: '网络错误',
						icon: "error"
					})
				}
			},
			handleClickTransact() {
				if (!this.isCheckAgreement) {
					uni.showToast({
						title:'请勾选用户协议',
						icon:"error"
					})
					// 页面高度跳转至用户协议
					const query = uni.createSelectorQuery().in(this)
					query.select('#target-deal').boundingClientRect((rect) => {
						if(!rect) return
						const screenHeight = uni.getSystemInfoSync().windowHeight
						if(rect.top < 0 || rect.top > screenHeight-110) {
							uni.pageScrollTo({
								scrollTop: rect.top,
								duration: 300
							})
						}
					}).exec()
				} else {
					
				}
				
				
				// uni.navigateTo({
				// 	url: "/pages/recharge/recharge"
				// })
			},
			handleShowPriceDetail() {
				this.isPriceDetailShow = !this.isPriceDetailShow
			}
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
				justify-content: space-evenly;
				background-color: #fff;
				width: 100vw;
				height: 814rpx;

				.plan-item-box {
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
					padding-left: 90rpx;
				}
			}

			.bottom-pay-box {
				position: fixed;
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

				.model-price-detail {
					position: absolute;
					box-sizing: border-box;
					bottom: 0;
					left: 0;
					width: 100vw;
					height: 576rpx;
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
	}
</style>