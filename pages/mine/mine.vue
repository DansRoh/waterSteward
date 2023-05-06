<template>
	<view class="page-mine">
		<view class="mine-card">
			<view class="top-box">
				<view class="user-photo">
					
				</view>
				<view class="user-name">
					维达Vinda
				</view>
			</view>
			<view class="mine-card-content">
				<view @click="handleMineSettings(1)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/17_sheet.png" size="48rpx"></van-icon>
						<view class="ml10">
							充值记录
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
				<view @click="handleMineSettings(2)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/18_phone04.png" size="48rpx"></van-icon>
						<view class="ml10">
							净水器管理
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
				<view @click="handleMineSettings(3)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/19_account.png" size="48rpx"></van-icon>
						<view class="ml10">
							账号与安全
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ptHeight: 60
			};
		},
		onLoad() {
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
		},
		methods: {
			handleMineSettings(type) {
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/rechargeRecord/rechargeRecord"
					})
				} else if (type === 2) {
					uni.navigateTo({
						url: "/pages/devManage/devManage"
					})
				} else if (type === 3) {
					uni.navigateTo({
						url: "/pages/accountSafe/accountSafe"
					})
				} else {

				}
			}
		}
	}
</script>

<style lang="less">
	.page-mine {
		padding-top: 40rpx;
		min-height: 100vh;
		background-color: #F2F4F7;
		box-sizing: border-box;

		.mine-card {
			margin: 0 auto;
			width: 700rpx;
			height: 824rpx;
			background-color: #fff;
			border-radius: 96rpx;
			overflow: hidden;

			.top-box {
				position: relative;
				width: 100%;
				height: 168rpx;
				background-color: #17DA9C;

				.user-photo {
					background-color: pink;
					position: absolute;
					bottom: -92rpx;
					left: 50%;
					transform: translate(-50%, 0);
					width: 184rpx;
					height: 184rpx;
					border: 6rpx solid #FFFFFF;
					box-shadow: 0rpx 4rpx 18rpx 0rpx rgba(136, 137, 137, 0.29);
					border-radius: 50%;
				}

				.user-name {
					position: absolute;
					bottom: -156rpx;
					left: 50%;
					transform: translate(-50%, 0);
					color: #828698;
					font-size: 36rpx;
				}
			}

			.mine-card-content {
				margin-top: 214rpx;
				box-sizing: border-box;

				.handle-box {
					height: 112rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 34rpx;
					font-size: 28rpx;
					color: #262626;
				}
			}
		}
	}
</style>