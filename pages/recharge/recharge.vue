<template>
	<view class="page-recharge">
		<view class="accouont-card">
			<van-image width="100%" height="100%" class="bgi-box" :src="imgBaseURl+'07_cardBg.png'"></van-image>

			<picker mode="selector" :range="devices" :value="curDevIdx" range-key="name" @change="handleChangeCurDev">
				<view class="change-icon-box">
					<van-icon name="/static/icon/08_del_white.png" size="32rpx"></van-icon>
				</view>
			</picker>

			<view class="card-content">
				<view class="card-title">
					<view class="fs24">
						充值账号
					</view>
					<view class="fs48">
						{{curDevInfo.name ? curDevInfo.name : '暂无净水器'}}
					</view>
				</view>
				<view class="account-info df mt42">
					<view class="mr68">
						<view class="fs24">
							当前可用水量
						</view>
						<view class="df aie">
							<view class="fs64">
								{{curDevInfo.remain ? curDevInfo.remain : 0}}
							</view>
							<view class="fs24">
								升
							</view>
						</view>
					</view>
					<view>
						<view class="fs24">
							当前余额
						</view>
						<view class="df aie">
							<view class="fs64">
								{{curDevInfo.amount ? curDevInfo.amount : 0}}
							</view>
							<view class="fs24">
								元
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="current-plan-box">
			<view class="c828698 fs24">
				当前套餐
			</view>
			<view class="df">
				{{curDevInfo.plan_name ? curDevInfo.plan_name : '暂无套餐'}}
			</view>
			<view @tap="jumpToPlusPlan" class="upplan-btn-box">
				<van-image custom-class="custom-img-cls" src="/static/icon/09_planUp.png" width="196rpx" height="50rpx" />
				<view class="text">
					套餐升级
				</view>
			</view>
		</view>

		<view class="custom-refill">
			<view class="fs28 c262626 mb30">
				自定义充值
			</view>
			<view class="refill-num-list">
				<view v-for="(item, index) in rechargeNumCheckList" :key="item" @tap="handleCheckRgNum(index)" class="num-box"
					:class="curRgNumIdx === index ? 'activate-num-box': ''">
					<view class="fs64 c262626">
						{{item}}
					</view>
					元
				</view>
			</view>
			<view class="custom-refill-input-box mt34">
				<view class="refill-inp-tips">
					输入充值金额 (元)
				</view>
				<input :value="customRgNum" @input="handleChangeCustomRgNum"
					@focus="() => {curRgNumIdx = -1;rechargeSum=customRgNum}" class="custom-refill-input" type="number">
			</view>
		</view>

		<view class="bottom-pay-box">
			<view class="left-price-detail">
				<view class="price">
					实付
					<view class="price-num">
						¥
						{{rechargeSum || 0}}
					</view>
				</view>
				<view @tap="handleShowPriceDetail" class="price-detail df aic">
					明细
					<van-icon v-if="!isPriceDetailShow" name="/static/icon/21_del02.png" size="34rpx"></van-icon>
					<van-icon v-else name="/static/icon/22_del03.png" size="34rpx"></van-icon>
				</view>
			</view>
			<van-button :disabled="!rechargeSum" @tap="handleClickTransact" class="transaction-btn" type="primary"
				color="#00D893" block round>立即充值</van-button>
		</view>
		<van-overlay :show="isPriceDetailShow" z-index="300">
			<view v-if="isPriceDetailShow" class="model-price-detail">
				<view class="title">
					支付明细
				</view>
				<view class="bill-list">
					<view class="bill-item">
						<view class="bill-left-desc">
							<view class="bill-type">商品</view>
							<view class="bill-name">充值金额</view>
						</view>
						<view class="bill-right-num">¥{{rechargeSum}}</view>
					</view>
				</view>
				<view @tap="()=>{isPriceDetailShow = false}" class="close">
					<van-icon name="/static/icon/06_close.png" size="54rpx"></van-icon>
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	import {
		imgBaseURl
	} from '@/config/index.js'
	import {
		requestPaymentFun
	} from '@/utils/tool.js'
	export default {
		data() {
			return {
				imgBaseURl,
				isPriceDetailShow: false,
				rechargeSum: 20, // 支付金额
				rechargeNumCheckList: [20, 50, 100], // 可选充值金额
				curRgNumIdx: 0,
				customRgNum: '',
			};
		},
		computed: {
			curDevIdx() {
				return this.$store.state.curDevIdx
			},
			devices() {
				return this.$store.state.userInfo.devices
			},
			curDevInfo() {
				return this.devices[this.curDevIdx]
			}
		},
		methods: {
			handleChangeCurDev(e) {
				this.$store.commit("changeCurDevIdx", e.detail.value)
			},
			handleShowPriceDetail() {
				this.isPriceDetailShow = !this.isPriceDetailShow
			},
			jumpToPlusPlan() {
				uni.navigateTo({
					url: '/pages/upPlan/upPlan'
				})
			},
			handleCheckRgNum(index) {
				this.customRgNum = ''
				this.curRgNumIdx = index
				this.rechargeSum = this.rechargeNumCheckList[index]
			},
			handleChangeCustomRgNum({
				detail
			}) {
				this.curRgNumIdx = -1
				const {
					value
				} = detail
				if (!value) {
					this.rechargeSum = 0
					return
				}
				this.customRgNum = value
				this.rechargeSum = this.customRgNum
			},
			handleClickTransact() {
				const that = this
				if (isNaN(this.rechargeSum) || this.rechargeSum < 0) {
					uni.showToast({
						title: '请输入正确的金额',
						icon: 'error'
					})
					return
				}
				uni.login({
					provider: 'weixin',
					async success({
						code
					}) {
						const params = {
							total: that.rechargeSum,
							code,
							device_id: that.curDevInfo?.id,
							type: 'Recharge'
						}
						const {
							statusCode,
							data
						} = await that.$http('/consumer/orders', 'post', params)
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
									url: `/pages/rechargeSuccess/rechargeSuccess?total=${data.total}&number=${data.number}&type=recharge`
								})
							} catch (e) {
								//TODO handle the exception
								console.log('e', e);
								uni.showToast({
									title: '取消支付',
									icon: "error"
								})
							}
						} else {
							uni.showToast({
								title: '网络错误',
								icon: 'error'
							})
						}
					},
					fail(e) {
						console.log(e);
						uni.showToast({
							title: '网络错误',
							icon: 'error'
						})
					}
				})

			}
		}
	}
</script>

<style lang="less">
	.page-recharge {
		padding-top: 40rpx;
		background-color: #F2F4F7;
		min-height: 100vh;

		.accouont-card {
			position: relative;
			border-radius: 40rpx;
			overflow: hidden;
			margin: 40rpx auto;
			margin-top: 0;
			width: 672rpx;
			height: 368rpx;

			.change-icon-box {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				top: 70rpx;
				right: 70rpx;
			}

			.card-content {
				position: absolute;
				top: 0;
				left: 0;
				box-sizing: border-box;
				padding: 38rpx 0 38rpx 60rpx;
				color: #FFFFFF;

				.card-title {}
			}
		}

		.current-plan-box {
			margin: 0 auto;
			width: 672rpx;
			height: 108rpx;
			background-color: #fff;
			border-radius: 54rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			.plan-up {
				width: 196rpx;
				height: 50rpx;
				background-color: aquamarine;
			}

			.upplan-btn-box {
				position: relative;
				margin-bottom: -6rpx;

				.custom-img-cls {}

				.text {
					left: 24rpx;
					top: 6rpx;
					position: absolute;
					font-size: 24rpx;
					color: #fff;
				}
			}
		}

		.custom-refill {
			width: 666rpx;
			margin: 0 auto;
			margin-top: 72rpx;

			.refill-num-list {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.num-box {
					display: flex;
					justify-content: center;
					align-items: flex-end;
					box-sizing: border-box;
					padding-bottom: 38rpx;
					width: 205rpx;
					height: 166rpx;
					background-color: #fff;
					box-shadow: 4rpx 4rpx 48rpx 0rpx rgba(0, 0, 0, 0.09);
					border-radius: 28rpx;
					font-size: 28rpx;
					color: #828698;
				}

				.activate-num-box {
					border: 4rpx solid #54CFE9;
				}
			}

			.custom-refill-input-box {
				position: relative;
				height: 160rpx;
				background-color: #fff;
				border: 2rpx solid #828698;
				border-radius: 28rpx;

				.custom-refill-input {
					width: 666rpx;
					height: 90rpx;
					color: #54CFE9;
					caret-color: #54CFE9;
					font-size: 70rpx;
					padding-left: 34rpx;
				}

				.refill-inp-tips {
					padding-top: 22rpx;
					padding-left: 34rpx;
					font-size: 24rpx;
					color: #828698;
				}
			}
		}

		.bottom-pay-box {
			position: fixed;
			display: flex;
			z-index: 888;
			justify-content: space-between;
			align-items: center;
			padding: 36rpx;
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
			bottom: 158rpx;
			box-sizing: border-box;
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