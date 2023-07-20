<template>
	<view class="page-tdsDetail">
		<view class="filter-box df">
			<picker mode="date" :value="curDate" fields="month" @change="bindDateChange">
				<view class="current-date fs28 c262626 pl40 pr60">
					选择时间：{{getCurDateFormat}}
					<van-icon class="ml10" name="/static/icon/04_del.png" size="28rpx"></van-icon>
				</view>
			</picker>
		</view>

		<uni-ec-canvas v-if="tdsData.length" class="uni-ec-canvas" id="uni-ec-canvas" ref="uni-ec-canvas"
			canvas-id="uni-ec-canvas" :ec="ec" @inited="inited"></uni-ec-canvas>
		<van-empty v-else description="暂无数据"></van-empty>
	</view>
</template>


<script>
	// 此处将路径替换为你放置该组件的路径  
	import uniEcCanvas from '../../components/uni-ec-canvas/uni-ec-canvas.vue'
	import { formatDateTime01 } from '../../utils/tool.js'
	export default {
		components: {
			uniEcCanvas
		},
		data() {
			return {
				tdsData: [],
				ec: {
					option: {
						title: {
							text: 'tds',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								animation: false
							}
						},
						legend: {
							data: ['当前月份tds值统计'],
							left: 10
						},
						dataZoom: [{
								show: true,
								realtime: true,
								start: 30,
								end: 70,
								xAxisIndex: [0]
							},
							{
								type: 'inside',
								realtime: true,
								start: 30,
								end: 70,
								xAxisIndex: [0]
							}
						],
						grid: [{
								left: 60,
								right: 50,
								height: '35%'
							},
							{
								left: 60,
								right: 50,
								top: '55%',
								height: '35%'
							}
						],
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							axisLine: {
								onZero: true
							},
							data: [] // timeData
						}],
						yAxis: [{
							name: 'tds',
							type: 'value',
							scale: true
						}],
						series: [{
							name: 'tds',
							type: 'line',
							symbolSize: 8,
							data: [] // valueData
						}]
					}
				},
				devId: null,
				curDate: '2023-06',
			}
		},
		computed: {
			getCurDateFormat() {
				const arr = this.curDate.split('-')
				return arr[0] + '年' + arr[1] + '月'
			},
		},
		onShow() {},
		onLoad(option) {
			this.formatCurDate()
			this.devId = option.devId
			this.gettdsData()
		},
		methods: {
			inited(chart) {
				console.log('图表初始化完毕')
				console.log('chart实例', chart)
			},
			// 获取tds数据
			async gettdsData() {
				const {
					data,
					statusCode
				} = await this.$http(`/consumer/devices/${this.devId}/tds`, 'get', {
					month: this.curDate.replace('-', '')
				})
				if (statusCode === 200) {
					this.tdsData = data.map(item => {
						item.at = formatDateTime01(item.at)
						return item
					})
					const timeData = this.tdsData.map((item) => {
						return item.at
					})
					const valueData = this.tdsData.map(item => {
						return item.tds
					})
					this.ec.option.xAxis[0].data = timeData
					this.ec.option.series[0].data = valueData
				}
			},
			bindDateChange(e) {
				this.curDate = e.detail.value
				this.gettdsData()
			},
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
		}
	}
</script>

<style lang="less">
	.page-tdsDetail {
		width: 100vw;
		height: 500rpx;

		.filter-box {
			padding: 50rpx 0;
		}

		.uni-ec-canvas {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
</style>