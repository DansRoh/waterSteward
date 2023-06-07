<template>
	<view class="page-bill">
		<view class="filter-box df">
			<picker mode="date" :value="curDate" fields="month" @change="bindDateChange">
				<view class="current-date fs28 c262626 pl40 pr60">
					{{getCurDateFormat}}
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
		<view class="charge-list">
			<view class="charge-item">
				<view class="title">
					固定套餐
				</view>
				<view class="item-info">
					<view class="tip-box">
						每日鲜套餐A
					</view>
					<view class="num-box">
						¥29
					</view>
				</view>
				<view class="item-info">
					<view class="tip-box">
						每月折扣券
					</view>
					<view class="num-box">
						-¥10
					</view>
				</view>
			</view>
			<view class="charge-item">
				<view class="title">
					套餐外费用
				</view>
				<view class="item-info">
					<view class="tip-box">
						套餐外用水量50升（0.5元/升）
					</view>
					<view class="num-box">
						¥25
					</view>
				</view>
			</view>
			<view class="total">
				合计金额：<text class="total-data">¥44</text>
			</view>
		</view>
		<view class="water-consumption">
			<view class="total">
				<view>
					合计用水：<text class="total-data">44L</text>
				</view>
				<view @tap="handleClickUnfoldBtn" class="unfold-btn">
					{{unfold ? '收起': '展开'}}
					<image :class="unfold?'':'reverse'" src="../../static/icon/46_del.png" style="width: 18px;height: 12px;"
						mode="">
					</image>
				</view>
			</view>
			<view v-if="unfold" class="record-list">
				<view class="record-item">
					<view class="date-box">
						03月31日
					</view>
					<view class="count">
						5L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
				<view class="record-item">
					<view class="date-box">
						03月30日
					</view>
					<view class="count">
						3L
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curDate: '2023-03',
				devList: ['净水器1', "净水器2", "净水器3"],
				curDevIdx: 0,
				unfold: false, // 是否展开
			}
		},
		computed: {
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
			handleClickUnfoldBtn() {
				this.unfold = !this.unfold
			},
		}
	}
</script>

<style lang="less" scoped>
	.page-bill {
		background-color: #F2F4F7;
		height: 100vh;

		.filter-box {
			padding: 50rpx 0;
		}

		.charge-list {
			background-color: #fff;
			padding: 20rpx 48rpx;

			.charge-item {
				padding-top: 40rpx;

				.title {
					color: #262626;
					font-size: 36rpx;
				}

				.item-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 80rpx;

					.tip-box {
						color: #828698;
						font-size: 28rpx;
					}

					.num-box {
						color: #262626;
						font-size: 36rpx;
					}
				}
			}

			.total {
				padding: 40rpx 0;
				color: #262626;
				font-size: 36rpx;

				.total-data {
					color: #00B8DF;
					font-size: 48rpx;
				}
			}
		}

		.water-consumption {
			margin-top: 40rpx;
			padding: 46rpx;
			background-color: #fff;

			.total {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.total-data {
					color: #00B8DF;
					font-size: 48rpx;
				}

				.unfold-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 24rpx;
					width: 144rpx;
					height: 48rpx;
					border: 1px solid #17DA9C;
					font-size: 28rpx;
					color: #17DA9C;

					.reverse {
						transform: rotateX(180deg);
					}
				}
			}

			.record-list {
				padding-top: 40rpx;

				.record-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 80rpx;

					.date-box {
						font-size: 28rpx;
						color: #828698;
					}

					.count {
						font-size: 36rpx;
						color: #262626;
					}
				}
			}
		}
	}
</style>