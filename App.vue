<script>
	export default {
		onLaunch() {
			const token = uni.getStorageSync('token');
			if (token) {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			} 
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "static/css/common.css";
	@import "/wxcomponents/@vant/common/index.wxss";
</style>