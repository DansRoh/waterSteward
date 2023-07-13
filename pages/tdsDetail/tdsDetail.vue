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
						xAxis: {
							type: 'category',
							boundaryGap: false
						},
						yAxis: {
							type: 'value',
							boundaryGap: [0, '30%']
						},
						visualMap: {
							type: 'piecewise',
							show: false,
							dimension: 0,
							seriesIndex: 0,
							pieces: [{
									gt: 1,
									lt: 3,
									color: 'rgba(0, 0, 180, 0.4)'
								},
								{
									gt: 5,
									lt: 7,
									color: 'rgba(0, 0, 180, 0.4)'
								}
							]
						},
						series: [{
							type: 'line',
							smooth: 0.6,
							symbol: 'none',
							lineStyle: {
								color: '#5470C6',
								width: 5
							},
							markLine: {
								symbol: ['none', 'none'],
								label: {
									show: false
								},
								data: [{
									xAxis: 1
								}, {
									xAxis: 3
								}, {
									xAxis: 5
								}, {
									xAxis: 7
								}]
							},
							areaStyle: {},
							data: [
								['2019-10-10', 200],
								['2019-10-11', 560],
								['2019-10-12', 750],
								['2019-10-13', 580],
								['2019-10-14', 250],
								['2019-10-15', 300],
								['2019-10-16', 450],
								['2019-10-17', 300],
								['2019-10-18', 100]
							]
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
		height: 50vh;

		.uni-ec-canvas {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
</style>