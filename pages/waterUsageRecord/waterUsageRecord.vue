<template>
	<view class="page-waterUsageRecord">
		<view class="filter-box df">
			<picker mode="date" :value="curDate" fields="month" @change="bindDateChange">
				<view class="current-date fs28 c262626 pl40 pr60">
					{{getCurDateFormat}}
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

		<view class="total">
			<view class="label">
				当月用水总量(升)
			</view>
			<view class="num-box">
				{{waterUsageAmount}}
			</view>
		</view>
		<van-empty v-if="waterUsageData.length===0" description="暂无数据" />
		<view class="detail-list">
			<view v-for="item in waterUsageData" :key="item.date" class="item-box">
				<view class="label">
					{{item.day}}
				</view>
				<view class="num-box">
					{{item.amount}}(升）
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMonthLastDay,
		formatDateTime
	} from "@/utils/tool.js"
	export default {
		data() {
			return {
				curDate: '2023-06',
				curDevIdx: 0,
				waterUsageData: []
			}
		},
		computed: {
			devList() {
				return this.$store.state.userInfo.devices
			},
			devId() {
				return this.devList[this.curDevIdx].id
			},
			getCurDateFormat() {
				const arr = this.curDate.split('-')
				return arr[0] + '年' + arr[1] + '月'
			},
			waterUsageAmount() {
				let amount = 0
				this.waterUsageData.forEach(item => {
					amount += Number(item.amount)
				})
				return amount.toFixed(1)
			}
		},
		onLoad() {
			this.formatCurDate()
		},
		onShow() {
			this.getWaterUsageData()
		},
		methods: {
			// 初始化当前时间
			formatCurDate() {
				const currentDate = new Date();
				
				// 获取年份和月份
				const year = currentDate.getFullYear();
				const month = String(currentDate.getMonth() + 1).padStart(2, '0');
				
				// 构造'YYYY-MM'格式的字符串
				const formattedDate = `${year}-${month}`;
				this.curDate = formattedDate
			},
			bindDateChange(e) {
				this.curDate = e.detail.value
				this.getWaterUsageData()
			},
			bindDevChange(e) {
				this.curDevIdx = e.detail.value
				this.getWaterUsageData()
			},
			async getWaterUsageData() {
				const params = {
					start_date: formatDateTime(this.curDate, 1),
					end_date: formatDateTime(getMonthLastDay(this.curDate), 1)
				}
				const {
					statusCode,
					data
				} = await this.$http(`/consumer/devices/${this.devId}/waterings`, 'get', params)
				if (statusCode === 200) {
					this.waterUsageData = data.records.map(item => {
						item.amount = (item.amount).toFixed(1)
						return item
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-waterUsageRecord {
		background-color: #F2F4F7;
		min-height: 100vh;

		.filter-box {
			padding: 50rpx 0;
		}

		.total {
			background-color: #fff;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 36rpx 42rpx;

			.label {
				font-size: 28rpx;
				color: #828698;
			}

			.num-box {
				font-size: 36rpx;
				color: #00B8DF;
			}
		}

		.detail-list {
			background-color: #fff;
			margin-top: 20rpx;

			.item-box {
				padding: 18rpx 44rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.label {
					font-size: 28rpx;
					color: #828698;
				}

				.num-box {
					font-size: 36rpx;
					color: #262626;
				}
			}
		}
	}
</style>