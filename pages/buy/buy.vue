<template>
	<view class="container">
		<view class="topbox" v-if="detaiobj.user_address">
			<view class="rightbox">
				<view class="adress_left">
					<view class="adresstop">
						<view class="username">{{detaiobj.user_address.address_person}}</view>
						<view class="usertel">{{detaiobj.user_address.address_phone}}</view>
					</view>
					<view class="adressval">{{detaiobj.user_address.address_details}}</view>
				</view>
				<view class="adress_more iconfont icon-jiantou" @click="adressfn"></view>
			</view>
		</view>
		<view class="orderbox" v-if="detaiobj.goods_info">
			<view class="listitem" v-for="item in detaiobj.goods_info">
				<view class="goodsimg">
					<image :src="item.goods_image"></image>
				</view>
				<view class="goodsinfo">
					<view class="goodsname">
						{{item.goods_name}}
					</view>
					<view class="goodsnum">商品数量：×{{item.num}}</view>
					<view class="goodsprice">
						<view class="priceyuan">
							<text>单价：￥{{item.goods_price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="beizhubox orderbox">
			<view class="cardtitle">商品备注</view>
			<view class="textcont">
				<textarea placeholder="请输入备注" v-model="order_remarks"></textarea>
			</view>
			<view class="bz_item">
				<view class="bzname">小计:</view>
				<view class="bzval">￥{{detaiobj.total}}</view>
			</view>
		</view>
		<view class="footbox">
			<view class="allmoney">总价：{{detaiobj.total}}</view>
			<view class="buybtn" @click="createorder">创建订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detaiobj:'',
				order_remarks:'',
				token:'',
				ids:'',
			};
		},
		methods:{
			adressfn(){
				uni.redirectTo({
				    url: '../adress/adress?type=1'
				});
			},
			createorder(){
				let _this = this
				if(this.detaiobj.user_address.id==-1){
					uni.showToast({
						title: '请添加地址',
						icon:"none"
					})
					return false
				}
				uni.request({
					url: this.apis+'/user/Order/getOrder', //仅为示例，并非真实接口地址。
					data:{
						user_address_id:this.detaiobj.user_address.id,
						order_remarks:this.order_remarks,
						ids:this.ids,
					},
					method:'post',
					header:{
						'token':this.token
					},
					success: (res) => {
						this.text = 'request success';
						if(res.data.code==1){
							uni.redirectTo({
							    url: '../pay/pay?id='+res.data.data
							});
						}
					}
				});
			},
			getdata(){
				let _this = this
				uni.request({
					url: this.apis+'/user/Order/GetOrderDetails', //仅为示例，并非真实接口地址。
					data:{},
					method:'post',
					header:{
						'token':this.token
					},
					success: (res) => {
						console.log(3333)
						if(res.data.code==1){
							console.log(2222)
							if(res.data.data.user_address==''){
								res.data.data.user_address = {
									address_person:'请添加收货地址',
									address_phone:'',
									address_details:'请添加联系人',
									id:-1,
								}
							}
							_this.detaiobj =res.data.data
							console.log(_this.detaiobj)
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
			}
		},
		onLoad(options) {
			// console.log(ids)
			this.ids = options.ids
			let _this = this
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
					_this.token = res.data
					_this.getdata()
			    },
				fail:function(){
					uni.showToast({
						title: '请授权',
						icon:"none"
					});
					uni.redirectTo({
					    url: '../my/my'
					});
				}
			});
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		background-color: rgb(247,247,247);
		.topbox{
			background-color: orangered;
			width: 100%;
			padding: 50rpx 30rpx 50rpx;
			box-sizing: border-box;
			.rightbox{
				width:100%;
				border-radius: 10rpx;
				background-color: white;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				.adress_left{
					width: 100rpx;
					flex: 1;
					.adresstop{
						height: 40rpx;
						display: flex;
						font-size: 36rpx;
						margin-bottom: 20rpx;
						.usertel{
							color: #666;
							font-size: 30rpx;
							margin-left: 20rpx;
							line-height: 55rpx;
						}
					}
					.adressval{
						font-size: 30rpx;
						height: 30rpx;
						line-height: 30rpx;
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				.adress_more{
					height: 40rpx;
					width: 40rpx;
					text-align: center;
					line-height: 40rpx;
					margin-top: 25rpx;
					font-size: 36rpx;
				}
				
			}
		}
		.orderbox{
			width: 100%;
			background-color: white;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
			.listitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #ccc;
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
						display: flex;
						font-size: 30rpx;
						height: 40rpx;
						line-height: 40rpx;
						.priceyuan{
							color: #C1C1C1;
							color: orangered;
						}
					}
				}
			}
		}
		.beizhubox{
			margin-top: 30rpx;
			.cardtitle{
				font-size: 34rpx;
			}
			.textcont{
				width: 100%;
				margin-top: 30rpx;
				border-radius: 10rpx;
				padding: 30rpx;
				box-sizing: border-box;
				height: 170rpx;
				border: 1px solid #ccc;
				margin-bottom: 30rpx;
			}
			.bz_item{
				width: 100%;
				display: flex;
				font-size: 30rpx;
				justify-content: space-between;
			}
			
		}
		.footbox{
			width: 100%;
			background-color: black;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 20rpx;
			color: white;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			.allmoney{
				color: white;
				line-height: 70rpx;
			}
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
