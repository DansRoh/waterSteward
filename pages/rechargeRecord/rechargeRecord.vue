<template>
	<view class="page-rechargeRecord">
		<view class="filter-box df">
			<picker mode="date" :value="curDate" fields="year" @change="bindDateChange">
				<view class="current-date fs28 c262626 pl40 pr60">
					{{curDate}} 年
					<van-icon class="ml10" name="/static/icon/04_del.png" size="28rpx"></van-icon>
				</view>
			</picker>
			<picker mode="selector" @change="bindDevChange" :value="curDevIdx" :range="devList" range-key="name">
				<view class="current-dev fs28 c262626">
					{{devList[curDevIdx].name}}
					<van-icon class="ml10" name="/static/icon/04_del.png" size="28rpx"></van-icon>
				</view>
			</picker>
		</view>
		<van-empty v-if="filterOrderList.length===0" description="暂无数据" />
		<view v-else class="record-list">
			<view v-for="item in filterOrderList" :key="item.plan_id" class="record-item">
				<view class="left-desc fs28 c828698">
					<view class="">
						充值时间: {{item.created_at_format}}
					</view>
					<view class="">
						交易单号：{{item.number}}
					</view>
				</view>
				<view class="right-price fs32 c262626">
					{{item.total}}元
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDateTime
	} from '../../utils/tool.js'
	export default {
		data() {
			return {
				curDate: '2023',
				curDevIdx: 0,
				orderList: []
			};
		},
		computed: {
			devList() {
				return this.$store.state.userInfo.devices
			},
			filterOrderList() {
				const newOrderList = this.orderList.filter(orderItem => {
					let itemDateYear = (new Date(orderItem.created_at)).getFullYear();
					let itemDevIdx = this.devList.findIndex(devItem => devItem.id === orderItem.device_id)
					if ((itemDateYear == this.curDate) && (itemDevIdx == this.curDevIdx)) {
						orderItem.created_at_format = formatDateTime(orderItem.created_at)
						return true
					}
					return false
				})
				return newOrderList
			}
		},
		onShow() {
			this.getOrderList()
		},
		methods: {
			// 获取订单列表
			async getOrderList() {
				const params = {
					page: 1,
					page_size: 100
				}
				const {
					statusCode,
					data
				} = await this.$http("/consumer/orders", "get")
				if (statusCode === 200) {
					this.orderList = data.records
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
			},
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