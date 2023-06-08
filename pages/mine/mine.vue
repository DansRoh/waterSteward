<template>
	<view class="page-mine">
		<view class="mine-card">
			<view class="top-box">
				<view class="user-photo">
					<van-image @tap="handleChangeAvatar" class="photo-img-class" image-class="cus-img"
						:src="avatarUrl"></van-image>
				</view>
				<view class="user-name">
					{{name}}
				</view>
			</view>
			<view class="mine-card-content">
				<view @tap="handleMineSettings(1)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/17_sheet.png" size="48rpx"></van-icon>
						<view class="ml10">
							充值记录
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
				<view @tap="handleMineSettings(2)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/17_sheet.png" size="48rpx"></van-icon>
						<view class="ml10">
							账单
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
				<view @tap="handleMineSettings(3)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/18_phone04.png" size="48rpx"></van-icon>
						<view class="ml10">
							净水器管理
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
				<view @tap="handleMineSettings(4)" class="handle-box">
					<view class="df">
						<van-icon name="/static/icon/19_account.png" size="48rpx"></van-icon>
						<view class="ml10">
							账号与安全
						</view>
					</view>
					<van-icon name="/static/icon/31_triangeRight.png" size="48rpx"></van-icon>
				</view>
			</view>
		</view>
		<!-- 引入 wx-cropper 组件 -->
		<my-cropper class="my-cropper" @close="hideCut" :cutRatio="cutRatio" v-if="showCropper" :imageSrc="imageSrc"
			:cropperWidth="cropperWidth" :minCropperW="minCropperW" />
	</view>
</template>

<script>
	import {
		baseURL
	} from "../../config/index.js"
	export default {
		data() {
			return {
				avatarUrl: '/static/icon/40_defaultPhoto.png',
				name: '',
				cutRatio: 1, // 初始化裁剪比例,
				showCropper: false,
				imageSrc: '',
				minCropperW: 100,
				cropperWidth: 720,
			};
		},
		onShow() {
			this.initData()
		},
		methods: {
			async hideCut() {
				this.showCropper = false
				const img = arguments[0].detail
				if (img && img.path) {
					// 图片上传到服务器
					try {
						const {
							statusCode,
							data
						} = await uni.uploadFile({
							url: baseURL + '/consumer/profile/avatar', // 你的头像上传接口地址
							filePath: img.path,
							header: {
								'Authorization': 'Token ' + uni.getStorageSync("token"),
								'Content-Type': 'multipart/form-data',
								'Accept': 'application/json;version=1'
							},
							name: 'avatar',
						});

						if (statusCode !== 201) {
							uni.showToast({
								title: '上传失败',
								icon: 'none',
							});
							return;
						}

						// 更新头像 URL，假设服务器返回的新头像 URL 在 data.avatarUrl
						const newAvatarUrl = JSON.parse(data).avatar_url;
						this.avatarUrl = newAvatarUrl;
						this.$store.dispatch('changeUserInfoSync')
					} catch (e) {
						//TODO handle the exception
						console.log(e);
					}
				}
			},
			initData() {
				const userInfo = this.$store.state.userInfo
				this.avatarUrl = userInfo.avatar_url
				this.name = userInfo.name
			},
			async handleChangeAvatar() {
				// 选择图片
				const {
					tempFilePaths
				} = await uni.chooseImage({
					count: 1, // 最多可以选择的图片张数
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				});
				this.imageSrc = tempFilePaths[0]
				this.showCropper = true
			},
			handleMineSettings(type) {
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/rechargeRecord/rechargeRecord"
					})
				} else if (type === 2) {
					uni.navigateTo({
						url: "/pages/bill/bill"
					})
				} else if (type === 3) {
					uni.navigateTo({
						url: "/pages/devManage/devManage"
					})
				} else if (type === 4) {
					uni.navigateTo({
						url: "/pages/accountSafe/accountSafe"
					})
				} else {}
			}
		}
	}
</script>

<style lang="less">
	.page-mine {
		padding-top: 40rpx;
		min-height: 100vh;
		background-color: #F2F4F7;
		box-sizing: border-box;

		.mine-card {
			margin: 0 auto;
			width: 700rpx;
			height: 824rpx;
			background-color: #fff;
			border-radius: 96rpx;
			overflow: hidden;

			.top-box {
				position: relative;
				width: 100%;
				height: 168rpx;
				background-color: #17DA9C;

				.user-photo {
					box-sizing: border-box;
					overflow: hidden;
					position: absolute;
					bottom: -92rpx;
					left: 50%;
					transform: translate(-50%, 0);
					width: 184rpx;
					height: 184rpx;
					border: 6rpx solid #FFFFFF;
					box-shadow: 0rpx 4rpx 18rpx 0rpx rgba(136, 137, 137, 0.29);
					border-radius: 50%;

					.photo-img-class {
						width: 200rpx;
						height: 200rpx;
						border-radius: 50%;
						overflow: hidden;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translateX(-50%) translateY(-50%);
					}

					.cus-img {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translateX(-50%) translateY(-50%);
					}

					.van-image {
						position: unset;
					}

					.upload-box {
						position: absolute;
						bottom: 0;
						right: 0;
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
						border: 6rpx solid #FFFFFF;

						.camera-img-class {
							width: 52rpx;
							height: 52rpx;
							margin-top: -4rpx;
							margin-left: -2rpx;
						}
					}
				}

				.user-name {
					position: absolute;
					bottom: -156rpx;
					left: 50%;
					transform: translate(-50%, 0);
					color: #828698;
					font-size: 36rpx;
				}
			}

			.mine-card-content {
				margin-top: 214rpx;
				box-sizing: border-box;

				.handle-box {
					height: 112rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 34rpx;
					font-size: 32rpx;
					color: #262626;
				}
			}
		}

		.my-cropper {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
		}
	}
</style>