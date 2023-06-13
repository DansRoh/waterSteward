<template>
	<view class="page-coupon">
		<view class="search-code-box">
			<input class="search-code-input" placeholder="输入兑换码" type="text">
			<van-button custom-class="custom-van-btn" color="#17DA9C" type="primary">兑换</van-button>
		</view>
		<view class="mt34">我的优惠券</view>
		<view class="coupon-list">
			<view class="coupon-item">
				<image src="../../static/icon/47_coupon_bg.png" class="coupon-bg" mode=""></image>
				<view class="coupon-item-content">
					<view class="left-box">
						100<text class="fs28">升</text>
					</view>
					<view class="right-box">
						<view class="">
							<view class="">
								兑换券
							</view>
							<view class="">
								距离失效仅剩18天
							</view>
						</view>
						<van-button type="primary" custom-class="custom-van-btn" round color="#17DA9C">使用</van-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.page-coupon {
		box-sizing: border-box;
		height: 100vh;
		background-color: #F2F4F7;
		padding: 30rpx 50rpx;

		.search-code-box {
			display: flex;
			height: 80rpx;

			.search-code-input {
				flex: 1;
				padding-left: 36rpx;
				height: 100%;
				background-color: #fff;
				font-size: 32rpx;
				border-top-left-radius: 40rpx;
				border-bottom-left-radius: 40rpx;
				border: 2rpx solid #17DA9C;
			}

			.custom-van-btn {
				width: 176rpx;
				height: 80rpx;
				font-size: 36rpx;
				border-top-right-radius: 40rpx;
				border-bottom-right-radius: 40rpx;
			}
		}

		.coupon-list {
			.coupon-item {
				margin-top: 32rpx;
				width: 658rpx;
				height: 160rpx;
				position: relative;

				.coupon-bg {
					width: 658rpx;
					height: 160rpx;
				}

				.coupon-item-content {
					padding: 46rpx 30rpx;
					box-sizing: border-box;
					top: 0;
					left: 0;
					display: flex;
					align-items: center;
					position: absolute;
					width: 100%;
					height: 100%;

					.left-box {
						width: 200rpx;
						color: #17DA9C;
						font-size: 72rpx;
					}

					.right-box {
						flex: 1;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.custom-van-btn {
							width: 156rpx;
							height: 64rpx;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>