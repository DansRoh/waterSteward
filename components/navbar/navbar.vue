<template>
	<view class="navbar" :class="needBack? 'need-back': ''" :style='[navStyle]'>
		<view v-if="needBack" class="back" @tap="goBack">
			<van-icon name="/static/icon/35_right.png" size="40rpx"></van-icon>
		</view>
		<slot v-else name="left-box">
		</slot>
		<view @tap="goBack" class="title">{{ title }}</view>
		<slot name="right-box">
		</slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ' '
			},
			needBack: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				navStyle: null
			}
		},
		created() {
			this.navStyle = this.getNavStyle();
			console.log('nav', this.navStyle);
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getNavStyle() {
				const {
					screenWidth,
					statusBarHeight
				} = uni.getSystemInfoSync()
				const navHeight = 40
				const navWidth = Number(screenWidth) - 124
				return {
					height: `${navHeight}px`,
					paddingTop: `${statusBarHeight}px`,
					width: `${navWidth}px`,
				}
			}
		}
	}
</script>

<style>
	.navbar {
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		z-index: 9999;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		padding-left: 48rpx;
		padding-right: 100px;
	}
	.need-back {
		justify-content: flex-start;
	}

	.back {
		width: 44px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 36rpx;
		color: #262626;
		font-weight: 400;
	}

	.right {
		width: 44px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>