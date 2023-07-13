<template>
	<view class="page-tdsDetail">
		<uni-ec-canvas class="uni-ec-canvas" id="uni-ec-canvas" ref="uni-ec-canvas" canvas-id="uni-ec-canvas" :ec="ec"
			@inited="inited"></uni-ec-canvas>
	</view>
</template>


<script>
	// 此处将路径替换为你放置该组件的路径  
	import uniEcCanvas from '../../components/uni-ec-canvas/uni-ec-canvas.vue'

	export default {
		data() {
			return {
				ec: {
					option: {
						title: {
							text: '用水TDS值随时间变化',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								animation: false
							},
							formatter: function(params) {
								var date = new Date(params[0].value[0]);
								return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + params[0].value[
								1];
							}
						},
						xAxis: {
							type: 'time',
							splitLine: {
								show: false
							}
						},
						yAxis: {
							type: 'value',
							boundaryGap: [0, '100%'],
							splitLine: {
								show: false
							}
						},
						series: [{
							name: 'TDS值',
							type: 'line',
							showSymbol: false,
							hoverAnimation: false,
							data: [
								[new Date('2022/01/01 00:00:00'), 20],
								[new Date('2022/01/01 00:01:00'), 25],
								[new Date('2022/01/01 00:02:00'), 30],
								[new Date('2022/01/01 00:03:00'), 28],
								[new Date('2022/01/01 00:04:00'), 35],
								[new Date('2022/01/01 00:05:00'), 40],
								[new Date('2022/01/01 00:06:00'), 45]
							],
							areaStyle: {}
						}]
					}
				}
			}
		},
		components: {
			uniEcCanvas
		},
		methods: {
			inited(chart) {
				console.log('图表初始化完毕')
				console.log('chart实例', chart)
			}
		}
	}
</script>

<style lang="less">
	.page-tdsDetail {
		width: 100vw;
		height: 500rpx;

		.uni-ec-canvas {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
</style>