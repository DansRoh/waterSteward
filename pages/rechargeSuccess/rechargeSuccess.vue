<template>
	<view class="page-rechargeSuccess">
		<van-image class="mt80" src="/static/icon/42_order.png" width="376rpx" height="376rpx"></van-image>
		<view class="">
			充值成功！
		</view>
		<view class="info-list">
			<view class="info-item">
				<view>
					充值金额
				</view>
				<view>
					¥20
				</view>
			</view>
			<view class="info-item">
				<view>
					交易单号
				</view>
				<view>
					S12548963315
				</view>
			</view>
			<view class="info-item">
				<view>
					充值时间
				</view>
				<view>
					2022年10月24日 12:15
				</view>
			</view>
		</view>
	
		<view class="btn-box">
			<van-button custom-class="mb30" type="primary" size="lang" color="#5A92FF" round block>返回首页</van-button>
			<van-button type="primary" size="lang" color="#979797" plain round block>继续充值</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.page-rechargeSuccess {
		height: 100vh;
		background-color: #F2F4F7;
		padding: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.info-list {
			margin-top: 60rpx;
			width: 100%;
			.info-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #5E5E5E;
				font-size: 28rpx;
				margin-top: 32rpx;
			}
		}
		.btn-box {
			margin-top: 200rpx;
			width: 100%;
		}
	}
</style>