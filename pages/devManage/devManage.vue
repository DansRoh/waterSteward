<template>
	<view class="page-devManage">
		<view @tap="jumpToPlanNew" class="add-dev-box">
			<view class="fs36 c38 mr10">
				添加净水器
			</view>
			<van-icon name="/static/icon/41_add.png" size="48rpx"></van-icon>
		</view>
		<view v-for="(devItem, devIdx) in devices" :key="devItem.id" class="dev-card">
			<view class="dev-name">
				<view class="fs36 c262626 df aic">
					<van-icon name="/static/icon/11_phone02.png" size="44rpx" />
					{{devItem.name}}
				</view>
				<view @tap="handleClickChangeNameBtn(devItem)" class="fs24 c17DA9C">
					修改名称
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="address df aic">
				<van-icon name="/static/icon/27_local.png" size="32rpx" />
				<view class="fs28 c000">
					{{devItem.address}}
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="current-plan df aic jcsb">
				<view class="fs24 c828698">
					当前套餐
				</view>
				<view class="df fs36 c000">
					{{devItem.plan_name}}
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
						{{devItem.amount}}元
					</view>
				</view>
				<view class="">
					<view class="fs24 c828698">
						剩余水量
					</view>
					<view class="fs32 c17DA9C">
						{{devItem.remain}}升
					</view>
				</view>
				<view class="">
					<van-button @tap="jumpToRecharge(devIdx)" type="primary" custom-style="width: 194rpx; height: 48rpx"
						color="#17DA9C" round>充值</van-button>
				</view>
			</view>
			<van-divider customStyle="margin: 30rpx 0;" />
			<view class="dev-handle">
				<view v-if="devItem.stoppted" class="fs28 c5e df aic">
					<van-icon name="/static/icon/28_phone05.png" size="48rpx" />
					远程关停
				</view>
				<van-button v-else custom-style="width:600rpx;height: 80rpx;font-size: 28rpx;border-radius: 28rpx;"
					color="#1666FF">
					设备已关停，一键开启
				</van-button>
			</view>
		</view>

		<!-- dialog -->
		<van-dialog v-if="isShowChangeDevNameModel" use-slot title="修改设备名称" :show="isShowChangeDevNameModel"
			show-cancel-button @close="closeChangeDevName" @confirm="changeDevName">
			<input class="new-dev-name-input" :value="newDevName" placeholder="请输入新设备名" @input="onchangeNewDevName"></input>
		</van-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowChangeDevNameModel: false,
				newDevName: '',
				selectDev: null
			};
		},
		computed: {
			devices() {
				return this.$store.state.userInfo.devices
			},
		},
		methods: {
			async changeDevName() {
				const params = {
					name: this.newDevName
				}
				const {
					statusCode,
					data
				} = await this.$http('/consumer/devices/' + this.selectDev.id, 'put', params)
				if (statusCode === 200) {
					await this.$store.dispatch('changeUserInfoSync')
					uni.showToast({
						title: "更改成功",
						icon: "success"
					})
				}
			},
			onchangeNewDevName(e) {
				this.newDevName = e.detail.value

			},
			jumpToPlusPlan() {
				uni.navigateTo({
					url: '/pages/upPlan/upPlan'
				})
			},
			jumpToPlanNew() {
				uni.navigateTo({
					url: '/pages/newDevInfoWrite/newDevInfoWrite'
				})
			},
			jumpToRecharge(devIdx) {
				this.$store.commit("changeCurDevIdx", devIdx)
				uni.navigateTo({
					url: '/pages/recharge/recharge'
				})
			},
			handleClickChangeNameBtn(devItem) {
				this.selectDev = devItem
				this.newDevName = devItem.name
				this.isShowChangeDevNameModel = true
			},
			closeChangeDevName() {
				this.isShowChangeDevNameModel = false
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
		
		.new-dev-name-input {
			margin: 40rpx auto;
			width: 70%;
			font-size: 28rpx;
			padding: 10rpx;
			border-bottom: 1px solid #ccc;
		}
		.add-dev-box {
			width: 666rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 50rpx;
		}

		.dev-card {
			margin-top: 40rpx;
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