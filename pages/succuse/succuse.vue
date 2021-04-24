<template>
	<view class="container">
		<view class="succuseicon">
			<image src="../../static/img/success.png"></image>
		</view>
		<view class="btnitem">
			<button @click="tohome">返回首页</button>
		</view>
		<view class="btnitem">
			<button style="background-color: orangered;color: white;" @click="toorder">我的订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id:'',
			};
		},
		methods:{
			tohome(){
				uni.redirectTo({
				    url: '../index/index'
				});
			},
			toorder(){
				uni.redirectTo({
				    url: '../goods_detail/goods_detail?id='+this.order_id
				});
			}
		},
		onLoad(option) {
			this.order_id = option.id
		}
	}
</script>

<style lang="less">
.container{
	width: 100%;
	padding: 30rpx 50rpx;
	text-align: center;
	box-sizing: border-box;
	.succuseicon{
		image{
			width: 300rpx;
			height: 300rpx;
		}
	}
	.btnitem{
		width: 100%;
		margin-top: 30rpx;
		margin-bottom: 50rpx;
	}
}
</style>
