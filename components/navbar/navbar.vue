<template>
	<view class="cus-nav-box">
		<view class="navbar"
			:style="{height: navigationBarHeight + statusBarHeight + 'px', paddingTop: statusBarHeight + 'px', paddingRight: navigationPaddingRight + 'px'}">
			<!-- 在这里添加你的自定义导航栏内容 -->
			<slot name="content"></slot>
		</view>

		<!-- 添加一个同样高度的占位元素，防止内容被导航栏遮挡 -->
		<view :style="{height: navigationBarHeight + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				menuButtonInfo: null,
				navigationBarHeight: 0,
				navigationPaddingRight: 0, // 导航栏右侧按钮宽度
			};
		},
		created() {
			this.getNavBarInfo();
		},
		methods: {
			getNavBarInfo() {
				const systemInfo = uni.getSystemInfoSync();
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();

				if (!menuButtonInfo) {
					menuButtonInfo = {
						width: 96,
						height: 32,
						top: systemInfo.statusBarHeight + 6,
						right: systemInfo.windowWidth - 10
					};
				}

				const navigationBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height;

				this.statusBarHeight = systemInfo.statusBarHeight;
				this.menuButtonInfo = menuButtonInfo;
				this.navigationBarHeight = navigationBarHeight;
				this.navigationPaddingRight = systemInfo.windowWidth - menuButtonInfo.left + 10

			}
		}
	};
</script>

<style lang="less" scoped>
	.navbar {
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 999;

		/* 保证导航栏在内容之上 */
	}
</style>