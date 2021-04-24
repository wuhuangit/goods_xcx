<template>
	<view class="conainer" :style="'height: '+docheight+'px;'">
		<view class="paytop">
			<view class="paymoney">￥{{payobj.order_total_money}}</view>
			<view class="paytishi">订单15分钟未支付将自动关闭</view>
			<view class="payitem">
				<view class="itemname">订单编号</view>
				<view class="itemval">{{payobj.order_number}}</view>
			</view>
			<view class="payitem">
				<view class="itemname">下单时间</view>
				<view class="itemval">{{payobj.order_time}}</view>
			</view>
		</view>
		<view class="payunder">
			<view class="paytypeitem">
				<view class="payicon iconfont icon-weixin"></view>
				<view class="payinfo">
					<view class="payinfo_title">微信支付</view>
					<view class="payinfo_val">使用微信快捷支付</view>
				</view>
				<view class="checkbox">
					<view class="checkboxnei"></view>
				</view>
			</view>
		</view>
		<view class="footbox" @click="payfn">确认支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				docheight:'',
				token:'',
				order_id:'',
				payobj:{},
			};
		},
		methods:{
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/payOrder', //仅为示例，并非真实接口地址。
				    data: {
						order_id:this.order_id
				    },
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							_this.payobj = res.data.data
						}
				    }
				})
			},
			payfn(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/paymentOrder', //仅为示例，并非真实接口地址。
				    data: {
						order_id:this.order_id,
						pay_type:'1',
				    },
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							var data = res.data.data
							uni.requestPayment({
							    provider: 'wxpay',
							    timeStamp: data.timeStamp,
							    nonceStr: data.nonceStr,
							    package: data.package,
							    signType: data.signType,
							    paySign:data.paySign,
							    success: function (res) {
									uni.redirectTo({
									    url: '../succuse/succuse?id='+_this.order_id
									});
							        // console.log('success:' + JSON.stringify(res));
							    },
							    fail: function (err) {
									uni.redirectTo({
									    url: '../err/err'
									});
							        // console.log('fail:' + JSON.stringify(err));
							    }
							});
						}
				    }
				})
				
			}
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
	.conainer{
		width: 100%;
		background-color: rgb(247,247,247);
		.paytop,.payunder{
			width: 100%;
			background-color: white;
			padding: 30rpx;
			box-sizing: border-box;
			.paymoney{
				text-align: center;
				width: 100%;
				padding: 80rpx;
				box-sizing: border-box;
				font-size: 70rpx;
			}
			.paytishi{
				font-size: 28rpx;
				text-align: center;
				width: 100%;
			}
			.payitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin: 30rpx 0;
				font-size: 34rpx;
			}
		}
		.payunder{
			margin-top: 30rpx;
			.paytypeitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				box-sizing: border-box;
				.payinfo{
					width: 200rpx;
					flex: 1;
					margin: 0 30rpx;
					.payinfo_title{
						height: 40rpx;
						line-height: 40rpx;
						font-size: 36rpx;
					}
					.payinfo_val{
						color: #666;
						font-size: 30rpx;
						margin-top: 5rpx;
					}
				}
				.payicon{
					height: 45rpx;
					width: 45rpx;
					line-height: 45rpx;
					text-align: center;
					margin-top: 15rpx;
					font-size: 60rpx;
					margin-right: 30rpx;
					color: rgb(43,153,57);
				}
				.checkbox{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					border: 1rpx solid orangered;
					margin-top: 18rpx;
					padding: 5rpx;
					box-sizing: border-box;
					.checkboxnei{
						background-color: orangered;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
		}
		.footbox{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			color: white;
			background-color:orangered;
			padding: 30rpx 0;
			text-align: center;
			font-size: 34rpx;
		}
	}
</style>
