<template>
	<view class="page-home" :style="{paddingTop: ptHeight+'px'}">
		<navbar>
			<van-image slot="left-box" width="208rpx" height="40rpx" src="/static/icon/10_waterStewardText.png"></van-image>
			<view slot="right-box">
				<view v-if="true" class="fs28 c828698 df aie">
					<van-icon name="/static/icon/11_phone02.png" size="48rpx"></van-icon>
					在线
				</view>
				<view v-else class="fs28 c828698 df aie">
					<van-icon name="/static/icon/16_phone03.png" size="48rpx"></van-icon>
					离线
				</view>
			</view>
		</navbar>
		<template v-if="myDevList.length">
			<view class="water-banner">
				<view class="water-bg">
					<view class="top-bg-box" :style="{bottom: dynamicBottom+'rpx'}">
						<van-image class="top-bg" :src="imgBaseURl+'12_waterTop.png'" width="100vw" height="248rpx"></van-image>
					</view>
					<van-image class="bottom-bg" :src="imgBaseURl+'13_waterBottom.png'" width="100vw" height="924rpx"></van-image>
				</view>
				<view class="water-inner pt400">
					<view class="residue-water">
						<view class="df aic ">
							<view class="fs144">
								30
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
								{{myDevList[curCheckedDevIdx].name}}
							</view>
							<van-icon name="/static/icon/08_del_white.png" size="32rpx"></van-icon>
						</view>
					</picker>
				</view>
			</view>
			<view class="user-water-info">
				<view class="info-card">
					<view class="fs96 c17DA9C">
						15.2
					</view>
					<view class="c828698 fs28">
						今日饮水量 (L)
					</view>
				</view>
				<view class="info-card">
					<view class="fs96 c17DA9C">
						63
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
		</template>
		<template v-else>
			<van-empty description="网络错误" />
		</template>
	</view>
</template>

<script>
	import {
		imgBaseURl
	} from '@/config/index.js'
	import navbar from '@/components/navbar/navbar.vue';
	export default {
		components: {
			navbar
		},
		data() {
			return {
				imgBaseURl,
				isOffline: true,
				ptHeight: 60,
				dynamicBottom: 876,
				curCheckedDevIdx: 0,
				myDevList: []
			};
		},
		onLoad() {
			// 获取导航栏高度
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
			this.dynamicBottom = this.dynamicBottom / 2
		},
		onShow() {
			// 判断是否登录的逻辑
			const isLogin = uni.getStorageSync('isLogin');
			if (!isLogin) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
				return
			}
			this.getUserInfoForStorage()
			this.getDevList()
		},
		methods: {
			// 获取净水器列表
			async getDevList() {
				const params = {
					page: 1,
					page_size: 25
				}
				const {
					statusCode,
					data
				} = await this.$http('/consumer/devices', 'get', params)
				if (statusCode === 200) {
					const {
						records
					} = data
					this.myDevList = [{id: 1, name: '净水器1号'},{id: 2, name: '净水器2号'},{id: 3, name: '净水器3号'}]
				} else {
					uni.showToast({
						title: '网络错误'
					})
				}
			},
			// 获取储存本地的userInfo
			getUserInfoForStorage() {
				uni.getStorageSync("userInfo")
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
			}
		}
	}
</script>

<style lang="less">
	.page-home {
		min-height: 100vh;
		background-color: #F2F4F7;
		box-sizing: border-box;

		.water-banner {
			width: 100vw;
			height: 924rpx;
			position: relative;

			.water-bg {
				overflow: hidden;
				position: relative;
				height: 100%;
				background-color: #00D1FF;

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
				border: 1px solid;
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