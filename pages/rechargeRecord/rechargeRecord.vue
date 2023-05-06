<template>
	<view class="page-rechargeRecord" :style="{paddingTop: ptHeight+'px'}">
		<navbar :needBack="true" title="充值记录"></navbar>
		<view class="filter-box df">
			<picker mode="date" :value="curDate" fields="year" @change="bindDateChange">
				<view class="current-date fs28 c262626 pl40 pr60">
					{{curDate}} 年
					<van-icon class="ml10" name="/static/icon/04_del.png" size="28rpx"></van-icon>
				</view>
			</picker>
			<picker mode="selector" @change="bindDevChange" :value="curDevIdx" :range="devList">
				<view class="current-dev fs28 c262626">
					{{devList[curDevIdx]}}
					<van-icon class="ml10" name="/static/icon/04_del.png" size="28rpx"></van-icon>
				</view>
			</picker>
		</view>
		<view class="record-list">
			<view class="record-item">
				<view class="left-desc fs28 c828698">
					<view class="">
						充值时间: 2022年10月24日 12:25
					</view>
					<view class="">
						交易单号：68525698752
					</view>
				</view>
				<view class="right-price fs32 c262626">
					18元
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curDate: '2023',
				devList: ['净水器1', "净水器2", "净水器3"],
				curDevIdx: 0,
				ptHeight: 60,
			};
		},
		onLoad() {
			const ptHeight = uni.getStorageSync('navHeight')
			if (ptHeight) {
				this.ptHeight = ptHeight
			}
		},
		onShow() {
			this.getOrderList()
		},
		methods: {
			// 获取订单列表
			async getOrderList() {
				const {
					statusCode,
					data
				} = await this.$http("/consumer/orders", "get")
				if (statusCode === 200) {
					//成功
					console.log('3', data);
				} else if (statusCode === 204) {
					console.log('没有数据');
				} else {
					uni.showToast({
						title: '网络错误',
						icon: 'error'
					})
				}

			},
			bindDateChange(e) {
				this.curDate = e.detail.value
			},
			bindDevChange(e) {
				this.curDevIdx = e.detail.value
			}
		}
	}
</script>

<style lang="less">
	.page-rechargeRecord {
		height: 100vh;
		background-color: #F2F4F7;

		.filter-box {
			padding: 50rpx 0;
		}

		.record-list {
			.record-item {
				width: 100vw;
				height: 144rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 50rpx;
				background-color: #fff;
				margin-bottom: 24rpx;
			}
		}
	}
</style>