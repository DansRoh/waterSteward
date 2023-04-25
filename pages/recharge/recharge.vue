<template>
	<view class="page-recharge" :style="{paddingTop: ptHeight+'px'}">
		<navbar :needBack="true" title="充值"></navbar>
		<view class="accouont-card">
			<view class="bgi-box">
			</view>
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
			<view class="plan-up">
				套餐升级
			</view>
		</view>

		<view class="custom-refill">
			<view class="fs28 c262626 mb30">
				自定义充值
			</view>
			<view class="refill-num-list">
				<view class="num-box">
					<view class="fs64 c262626">
						20
					</view>
					元
				</view>
				<view class="num-box">
					<view class="fs64 mt5 c262626">
						50
					</view>
					元
				</view>
				<view class="num-box">
					<view class="fs64 c262626">
						100
					</view>
					元
				</view>
			</view>
			<view class="custom-refill-input-box mt34">
				<input class="custom-refill-input" type="text">
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
						¥369
					</view>
				</view>
				<view @click="handleShowPriceDetail" class="price-detail">
					明细 v
				</view>
			</view>
			<van-button @click="handleClickTransact" class="transaction-btn" type="primary" color="#00D893" block
				round>立即充值</van-button>
		</view>
		<van-overlay :show="isPriceDetailShow" @click="()=>{isPriceDetailShow = false}">
			<view v-if="isPriceDetailShow" class="model-price-detail">
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
					x
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	export default {
		components: {
			navbar
		},
		data() {
			return {
				ptHeight: 60,
				isPriceDetailShow: false,
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
			};
		},
		onLoad() {
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
		},
		methods: {
			handleShowPriceDetail() {
				this.isPriceDetailShow = !this.isPriceDetailShow
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

			.bgi-box {
				width: 100%;
				height: 100%;
				background-color: aqua;
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
					padding-bottom: 38rpx;
					width: 205rpx;
					height: 128rpx;
					background-color: #fff;
					box-shadow: 4rpx 4rpx 48rpx 0rpx rgba(0, 0, 0, 0.09);
					border-radius: 28rpx;
					font-size: 28rpx;
					color: #828698;
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
			z-index: 200;
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
</style>