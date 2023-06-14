<template>
	<view class="page-coupon">
		<view class="search-code-box">
			<input class="search-code-input" :value="couponCode" @input="changeCouponCode" placeholder="输入兑换码" type="text">
			<van-button @click="handleClickExchangeBtn" custom-class="custom-van-btn" color="#17DA9C"
				type="primary">兑换</van-button>
		</view>
		<view class="mt34">我的优惠券</view>
		<van-empty v-if="allCouponList.length===0" description="暂无优惠券" />
		<view v-else class="coupon-list">
			<view v-for="couponItem in allCouponList" :key="couponItem.id" class="coupon-item">
				<image v-if="couponItem.state==='redeemed'" src="../../static/icon/47_coupon_bg.png" class="coupon-bg" mode="">
				</image>
				<image v-else src="../../static/icon/48_coupon_bg_lose.png" class="coupon-bg" mode=""></image>
				<view class="coupon-item-content">
					<view :class="couponItem.state!=='redeemed'?'left-box-lose':'left-box'">
						{{couponItem.amount}}<text class="fs28">升</text>
					</view>
					<view class="right-box">
						<view class="">
							<view class="">
								兑换券
							</view>
							<view class="">
								{{couponItem.stateText}}
							</view>
						</view>
						<!-- 净水器选择 -->
						<picker mode="selector" :disabled="!(couponItem.state==='redeemed')" :range="devices" :value="0"
							range-key="name" @change="handleChangeCurDev(couponItem.id, $event)">
							<van-button type="primary" custom-class="custom-van-btn" round
								:color="couponItem.state==='redeemed'?'#17DA9C':'#CECFD0'">{{couponItem.state==="used" ? "已使用": "使用"}}</van-button>
						</picker>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDaysBetweenTimestamps,
		sortTime
	} from "@/utils/tool.js"
	export default {
		data() {
			return {
				couponCode: "", // 优惠券兑换码
				allCouponList: [], // 所有优惠券
			};
		},
		computed: {
			devices() {
				return this.$store.state.userInfo.devices
			}
		},
		onLoad() {
			this.getAllCoupon()
		},
		onPullDownRefresh() {
			this.getAllCoupon()
		},
		methods: {
			// 使用优惠券
			async handleChangeCurDev(couponId, e) {
				const {
					data,
					statusCode
				} = await this.$http(`/consumer/coupons/${couponId}/usage`, "put", {
					device_id: this.devices[e.detail.value].id
				})
				if (statusCode === 201) {
					await this.getAllCoupon()
					uni.showToast({
						title: "使用成功",
						icon: "success"
					})
				}
			},
			// 兑换优惠券
			async handleClickExchangeBtn() {
				const {
					data,
					statusCode
				} = await this.$http("/consumer/coupons", "post", {
					code: this.couponCode
				})
				if (statusCode === 200) {
					await this.getAllCoupon()
					uni.showToast({
						title: "兑换成功",
						icon: "success"
					})
				} else if (statusCode === 404) {
					uni.showToast({
						title: "兑换码不存在",
						icon: 'error'
					})
				} else {
					uni.showToast({
						title: "兑换码已失效",
						icon: "error"
					})
				}
				this.couponCode = ""
			},
			changeCouponCode(e) {
				this.couponCode = e.detail.value
			},
			// 获取所有的优惠券
			async getAllCoupon() {
				const {
					data,
					statusCode
				} = await this.$http("/consumer/coupons")
				if (statusCode === 200 && data.records.length) {
					let usableDays = "",
						stateText = ""
					// 计算失效剩余天数
					const curDate = Date.now()
					const newRecords = data.records.map(item => {
						// 生成html文案
						if (item.state === "pending") {
							console.log('该券未激活');
						} else if (item.state === "redeemed") {
							usableDays = getDaysBetweenTimestamps(Date.parse(item.expired_at), curDate)
							stateText = "距离失效仅剩" + usableDays + "天"
						} else if (item.state === "used") {
							stateText = "该券已使用"
						} else if (item.state === "expired") {
							stateText = "该券已过期"
						} else {
							console.log('item.state', item.state);
						}
						return {
							usableDays,
							stateText,
							...item
						}
					})
					this.allCouponList = newRecords
				}
				uni.stopPullDownRefresh()
			}
		}
	}
</script>

<style lang="less">
	.page-coupon {
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #F2F4F7;
		padding: 30rpx 50rpx;
		padding-bottom: 80rpx;

		.search-code-box {
			display: flex;
			height: 80rpx;

			.search-code-input {
				box-sizing: border-box;
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

					.left-box-lose {
						width: 200rpx;
						color: #BDBDBD;
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