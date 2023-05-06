<template>
	<view class="page-service">
		<van-grid clickable column-num="3" gutter="60rpx" square>
			<van-grid-item icon-class="mb18 mt18" content-class="custom-grid-item" link-type="navigateTo"
				url="/pages/recharge/recharge" text="我要充值">
				<van-icon slot="icon" name="/static/icon/32_feedback_01.png" size="96rpx"></van-icon>
			</van-grid-item>
			<van-grid-item @tap="clickNotOpen" icon-class="mb18 mt18" content-class="custom-grid-item" text="开发票">
				<van-icon slot="icon" name="/static/icon/33_feedback_02.png" size="96rpx"></van-icon>
			</van-grid-item>
			<van-grid-item @tap="clickNotOpen" icon-class="mb18 mt18" content-class="custom-grid-item" text="电话联系">
				<van-icon slot="icon" name="/static/icon/34_feedback_03.png" size="96rpx"></van-icon>
			</van-grid-item>
		</van-grid>
		<view class="voice-msg">
			<view class="fs32 c262626 mb18">
				留言反馈
			</view>
			<textarea class="voice-msg-textarea" :value="voiceMsg" @input="textAreaInput" placeholder="这里是备注内容" />
		</view>
		<van-button :disabled="isDisableSubmit" @tap="submit" type="primary" custom-style="width:384rpx;margin:40rpx auto;" color="#17DA9C" block
			round>确认提交</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				voiceMsg: '',
				isDisableSubmit: true,
			};
		},
		methods: {
			clickNotOpen() {
				uni.showToast({
					title: "该功能暂未开放"
				})
			},
			async submit() {
				try {
					const {
						statusCode,
						data
					} = await this.$http("/consumer/feedbacks", "post", {
						content: this.voiceMsg
					})
					if (statusCode === 201) {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: '网络错误',
							icon: 'error'
						})
					}
					this.voiceMsg = ''
					this.isDisableSubmit = true
				} catch (e) {
					//TODO handle the exception
					uni.showToast({
						title: '网络错误',
						icon: 'error'
					})
					console.log('e', e);
				} finally {
					this.voiceMsg = ''
					this.isDisableSubmit = true
				}
			},
			textAreaInput(e) {
				this.voiceMsg = e.detail.value
				if (this.voiceMsg === '') {
					this.isDisableSubmit = true
				} else {
					this.isDisableSubmit = false
				}
			}
		}
	}
</script>

<style lang="less">
	.page-service {
		padding-top: 60rpx;
		height: 100vh;
		box-sizing: border-box;
		background-color: #F2F4F7;

		.custom-grid-item {
			border-radius: 16rpx;
		}

		.voice-msg {
			width: 658rpx;
			margin: 0 auto;

			.voice-msg-textarea {
				width: 658rpx;
				box-sizing: border-box;
				height: 480rpx;
				padding: 38rpx 42rpx;
				background-color: #fff;
				border: 2rpx solid #BDBDBD;
				border-radius: 8rpx;
			}
		}
	}
</style>