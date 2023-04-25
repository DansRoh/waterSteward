<template>
	<view class="page-accountSafe" :style="{paddingTop: ptHeight+'px'}">
		<navbar :needBack="true" title="账号与安全"></navbar>
		<view class="info-list fs36 c828698">
			<van-cell icon="/static/icon/23_account_01.png" custom-class="info-item" title="昵称" size="large"
				value-class="cus-value" value="维达Vinda" />
			<van-cell icon="/static/icon/24_account_02.png" custom-class="info-item" title="手机号" size="large"
				value-class="cus-value" value="187******40">
				<van-button class="right-icon-style" slot="right-icon" size="small" round color="#17DA9C">更改手机号</van-button>
			</van-cell>
			<!-- <van-cell icon="/static/icon/25_account_03.png" custom-class="info-item" title="密码" size="large"
				value-class="cus-value" value="******">
				<van-button class="right-icon-style" slot="right-icon" size="small" round color="#17DA9C">更改密码</van-button>
			</van-cell> -->
			<van-cell icon="/static/icon/26_account_04.png" custom-class="info-item" is-link title="账号注销"
				link-type="navigateTo" url="" />
		</view>
		<view @click="loginOut" class="log-out">
			退出登录
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from "@/wxcomponents/@vant/dialog/dialog"

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
			loginOut() {
				Dialog.confirm({
						title: '退出登录',
						message: '点击确认将退出登录',
					})
					.then(() => {
						// on confirm
						uni.setStorageSync('isLogin', false)
						uni.navigateTo({
							url: "/pages/login/login"
						})
					})
					.catch(() => {
						// on cancel
					});
			}
		}
	}
</script>

<style lang="less">
	.page-accountSafe {
		min-height: 100vh;
		background-color: #F2F4F7;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 80rpx;
		box-sizing: border-box;

		.info-list {
			width: 100vw;
			padding-top: 10rpx;

			.info-item {
				margin-top: 16rpx;
			}

			.cus-value {
				font-size: 36rpx;
				color: #828698;
			}

			.right-icon-style {
				margin-left: 40rpx;
			}
		}

		.log-out {
			position: fixed;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 28rpx;
			color: #FFA212;
		}
	}
</style>