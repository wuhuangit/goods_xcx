<template>
	<view class="container" :style="'height: '+docheight+'px;'">
		<view class="adressbox">
				<view class="adresstop">
					<view class="username">{{orderobj.user_address_person}}</view>
					<view class="usertel">{{orderobj.user_address_phone}}</view>
				</view>
				<view class="adressval">{{orderobj.user_address_detail}}</view>
		</view>
		<view class="orderbox">
			<view class="listitem" v-for="item in orderobj.order_goods_info">
				<view class="goodsimg" @click="orderdetail(item)">
					<image :src="item.goods_image"></image>
				</view>
				<view class="goodsinfo">
					<view class="goodsname">
						{{item.goods_name}}
					</view>
					<view class="goodsnum">商品数量：×{{item.num}}</view>
					<view class="goodsprice">
						<view class="priceyuan">
							<text>价格：￥{{item.goods_price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="goodsprice">
				<view class="priceyuan">
					<text>价格：￥{{orderobj.order_total_money}}</text>
				</view>
			</view>
		</view>
		<view class="oderinfo">
				<view class="adresstop">
					<view class="username">订单信息</view>
				</view>
				<view class="adressval">
					<view class="infoitem">
						<view class="itemname">订单编号</view>
						<view class="itemval">{{orderobj.order_number}}</view>
					</view>
					<view class="infoitem">
						<view class="itemname">下单时间</view>
						<view class="itemval">{{orderobj.order_time}}</view>
					</view>
					<view class="infoitem" v-if="orderobj.order_status==2||orderobj.order_status==3||orderobj.order_status==4">
						<view class="itemname">付款时间</view>
						<view class="itemval">{{orderobj.order_pay_time}}</view>
					</view>
					<view class="infoitem" v-if="orderobj.order_accept_time">
						<view class="itemname">发货时间</view>
						<view class="itemval">{{orderobj.order_accept_time}}</view>
					</view>
					<view class="infoitem" v-if="orderobj.order_complete_time">
						<view class="itemname">完成时间</view>
						<view class="itemval">{{orderobj.order_complete_time}}</view>
					</view>
					<view class="infoitem">
						<view class="itemname">订单备注</view>
						<view class="itemval">{{orderobj.order_remarks}}</view>
					</view>
					<view class="infoitem">
						<view class="itemname">订单状态</view>
						<view class="itemval" style="color: orangered;">
							<text v-if="orderobj.order_status==1">待支付</text>
							<text v-if="orderobj.order_status==2">待发货</text>
							<text v-if="orderobj.order_status==3">待收货</text>
							<text v-if="orderobj.order_status==4">已完成</text>
							<text v-if="orderobj.order_status==5">已关闭</text>
						</view>
					</view>
				</view>
		</view>
		<view class="footbox"  v-if="orderobj.order_status==3">
			<view class="buybtn" @click="surefn">确认收货</view>
		</view>
		<view class="footbox" v-if="orderobj.order_status==1">
			<view class="buybtn" @click="payfn">立即付款</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				docheight:'',
				order_id:'',
				orderobj:{},
				token:'',
			}
		},
		methods: {
			payfn(){
				uni.redirectTo({
				    url: '../pay/pay?id='+this.order_id
				});
			},
			surefn(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/confirmReceiving', //仅为示例，并非真实接口地址。
				    data: {
						order_id:this.order_id
				    },
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title: '收货成功',
								icon:"success"
							})
							_this.getdata()
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
							else if(res.data.code==0){
									uni.showToast({
										title: '收货失败',
										icon:"none"
									})
								}
				    }
				})
			},
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/orderDetails', //仅为示例，并非真实接口地址。
				    data: {
						order_id:this.order_id
				    },
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							_this.orderobj = res.data.data
						}
				    }
				})
			},
		},
		onLoad(option) {
			let _this = this
			this.order_id = option.id
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
					_this.token = res.data
					if(_this.order_id){
						_this.getdata()
					}else{
						uni.redirectTo({
						    url: '../order/order'
						});
					}
			    },
				fail:function(){
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
			});
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		background-color: rgb(247,247,247);
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		.adressbox,.oderinfo{
			width: 90%;
			margin: 0rpx auto;
			background-color: white;
			padding: 15rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			.adresstop{
				width: 100%;
				display: flex;
				font-size: 36rpx;
				height: 40rpx;
				line-height: 40rpx;
				.usertel{
					margin-left: 20rpx;
					font-size: 30rpx;
					line-height: 50rpx;
					color: #666;
				}
			}
			.adressval{
				margin-top: 10rpx;
				font-size: 30rpx;
				.infoitem{
					width: 100%;
					display: flex;
					font-size: 28rpx;
					padding: 10rpx;
					box-sizing: border-box;
					.itemname{
						width: 120rpx;
					}
					.itemval{
						margin-left: 30rpx;
					}
				}
			}
		}
		.orderbox{
			width: 90%;
			margin: 0rpx auto;
			background-color: white;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
			margin-top: 30rpx;
			.listitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				border-radius: 15rpx;
				padding-bottom: 10px;
				margin-bottom: 10px;
				border-bottom: 1px solid #ccc;
				.goodsimg{
					width: 160rpx;
					height: 160rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.goodsinfo{
					width: 100rpx;
					flex: 1;
					margin-left:20rpx;
					.goodsname{
						width: 100%;
						font-size: 36rpx;
						font-weight: bold;
						height: 50rpx;
						line-height: 50rpx;
						color: #333333;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.goodsnum{
						width: 100%;
						height: 60rpx;
						width: 100%;
						font-size: 28rpx;
						color: #C1C1C1;
						margin-top: 10rpx;
					}
					.goodsprice{
						width: 100%;
						font-size: 28rpx;
						height: 40rpx;
						line-height: 40rpx;
						margin-top: 0;
						text-align: left;
						.priceyuan{
							color: #C1C1C1;
							color: rgb(50,50,50);
						}
					}
				}
			}
			.goodsprice{
				width: 100%;
				font-size: 30rpx;
				height: 40rpx;
				line-height: 40rpx;
				margin-top: 20rpx;
				text-align: right;
				.priceyuan{
					color: #C1C1C1;
					color: orangered;
				}
			}
		}
		.oderinfo{
			margin-top: 30rpx;
		}
		.footbox{
			width: 100%;
			background-color: white;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 20rpx;
			display: flex;
			justify-content: flex-end;
			box-sizing: border-box;
			.buybtn{
				width: 200rpx;
				background-color:orangered;
				color: white;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 32rpx;
			}
		}
	}
</style>
