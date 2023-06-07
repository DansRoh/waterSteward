<template>
	<view class="page-rechargeRecord">
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
			<view v-for="item in orderList" :key="item.plan_id" class="record-item">
				<view class="left-desc fs28 c828698">
					<view class="">
						充值时间: {{item.created_at}}
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
	import { formatDateTime } from '../../utils/tool.js'
	export default {
		data() {
			return {
				curDate: '2023',
				devList: ['净水器1', "净水器2", "净水器3"],
				curDevIdx: 0,
				orderList: []
			};
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
					const newOrderList = data.records.map(item => {
						item.created_at = formatDateTime(item.created_at)
						return item
					})
					this.orderList = newOrderList
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