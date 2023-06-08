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
				当月用水总量
			</view>
			<view class="num-box">
				34L
			</view>
		</view>

		<view class="detail-list">
			<view v-for="item in waterUsageData" :key="item.date" class="item-box">
				<view class="label">
					{{item.date}}
				</view>
				<view class="num-box">
					{{item.num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curDate: '2023-06',
				curDevIdx: 0,
				waterUsageData: [{
					date: "03月31日",
					num: "5L"
				}, {
					date: "03月30日",
					num: "2L"
				}]
			}
		},
		computed: {
			devList() {
				return this.$store.state.userInfo.devices
			},
			getCurDateFormat() {
				const arr = this.curDate.split('-')
				return arr[0] + '年' + arr[1] + '月'
			}
		},
		methods: {
			bindDateChange(e) {
				this.curDate = e.detail.value
			},
			bindDevChange(e) {
				this.curDevIdx = e.detail.value
			},
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