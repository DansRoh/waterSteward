<template>
	<view class="page-scanId">
		<ocr-navigator @onSuccess="success" certificateType="idCard" :opposite="false">
			<button type="primary">点击上传身份证正面</button>
		</ocr-navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			success(e) {
				console.log('e', e);
			},
		}
	}
</script>

<style>

</style>