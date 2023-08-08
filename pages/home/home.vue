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
					<view class="top-bg-box" :style="{bottom: dynamicBottom+100+'rpx'}">
						<van-image class="top-bg" :src="imgBaseURl+'12_waterTop.png'" width="100vw" height="248rpx"></van-image>
					</view>
					<van-image class="bottom-bg" :src="imgBaseURl+'13_waterBottom.png'" width="100vw" height="924rpx"></van-image>
				</template>
				<template v-else>
					<van-image class="uninstall-bg" src="/static/icon/39_bgNone.png" width="100vw" height="980rpx"></van-image>
				</template>
			</view>
			<view class="water-inner pt400">
				<view v-if="curDevInfo.state==='installed'" class="residue-water"
					:class="dynamicBottom < 400 ? 'small-remain-text-class' : ''">
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
				<view v-else class="uninstall-box">
					<view class="c262626">
						该净水器尚未安装
					</view>
					<navigator class="c17DA9C" :url="'/pages/devInstallProgress/devInstallProgress?devicesId='+curDevInfo.id">
						查看进度></navigator>
				</view>

				<!-- 净水器选择 -->
				<picker mode="selector" :range="myDevList" :value="curCheckedDevIdx" range-key="name"
					@change="handleChangeCurDev">
					<view class="my-dev-box df aic mt200">
						<view class="my-dev-text" :class="isTextStyleShowy ? '' : 'uninstall-text-class'">
							{{curDevInfo.name}}
						</view>
						<van-icon v-if="isTextStyleShowy" name="/static/icon/08_del_white.png" size="32rpx"></van-icon>
						<van-icon v-else name="/static/icon/04_del.png" size="32rpx"></van-icon>
					</view>
				</picker>
			</view>
		</view>
		<view class="user-water-info">
			<view class="info-card">
				<view class="fs96 c17DA9C">
					{{daily || (curDevInfo.daily ? curDevInfo.daily.toFixed(2) : 0)}}
				</view>
				<view class="c828698 fs28">
					今日饮水量 (L)
				</view>
			</view>
			<view @tap="jumpToTdsDetail" class="info-card">
				<view class="fs96 c17DA9C">
					{{tdsnow || (curDevInfo.tds || 0)}}
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
			<van-button @tap="handleClickTab(3)" type="primary" color="#17DA9C" round>充值</van-button>
		</view>
		<!-- 掉线提醒model -->
		<van-overlay class="offline-overlay" :show="isOffline" z-index="100">
			<view class="wrapper">
				<view class="inner-box mb30">
					<van-image src="/static/icon/43_outage.png" width="170rpx" height="150rpx"></van-image>
					<view class="tips-text">
						经系统监测，您的设备已断电/网，
						净水功能已停止，为避免影响使用，
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
	import mqtt from '../../utils/mqtt.js'
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
				isOffline: false,
				tdsnow: 0, // 动态tds值
				timer: null,
				client: null,
				//记录重连的次数
				reconnectCounts: 0,
				daily: 0,
			};
		},
		computed: {
			curCheckedDevIdx() {
				return this.$store.state.curDevIdx
			},
			userInfo() {
				return this.$store.state.userInfo
			},
			myDevList() {
				return this.userInfo.devices
			},
			curDevInfo() {
				return this.myDevList ? this.myDevList[this.curCheckedDevIdx] : []
			},
			dynamicBottom() {
				return 876 * (this.curDevInfo?.remain / this.curDevInfo?.total)
			},
			isTextStyleShowy() {
				return (this.curDevInfo?.state === 'installed' && this.dynamicBottom > 115)
			}
		},
		onLoad() {
			console.log('onload')
			this.$store.dispatch('changeUserInfoSync').then(() => {
				if (this.myDevList.length === 0) {
					uni.reLaunch({
						url: "/pages/planMenu/planMenu"
					})
				} else {
					this.connect()
				}
			})
		},
		onShow() {
			// 取消当前已订阅的所有主题
			if (this.client) {
				this.connect()
			}
		},
		onHide() {
			console.log('onhide');
			if (this.client) {
				this.client.end()
			}
		},
		onPullDownRefresh() {
			console.log('onpull')
			this.$store.dispatch('changeUserInfoSync')
			uni.stopPullDownRefresh()
		},
		methods: {
			jumpToTdsDetail() {
				uni.navigateTo({
					url: `/pages/tdsDetail/tdsDetail?devId=${this.curDevInfo.id}`
				})
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
				this.$store.commit("changeCurDevIdx", e.detail.value)
				this.connect()
			},
			connect() {
				const options = {
					clientId: this.userInfo.id + Math.random(0, 1),
					protocolVersion: 4, //MQTT连接协议版本
					clean: true,
					reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
					connectTimeout: 60 * 1000, //连接超时时间
					resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				}
				//开始连接
				this.client = mqtt.connect('wxs://iheshui.civilizationdata.com/mqtt', options);
				if (!this.curDevInfo.package) {
					console.log('未绑定设备，mqtt连接失败');
					return
				}
				this.client.on('connect', () => {
					console.log('mqtt连接成功');
					// this.sub_one()
					this.sub_many()
				})


				//服务器下发消息的回调
				this.client.on("message", (topic, message) => {
					console.log(" 收到 topic:" + topic + " , message :" + message)
					const res = JSON.parse(message)
					if (`water/tdsnow/${this.curDevInfo.package.imei}` === topic) {
						this.tdsnow = res.tdsnow
					} else if (`water/daily/${this.curDevInfo.package.imei}` === topic) {
						this.daily = res.daily
					} else {

					}
				})

				//服务器连接异常的回调
				this.client.on("error", function(error) {
					console.log(" 服务器 error 的回调" + error)

				})

				//服务器重连连接异常的回调
				this.client.on("reconnect", function() {
					console.log(" 服务器 reconnect的回调")

				})

				//服务器连接异常的回调
				this.client.on("offline", function(errr) {
					console.log(" 服务器offline的回调")
				})
			},
			sub_one() {
				if (this.client && this.client.connected) {
					//仅订阅单个主题
					this.client.subscribe(`water/tdsnow/${this.curDevInfo.package.imei}`, function(err, granted) {
						if (!err) {
							console.log('mqtt主题订阅成功');
						} else {
							console.log('mqtt主题订阅失败');
						}
					})
				} else {
					console.log('请先连接服务器');
				}
			},
			pub_msg() {
				if (this.client && this.client.connected) {
					const message = JSON.stringify({
						tdscmd: 'on'
					});
					this.client.publish(`water/tdscmd/${this.curDevInfo.package.imei}`, message);
					console.log('mqtt信息发送成功');
				} else {
					console.log('请先连接服务器');
				}
			},
			sub_many() {
				if (this.client && this.client.connected) {
					//仅订阅多个主题
					const topic01 = `water/tdsnow/${this.curDevInfo.package.imei}`
					const topic02 = `water/daily/${this.curDevInfo.package.imei}`
					this.client.subscribe(topic01, function(err, granted) {
						if (!err) {
							console.log('mqtt主题订阅成功 topic:' + topic01);
						} else {
							console.log('mqtt主题订阅失败');
						}
					})
					this.client.subscribe(topic02, function(err, granted) {
						if (!err) {
							console.log('mqtt主题订阅成功 topic:' + topic02);
						} else {
							console.log('mqtt主题订阅失败');
						}
					})
				} else {
					console.log('请先连接服务器');
				}
			},
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

				.small-remain-text-class {
					color: #5E5E5E;
					text-shadow: unset;
				}

				.my-dev-box {
					position: absolute;
					bottom: 60rpx;
					left: 50%;
					transform: translateX(-50%);

					.my-dev-text {
						text-shadow: 4px 4px 12px rgba(0, 209, 255, 0.81);
						margin-right: 10rpx;
					}

					.uninstall-text-class {
						color: #262626;
						text-shadow: unset;
					}
				}

				.uninstall-box {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 24rpx;
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