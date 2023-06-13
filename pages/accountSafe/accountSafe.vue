<template>
	<view class="page-accountSafe">
		<view class="info-list fs36 c828698">
			<van-field left-icon="/static/icon/23_account_01.png" label="姓名" size="large" :value="name" readonly />
			<view class="mt18">
				<van-field readonly left-icon="/static/icon/24_account_02.png" label="手机号" size="large" :value="phone" clearable
					type="number">
					<van-button @tap="jumpToEditPhone" class="right-icon-style" slot="right-icon" size="small" round
						color="#17DA9C">更改手机号</van-button>
				</van-field>
			</view>
			<van-cell @tap="handleTapDelAccount" icon="/static/icon/26_account_04.png" custom-class="info-item" is-link
				title="账号注销" link-type="navigateTo" url="" />
		</view>
		<view @tap="loginOut" class="login-out">
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
				name: '',
				phone: ''
			};
		},
		onShow() {
			this.initData()
		},
		methods: {
			async handleTapDelAccount() {
				Dialog.confirm({
						title: '注销账号',
						message: '点击确认将注销账号',
					})
					.then(async () => {
						// on confirm
						const res = await this.$http('/consumer/profile', 'delete')
						if (res.statusCode === 200) {
							uni.clearStorageSync();
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}
					})
					.catch(() => {
						// on cancel
					});
			},

			jumpToEditPhone() {
				uni.reLaunch({
					url: '/pages/changePhone/changePhone'
				})
			},
			loginOut() {
				Dialog.confirm({
						title: '退出登录',
						message: '点击确认将退出登录',
					})
					.then(() => {
						// on confirm
						uni.clearStorageSync();
						uni.reLaunch({
							url: "/pages/login/login"
						})
					})
					.catch(() => {
						// on cancel
					});
			},
			initData() {
				this.name = this.$store.state.userInfo.name
				this.phone = this.$store.state.userInfo.phone
			},
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

		.login-out {
			position: fixed;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 28rpx;
			color: #FFA212;
		}
	}
</style>