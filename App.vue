<script>
	export default {
		onLaunch() {
			console.log('onLaunch');
			// const isLogin = uni.getStorageSync('isLogin');
			const isLogin = true
			if (!isLogin) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}

			// 计算自定义navbar高度（单位px）,并存入localStorage
			const {
				screenWidth,
				statusBarHeight
			} = uni.getSystemInfoSync()
			const navHeight = 40 + statusBarHeight
			uni.setStorageSync('navHeight', navHeight)
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "static/css/common.css";
	@import "/wxcomponents/@vant/common/index.wxss";
</style>