<template>
	<view class="page-devInstallProgress">
		<view class="fs36 c262626">
			净水器安装进度
		</view>
		<view class="progress-box">
			<view class="top-circle-class fs24" :class="state==='scheduled' ? '':'top-circle-class-surveyed'">
				<template v-if="state==='scheduled'">
					<view class="fs36">
						待测试信号
					</view>
					<view class="">
						预约日期
					</view>
					<view class="">
						2023.04.15
					</view>
					<view class="icon-box">
						<van-icon name="/static/icon/44_dot.png" size="22rpx"></van-icon>
					</view>
				</template>
				<template v-else>
					<view class="fs36">
						信号测试
					</view>
					<view class="fs36">
						已完成
					</view>
					<view class="icon-box">
						<van-icon name="/static/icon/45_success.png" size="22rpx"></van-icon>
					</view>
				</template>
			</view>

			<view class="dashed-line">

			</view>
			<view class="bottom-circle-class fs36">
				<view class="">
					净水器
				</view>
				<view class="">
					待安装
				</view>
				<view class="icon-box" :style="{backgroundColor: state==='surveyed'?'#23D8FF':'#828698'}">
					<van-icon name="/static/icon/44_dot.png" size="22rpx"></van-icon>
				</view>
			</view>

			<view class="dashed-line" />

			<view class="success-icon">
				<van-icon name="/static/icon/45_success.png" size="28rpx"></van-icon>
			</view>
		</view>
		<van-icon v-if="true" name="/static/icon/34_feedback_03.png" size="96rpx"></van-icon>
		<van-button v-else @tap="jumpToHome" color="#7A6AF4" custom-style="width:344rpx;height:112rpx" size="large" block
			round>
			进入主页
		</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: "scheduled" // 待预约 pending；scheduled 已预约测试信号；surveyed 已完成信号测试；installed 已安装
			};
		},
		methods: {
			jumpToHome() {
				uni.navigateTo({
					url: '/pages/home/home'
				})
			}
		}
	}
</script>

<style lang="less">
	.page-devInstallProgress {
		height: 100vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 70rpx;
		background-color: #F2F4F7;

		.progress-box {
			margin: 94rpx 0;
			background-color: #fff;
			width: 344rpx;
			height: 946rpx;
			box-sizing: border-box;
			border-radius: 172rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 50rpx;

			.top-circle-class-surveyed {
				background-color: #17DA9C !important;
			}

			.top-circle-class {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 20rpx;
				box-sizing: border-box;
				background-color: #5E5E5E;
				width: 224rpx;
				height: 224rpx;
				border-radius: 50%;
				color: #fff;

				.icon-box {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%) translateY(50%);
					border-radius: 50%;
					width: 48rpx;
					height: 48rpx;
					border: 6rpx solid #fff;
					background-color: #23D8FF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.dashed-line {
				width: 0;
				height: 130rpx;
				border: 2rpx dashed #D0D0D0;
			}

			.bottom-circle-class {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 20rpx;
				box-sizing: border-box;
				background-color: #D0D0D0;
				width: 224rpx;
				height: 224rpx;
				border-radius: 50%;
				color: #5E5E5E;

				.icon-box {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%) translateY(50%);
					border-radius: 50%;
					width: 48rpx;
					height: 48rpx;
					border: 6rpx solid #fff;
					background-color: #828698;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.success-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;
				background-color: #BDBDBD;
				border-radius: 50%;
			}
		}
	}
</style>