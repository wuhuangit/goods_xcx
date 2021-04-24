<template>
	<view class="container" :style="'min-height: '+docheight+'px;'">
		<view class="navbox">
			<view :class="item.active?'navitem2':'navitem'" v-for="item in navarr" @click="navfn(item)">{{item.val}}</view>
		</view>
		<view class="goodslist">
			<view class="oderbox" v-for="item in orderlist">
				<view class="ordertitle" @click="orderdetail(item)">
					订单编号：{{item.order_number}}
				</view>
				<view class="listitem" v-for="item2 in item.order_goods_info">
					<view class="goodsimg">
						<image :src="item2.goods_image"></image>
					</view>
					<view class="goodsinfo">
						<view class="goodsname">
							{{item2.goods_name}}
						</view>
						<view class="goodsnum">商品数量：×{{item2.num}}</view>
						<view class="goodsprice">
							<view class="priceyuan">
								<text>价格：￥{{item2.goods_price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="allmoney">
					<view class="orderstatus">
						<view v-if="statustype==0">
							<view v-if="item.order_status==1">待支付</view>
							<view v-if="item.order_status==2">待发货</view>
							<view v-if="item.order_status==3">待收货</view>
							<view v-if="item.order_status==4">已完成</view>
							<view v-if="item.order_status==5">订单关闭</view>
						</view>
					</view>
					<view>总价:<text style="color: orangered;"> {{item.order_total_money}}</text></view>
				</view>
				<view class="btnbox" v-if="item.order_status==3">
					<view class="surebtn" @click="surefn(item)">确认收货</view>
				</view>
				<view class="btnbox" v-if="item.order_status==1">
					<view class="surebtn" @click="payfn(item)">立即付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navarr:[
					{val:'全部',id:0,active:true},
					{val:'待支付',id:1,active:false},
					{val:'待发货',id:2,active:false},
					{val:'待收货',id:3,active:false},
					{val:'已完成',id:4,active:false},
					{val:'订单关闭',id:5,active:false},
				],
				docheight:'',
				orderlist:[],
				statustype:0,
				totlePage:'',
				params:{
	　　　　　　　　page:1,
	　　　　　　　　num:5,
	　　　　　　},
	　　　　　　count:'',
	　　　　　　showTxt:'',
			   canget:true,
			   token:'',
			};
		},
		methods:{
			surefn(item){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/confirmReceiving', //仅为示例，并非真实接口地址。
				    data: {
						order_id:item.id
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
						}else {
							uni.showToast({
								title: '收货失败',
								icon:"none"
							})
						}
				    }
				})
			},
			payfn(item){
				uni.redirectTo({
				    url: '../pay/pay?id='+item.id
				});
			},
			navfn(item){
				for (let i = 0;i<this.navarr.length;i++) {
					this.navarr[i].active = false
				}
				this.orderlist = []
				item.active = true
				this.statustype = item.id
				this.getdata()
			},
			orderdetail(item){
				uni.redirectTo({
				    url: '../oder_detail/oder_detail?id='+item.id
				});
			},
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/orderList', //仅为示例，并非真实接口地址。
				    data: {
						type:this.statustype
				    },
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
				        this.text = 'request success';
						if(res.data.code==1){
							for (let i = 0;i<res.data.data.data.length;i++) {
								_this.orderlist.push(res.data.data.data[i])
							}	
							_this.params.num = res.data.data.total
							if(res.data.data.last_page<res.data.data.current_page){
								_this.canget = true
							}else{
								_this.canget = false
							}
							
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
				})
			},
			fenye(){
			    //获取列表之后
			    this.totlePage = Math.ceil(this.count / this.params.num);
			    //页面触底事件
			    if(this.params.page >= this.totlePage&&this.canget){
			        this.showTxt = '加载中'
					this.params.page++
					this.canget = false
					this.getdata()
			    }else{
					this.showTxt = '已加载完'
				}
			},
			onLoad() {
				this.orderlist = []
				let _this = this
				uni.getStorage({
				    key: 'token',
				    success: function (res) {
						_this.token = res.data
						_this.getdata()
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
				this.docheight = document.documentElement.clientHeight-50
			}
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		background-color: rgb(247,247,247);
		.navbox{
			width: 100%;
			background-color: white;
			// display: flex;
			// justify-content: space-between;
			white-space: nowrap;
			overflow-x: auto;
			.navitem2,.navitem{
				width: 200rpx;
				text-align: center;
				padding: 20rpx 0;
				box-sizing: border-box;
				font-size: 32rpx;
				display: inline-block;
			}
			.navitem2{
				border-bottom: 1rpx solid orangered;
				color: orangered;
			}
		}
		.goodslist{
			width: 100%;
			padding:50rpx 5%;
			box-sizing: border-box;
			.oderbox{
				width: 100%;
				background-color: white;
				padding: 30rpx;
				box-sizing: border-box;
				margin-bottom: 30rpx;
				.ordertitle{
					width: 100%;
					font-size: 32rpx;
				}
				.listitem{
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					box-sizing: border-box;
					border-radius: 15rpx;
					padding-bottom: 0;
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
						padding-bottom: 15rpx;
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
				.allmoney{
					width: 100%;
					text-align: right;
					font-size: 36rpx;
					padding: 20rpx 0;
					display: flex;
					justify-content: space-between;
					.orderstatus{
						font-size: 14px;
						line-height: 24px;
						color: orangered;
					}
				}
				.btnbox{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					.surebtn{
						width: 200rpx;
						height: 60rpx;
						border-radius: 30rpx;
						line-height: 60rpx;
						background-color: orangered;
						color: white;
						text-align: center;
						font-size: 30rpx;
						margin-top: 15rpx;
					}
				}
			}
		}
	}
</style>
