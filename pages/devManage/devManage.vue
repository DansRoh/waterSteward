<template>
	<view class="page-devManage">
		<view class="dev-card">
			<view class="dev-name">
				<van-icon name="/static/icon/11_phone02.png" size="44rpx" />
				<view class="fs36 c262626">
					爸爸家的净水器
				</view>
				<view class="fs24 c17DA9C">
					修改名称
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="address df aic">
				<van-icon name="/static/icon/27_local.png" size="32rpx" />
				<view class="fs28 c000">
					重庆市渝中区长江路地产大厦2号楼 2-1
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="current-plan df aic jcsb">
				<view class="fs24 c828698">
					当前套餐
				</view>
				<view class="df fs36 c000">
					每日鲜
					<view class="c17DA9C">
						A
					</view>
					套餐
				</view>
				<view @tap="jumpToPlusPlan" class="upplan-btn-box">
					<van-image custom-class="custom-img-cls" src="/static/icon/09_planUp.png" width="196rpx" height="50rpx" />
					<view class="text">
						套餐升级
					</view>
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="account-info df aic jcsb">
				<view class="">
					<view class="fs24 c828698">
						当前余额
					</view>
					<view class="fs32 c17DA9C">
						100元
					</view>
				</view>
				<view class="">
					<view class="fs24 c828698">
						剩余水量
					</view>
					<view class="fs32 c17DA9C">
						60升
					</view>
				</view>
				<view class="">
					<van-button @tap="jumpToRecharge" type="primary" custom-style="width: 194rpx; height: 48rpx" color="#17DA9C"
						round>充值</van-button>
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="dev-handle">
				<view v-if="false" class="fs28 c5e df aic">
					<van-icon name="/static/icon/28_phone05.png" size="48rpx" />
					远程关停
				</view>
				<van-button v-else custom-style="width:600rpx;height: 80rpx;font-size: 28rpx;border-radius: 28rpx;"
					color="#1666FF">
					设备已关停，一键开启
				</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			jumpToPlusPlan() {
				uni.navigateTo({
					url: '/pages/upPlan/upPlan'
				})
			},
			jumpToRecharge() {
				uni.navigateTo({
					url: '/pages/recharge/recharge'
				})
			}
		}
	}
</script>

<style lang="less">
	.page-devManage {
		padding-top: 50rpx;
		min-height: 100vh;
		background-color: #F2F4F7;
		box-sizing: border-box;
		padding: 50rpx 40rpx;

		.dev-card {
			width: 666rpx;
			background-color: #fff;
			box-shadow: 4rpx 8rpx 48rpx 0rpx rgba(0, 0, 0, 0.17);
			border-radius: 28rpx;
			box-sizing: border-box;
			padding: 46rpx 26rpx;

			.dev-name {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.dev-handle {
				display: flex;
				justify-content: flex-end;
			}

			.current-plan {
				.upplan-btn-box {
					position: relative;
					margin-bottom: -6rpx;

					.custom-img-cls {}

					.text {
						left: 24rpx;
						top: 6rpx;
						position: absolute;
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
		}
	}
</style>