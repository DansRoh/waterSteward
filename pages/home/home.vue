<template>
	<view class="page-home">
		<navbar>
			<view slot="content" class="custon-nav-content">
				<van-image class="left-box" width="208rpx" height="40rpx"
					src="/static/icon/10_waterStewardText.png"></van-image>
				<view class="right-box">
					<view v-if="true" class="fs28 c828698 df aie">
						<van-icon name="/static/icon/11_phone02.png" size="48rpx"></van-icon>
						在线
					</view>
					<view v-else class="fs28 c828698 df aie">
						<van-icon name="/static/icon/16_phone03.png" size="48rpx"></van-icon>
						离线
					</view>
				</view>
			</view>
		</navbar>
		<view class="water-banner">
			<view class="water-bg">
				<template v-if="curDevInfo.state === 'installed'">
					<view class="top-bg-box" :style="{bottom: dynamicBottom+'rpx'}">
						<van-image class="top-bg" :src="imgBaseURl+'12_waterTop.png'" width="100vw" height="248rpx"></van-image>
					</view>
					<van-image class="bottom-bg" :src="imgBaseURl+'13_waterBottom.png'" width="100vw" height="924rpx"></van-image>
				</template>
				<template v-else>
					<van-image class="uninstall-bg" src="/static/icon/39_bgNone.png" width="100vw" height="876rpx"></van-image>
				</template>
			</view>
			<view class="water-inner pt400">
				<view class="residue-water">
					<view class="df aic ">
						<view class="fs144">
							{{curDevInfo.remain ? curDevInfo.remain : 0}}
						</view>
						<view class="fs56 asfe pb30">
							L
						</view>
					</view>
					<view class="tac">
						可用水量
					</view>
				</view>
				<picker mode="selector" :range="myDevList" :value="curCheckedDevIdx" range-key="name"
					@change="handleChangeCurDev">
					<view class="df aic mt200">
						<view class="my-dev-text">
							{{curDevInfo.name}}
						</view>
						<van-icon name="/static/icon/08_del_white.png" size="32rpx"></van-icon>
					</view>
				</picker>
			</view>
		</view>
		<view class="user-water-info">
			<view class="info-card">
				<view class="fs96 c17DA9C">
					{{curDevInfo.daily ? curDevInfo.daily : 0}}
				</view>
				<view class="c828698 fs28">
					今日饮水量 (L)
				</view>
			</view>
			<view class="info-card">
				<view class="fs96 c17DA9C">
					{{curDevInfo.tds ? curDevInfo.tds : 0}}
				</view>
				<view class="c828698 fs28">
					TDS值 (mg/L)
				</view>
			</view>
		</view>
		<view class="bottom-tab-box fs28 c828698">
			<view @tap="handleClickTab(1)" class="df aic pl40">
				<van-icon name="/static/icon/14_service.png" size="56rpx"></van-icon>
				客服
			</view>
			<view @tap="handleClickTab(2)" class="df aic">
				<van-icon name="/static/icon/15_people.png" size="56rpx"></van-icon>
				我的
			</view>
			<van-button @tap="handleClickTab(3)" type="primary" round>充值</van-button>
		</view>
		<!-- 掉线提醒model -->
		<van-overlay class="offline-overlay" :show="isOffline" z-index="100">
			<view class="wrapper">
				<view class="inner-box mb30">
					<view class="icon">

					</view>
					<view class="tips-text">
						经系统监测，您的设备以断电/网，
						净水功能已停止，为避免使用，
						请尽快连网连电。
					</view>
				</view>
				<van-button custom-style="width:384rpx;height:96rpx;font-size:36rpx;" @tap="()=>{isOffline=false}"
					color="#17DA9C" round>知道了</van-button>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	import {
		imgBaseURl
	} from '@/config/index.js'
	import navbar from '../../components/navbar/navbar.vue';
	export default {
		components: {
			navbar
		},
		data() {
			return {
				imgBaseURl,
				isOffline: true,
				curCheckedDevIdx: this.$store.state.curDevIdx,
				myDevList: [],
				userInfo: {}
			};
		},
		computed: {
			curDevInfo() {
				return this.myDevList ? this.myDevList[this.curCheckedDevIdx] : []
			},
			dynamicBottom() {
				return 876 * (this.curDevInfo?.remain / this.curDevInfo?.total)
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		onShow() {
			this.getDevList()
			this.curCheckedDevIdx = this.$store.state.curDevIdx
		},
		methods: {
			// 获取并存储账号信息
			async getUserInfo() {
				const {
					statusCode,
					data
				} = await this.$http('/consumer/profile', 'get')
				if (statusCode === 200) {
					const mockDevices = [{
							"id": "0001",
							"name": " 净水器1号",
							"plan_id": "cf01af48-e13a-4ccf-9313-329962ca96ab",
							"plan_name": "每日鲜A套餐",
							"tds": 15, // TDS 值
							"amount": 99, // 余额
							"remain": 90, // 剩余水量
							"total": 90, // 套餐总量
							"daily": 10, // 当日用水量
							"address": "云南省 昆明市 呈贡区 test", // 设备地址
							"state": "installed", // 待预约 pending；scheduled 已预约测试信号；surveyed 已完成信号测试；installed 已安装
							"survey_at": "2023.03.10", // 预约安装日期
							"stoppted": true // 是否关停状态
						},
						{
							"id": "0002",
							"name": " 净水器2号",
							"plan_id": "cf01af48-e13a-4ccf-9313-329962ca96ab",
							"plan_name": "每日鲜B套餐",
							"tds": 10, // TDS 值
							"amount": 40, // 余额
							"remain": 10, // 剩余水量
							"total": 90, // 套餐总量
							"daily": 15, // 当日用水量
							"address": "云南省 昆明市 呈贡区 test", // 设备地址
							"state": "installed", // 待预约 pending；scheduled 已预约测试信号；surveyed 已完成信号测试；installed 已安装
							"survey_at": "2023.03.10", // 预约安装日期
							"stoppted": true // 是否关停状态
						}
					]
					const mockData = {
						...data,
						devices: mockDevices
					}
					this.userInfo = mockData
					this.getDevList()
					uni.setStorageSync("userInfo", mockData)
				}
			},
			// 获取净水器列表
			getDevList() {
				this.myDevList = this.userInfo.devices
			},
			handleClickTab(type) {
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/service/service"
					})
				} else if (type === 2) {
					uni.navigateTo({
						url: "/pages/mine/mine"
					})
				} else if (type === 3) {
					uni.navigateTo({
						url: "/pages/recharge/recharge"
					})
				} else {

				}
			},
			handleChangeCurDev(e) {
				this.curCheckedDevIdx = e.detail.value
				this.$store.commit("changeCurDevIdx", e.detail.value)
			}
		}
	}
</script>

<style lang="less">
	.page-home {
		min-height: 100vh;
		background-color: #F2F4F7;
		box-sizing: border-box;

		.custon-nav-content {
			box-sizing: border-box;
			padding-left: 30rpx;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.water-banner {
			width: 100vw;
			height: 924rpx;
			position: relative;

			.water-bg {
				overflow: hidden;
				position: relative;
				height: 100%;

				.uninstall-bg {
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #F2F4F7;
				}

				.top-bg-box {
					background-color: #fff;
					width: 100vw;
					height: 150vh;
					z-index: 20;
					position: absolute;
					left: 0;
					bottom: 876rpx;

					.top-bg {
						position: absolute;
						left: 0;
						bottom: -212rpx;
					}
				}

				.bottom-bg {
					z-index: 19;
					position: absolute;
					left: 0;
					bottom: 0;
				}
			}

			.water-inner {
				position: absolute;
				z-index: 50;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				color: #fff;

				.residue-water {
					text-shadow: 4px 4px 12px rgba(0, 209, 255, 0.81);
				}

				.my-dev-text {
					text-shadow: 4px 4px 12px rgba(0, 209, 255, 0.81);
				}
			}
		}

		.user-water-info {
			width: 100vw;
			padding: 64rpx 0;
			display: flex;
			justify-content: space-evenly;

			.info-card {
				box-sizing: border-box;
				padding-top: 10rpx;
				padding-left: 30rpx;
				width: 320rpx;
				height: 208rpx;
				background-color: #fff;
				border-radius: 32rpx;
				box-shadow: 4rpx 4rpx 48rpx 0rpx rgba(0, 0, 0, 0.09);
			}
		}

		.bottom-tab-box {
			margin: 0 auto;
			padding: 0 20rpx;
			width: 678rpx;
			height: 112rpx;
			background-color: #fff;
			border-radius: 56rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.offline-overlay {
			.wrapper {
				border: 2rpx solid;
				height: 100vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-bottom: 100rpx;
				box-sizing: border-box;

				.inner-box {
					width: 624rpx;
					height: 528rpx;
					border-radius: 48rpx;
					background-color: #fff;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					box-sizing: border-box;
					padding: 50rpx 0;

					.icon {
						width: 172rpx;
						height: 154rpx;
						border: 1px solid;
					}

					.tips-text {
						width: 496rpx;
						height: 132rpx;
						font-size: 32rpx;
						color: #000;
						font-weight: 400;
					}
				}
			}
		}
	}
</style>