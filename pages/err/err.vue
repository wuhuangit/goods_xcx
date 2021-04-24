<template>
	<view class="container">
		<view class="succuseicon">
			<image style="width: 300rpx;height: 350rpx;" src="../../static/img/err.png"></image>
		</view>
		<view class="errtext">支付失败</view>
		<view class="btnitem" style="margin-top: 100rpx;">
			<button @click="tohome">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			tohome(){
				uni.redirectTo({
				    url: '../index/index'
				});
			}
		}
	}
</script>

<style lang="less">
.container{
	width: 100%;
	padding: 30rpx 50rpx;
	text-align: center;
	box-sizing: border-box;
	.errtext{
		font-size: 40rpx;
		text-align: center;
		color: red;
	}
}
</style>
