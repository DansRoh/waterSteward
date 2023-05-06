<template>
	<view class="page-recharge">
		<view class="accouont-card">
			<van-image width="100%" height="100%" class="bgi-box" :src="imgBaseURl+'07_cardBg.png'"></van-image>
			<view class="card-content">
				<view class="card-title">
					<view class="fs24">
						充值账号
					</view>
					<view class="fs48">
						爸爸家的净水器
					</view>
				</view>
				<view class="account-info df mt42">
					<view class="mr68">
						<view class="fs24">
							当前可用水量
						</view>
						<view class="df aie">
							<view class="fs64">
								169
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
								100
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
				每日鲜
				<view class="c17DA9C">
					A
				</view>
				套餐
			</view>
			<van-image @tap="jumpToPlusPlan" style="margin-bottom: -8rpx;" :src="imgBaseURl+'09_planUp.png'" width="196rpx"
				height="50rpx"></van-image>
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
				<input :value="customRgNum" @input="handleChangeCustomRgNum" @focus="() => {curRgNumIdx = -1;rechargeSum=customRgNum}"
					class="custom-refill-input" type="number">
				<view class="refill-inp-tips">
					输入充值金额 (元)
				</view>
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
	import { requestPaymentFun } from '@/utils/tool.js'
	export default {
		data() {
			return {
				imgBaseURl,
				isPriceDetailShow: false,
				rechargeSum: 20,
				rechargeNumCheckList: [20, 50, 100],
				curRgNumIdx: 0,
				customRgNum: '',
			};
		},
		onLoad() {
		},
		methods: {
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
				const {
					value
				} = detail
				this.curRgNumIdx = -1
				this.customRgNum = value
				if (!value) {
					this.rechargeSum = 0
					return
				}
				this.rechargeSum = this.customRgNum
			},
			handleClickTransact() {
				if(isNaN(this.rechargeSum) || this.rechargeSum < 0) {
					uni.showToast({
						title:'请输入正确的金额',
						icon:'error'
					})
					return
				}
				uni.login({
					provider:'weixin',
					async success({code}) {
						const params = {
							total: this.rechargeSum,
							code,
							device_id: '',
							type: 'Recharge'
						}
						
						// requestPaymentFun()
					},
					fail(e) {
						console.log(e);
						uni.showToast({
							title:'网络错误',
							icon:'error'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="less">
	.page-recharge {
		background-color: #F2F4F7;
		min-height: 100vh;
		box-sizing: border-box;

		.accouont-card {
			position: relative;
			border-radius: 40rpx;
			overflow: hidden;
			margin: 40rpx auto;
			width: 672rpx;
			height: 368rpx;

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
				display: flex;
				align-items: flex-end;
				background-color: #fff;
				border: 2rpx solid #828698;
				border-radius: 28rpx;

				.custom-refill-input {
					width: 666rpx;
					height: 128rpx;
					color: #54CFE9;
					caret-color: #54CFE9;
					font-size: 80rpx;
					padding-left: 34rpx;
				}

				.refill-inp-tips {
					position: absolute;
					top: 22rpx;
					left: 34rpx;
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