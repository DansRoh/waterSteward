<template>
	<view class="page-devInstallProgress">
		<view class="fs36 c262626">
			净水器安装进度
		</view>
		<view class="progress-box">
			<view class="top-circle-class fs24"
				:class="['surveyed', 'installed'].includes(state) ? 'top-circle-class-surveyed':''">
				<template v-if="state==='pending'">
					<view>待预约</view>
				</template>
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
				<template v-if="['surveyed','installed'].includes(state)">
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
			<view class="bottom-circle-class fs36" :class="state==='installed' ? 'top-circle-class-surveyed cfff':'c5e'">
				<view class="">
					净水器
				</view>
				<view class="">
					{{state === "installed" ? "已安装" : "待安装"}}
				</view>
				<view class="icon-box"
					:style="{backgroundColor: ['surveyed', 'installed'].includes(state) ?'#23D8FF':'#828698'}">
					<van-icon v-if="state==='installed'" name="/static/icon/45_success.png" size="22rpx"></van-icon>
					<van-icon v-else name="/static/icon/44_dot.png" size="22rpx"></van-icon>
				</view>
			</view>

			<view class="dashed-line" />

			<view class="success-icon" :style="{backgroundColor: ['installed'].includes(state) ?'#23D8FF':'#828698'}">
				<van-icon name="/static/icon/45_success.png" size="28rpx"></van-icon>
			</view>
		</view>
		<van-icon v-if="state !== 'installed'" name="/static/icon/34_feedback_03.png" size="96rpx"></van-icon>
		<van-button v-else @tap="scanBind" color="#7A6AF4" custom-style="width:344rpx;height:112rpx" size="large" block
			round>
			扫码绑定
		</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: "installed", // 待预约 pending；scheduled 已预约测试信号；surveyed 已完成信号测试；installed 已安装
				devicesId: ''
			};
		},
		onLoad(option) {
			this.devicesId = option.devicesId
		},
		methods: {
			scanBind() {
				const that = this
				uni.scanCode({
					async success(res) {
						const devInfoRes = await that.$http('/consumer/devices/' + that.devicesId + '/bind', 'put', {
							filter: res.result
						})
						if (devInfoRes.statusCode === 200) {
							uni.showToast({
								title: '绑定成功',
								icon: 'success'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/home/home'
								})
							}, 2000)
						} else {
							uni.showToast({
								title: '无法识别二维码',
								icon: 'error'
							})
						}
					},
					fail(err) {
						console.log('err', err);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.page-devInstallProgress {
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