<script>
	export default {
		onLaunch() {
			console.log('onLaunch');
			const isLogin = uni.getStorageSync('isLogin');
			if (isLogin) {
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