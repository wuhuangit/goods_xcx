<template>
	<view class="container" :style="'height: '+docheight+'px;'">
		<!-- <view class="bannerbox">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in goodsobj.goods_imgs" :key="index">
					<image class="swiperimg" :src="item"></image>
				</swiper-item>
			</swiper>
		</view> -->
		<view class="detaiimgbox">
			<image class="drtailimg" :src="goodsobj.goods_imgs[0]"></image>
		</view>
		<view class="goodsinfo">
			<view class="goodsname">{{goodsobj.goods_name}}</view>
			<view class="goodsprice">
				<view class="priceyuan">￥{{goodsobj.goods_present_price}}</view>
				<view class="pricexian"><text>￥{{goodsobj.goods_original_price}}</text></view>
			</view>
			<view class="goodsdec">{{goodsobj.goods_describe}}</view>
			<view class="goodsnum">
				<view class="addbox" @click="jianfn">-</view>
				<view class="numinput">
					<input v-model="goodsnum" />
				</view>
				<view class="addbox" @click="addfn">+</view>
			</view>
		</view>
		<view class="footbox">
			<view class="allmoney">总价：{{(goodsnum*goodsobj.goods_present_price).toFixed(2)}}</view>
			<view class="btnbox">
				<view class="buybtn" @click="addcarfn">加入购物车</view>
				<view class="buybtn" @click="buyfn">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				docheight:0,
				goodsnum:0,
				
				goods_id:0,
				goodsobj:{},
				token:'',
			};
		},
		methods:{
			addcarfn(){
				if(this.goodsnum<=0){
					uni.showToast({
						icon:'none',
						title:"商品数量不能为空" 
					})
					return false
				}
				var obj = {
							goods_id:this.goods_id,
							num:this.goodsnum,
						}
				if(!this.token){
					uni.showToast({
						title: '登录过期',
						icon:"none"
					});
					setTimeout(function(){
						uni.redirectTo({
						    url: '../my/my'
						});
					},1000)
					return false
				}
				let _this = this
				uni.request({
					url: this.apis+'/user/Order/shoppingCart', //仅为示例，并非真实接口地址。
					data:obj,
					method:'post',
					header:{
						'token':this.token
					},
					success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title: '添加成功'
							})
						}else if(res.data.code==2){
							uni.showToast({
								title: '登录过期',
								icon:"none"
							})
							setTimeout(function(){
								uni.redirectTo({
									url: '../my/my'
								});
							},1000)
						}
					}
				});
			},
			buyfn(){
				if(this.goodsnum<=0){
					uni.showToast({
						icon:'none',
						title:"商品数量不能为空" 
					})
					return false
				}
				var obj = [
						{
							goods_id:this.goods_id,
							goods_image:this.goodsobj.goods_imgs[0],
							goods_name:this.goodsobj.goods_name,
							goods_price:this.goodsobj.goods_present_price,
							num:this.goodsnum,
						}
					]
					if(!this.token){
						uni.showToast({
							title: '登录过期',
							icon:"none"
						});
						setTimeout(function(){
							uni.redirectTo({
							    url: '../my/my'
							});
						},1000)
						return false
					}
					let _this = this
					uni.request({
						url: this.apis+'/user/Order/settlement', //仅为示例，并非真实接口地址。
						data:{
							goods_info:JSON.stringify(obj)
						},
						method:'post',
						header:{
							'token':this.token
						},
						success: (res) => {
							if(res.data.code==1){
								uni.redirectTo({
									url: '../buy/buy'
								});
							}else if(res.data.code==2){
								uni.showToast({
									title: '登录过期',
									icon:"none"
								})
								setTimeout(function(){
									uni.redirectTo({
										url: '../my/my'
									});
								},1000)
							}
						}
					});
			},
			jianfn(){
				if(this.goodsnum>0){
					this.goodsnum--
				}
			},
			addfn(){
				this.goodsnum++
			},
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Goods/GoodsDetails', //仅为示例，并非真实接口地址。
				    data: {
				        goods_id: this.goods_id
				    },
					method:'post',
				    success: (res) => {
				        this.text = 'request success';
						if(res.data.code==1){
							_this.goodsobj = res.data.data
						}
				    }
				});
			}
		},
		onLoad(option) {
			let _this = this
			this.goods_id = option.id
			if(this.goods_id){
				this.getdata()
			}else{
				uni.redirectTo({
				    url: '../goods/goods'
				});
			}
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
					_this.token = res.data
			    }
			})
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		background-color:rgb(247,247,247);
		.bannerbox{
			width: 100%;
			.swiper{
				width: 100%;
				.swiperimg{
					width: 100%;
				}
			}
		}
		.goodsinfo{
			width: 90%;
			margin: 30rpx auto;
			background-color: white;
			border-radius: 10rpx;
			padding: 30rpx;
			box-sizing: border-box;
			.goodsname{
				font-weight: bold;
				font-size: 40rpx;
				width: 100%;
			}
			.goodsprice{
				width: 100%;
				display: flex;
				color:orangered;
				font-size: 38rpx;
				margin: 15rpx 0;
				.pricexian{
					text-decoration: line-through;
					color: #C1C1C1;
					font-size: 26rpx;
					line-height: 55rpx;
					margin-left: 30rpx;
				}
			}
			.goodsdec{
				width: 100%;
				font-size: 30rpx;
			}
			.goodsnum{
				width: 300rpx;
				border: 1rpx solid orangered;
				margin-top: 20rpx;
				display: flex;
				.addbox{
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					background-color: orangered;
					color: white;
					text-align: center;
				}
				.numinput{
					width: 100rpx;
					flex: 1;
					color: orangered;
					input{
						width: 100%;
						height: 60rpx;
						text-align: center;
					}
				}
			}
		}
		.detaiimgbox{
			width: 90%;
			margin: 30rpx auto;
			.drtailimg{
				width: 100%;
			}
		}
		.footbox{
			width: 100%;
			background-color: white;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			.allmoney{
				color: orangered;
				line-height: 70rpx;
			}
			.btnbox{
				display: flex;
				.buybtn{
					width: 200rpx;
					background-color:orangered;
					color: white;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 32rpx;
					margin-left: 10px;
				}
			}
		}
	}
</style>
<style>
	.bannerbox uni-swiper{
		height: 400rpx !important;
	}
</style>
