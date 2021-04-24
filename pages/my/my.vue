<template>
	<view class="container">
		<view class="infobox">
			<view class="userimg">
				<image :src="userimg"></image>
			</view>
			<view class="username">
				{{username}}
			</view>
			<view class="loginbox" >
				<!-- <button open-type="getUserInfo" @getuserinfo="wxAdmin">微信快捷登录</button> -->
				<button v-if="!token||showbtn" class="loginbtn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信快捷登录</button>
				<!-- <button class="wxq-btn loginWx" open-type="getUserInfo" @click="getUserInfo">授权</button> -->
			</view>
		</view>
		<view class="mylist">
			<view :class="index==0?'listitem2':'listitem'" v-for='(item,index) in listarr' :key="index" @click="navfn(item)">
				<view class="itemleft">
					<view :class="'itemicon iconfont '+item.icon"></view>
					<view class="itemval">{{item.val}}</view>
				</view>
				<view class="itemright iconfont icon-jiantou"></view>
			</view>
		</view>
		<view class="footbox">
			<view :class="item.active?'footitem2':'footitem'" v-for="item in foorarr" @click="footfn(item)">
				<view :class="'itemicon iconfont '+item.icon"></view>
				<view class="itemval">{{item.val}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				userimg:'',
				foorarr:[
					{val:'商品',id:0,icon:'icon-shangdian1',active:false},
					{val:'购物车',id:1,icon:'icon-gouwucheman',active:false},
					{val:'我的',id:2,icon:'icon-tianchongxing-',active:true},
				],
				listarr:[
					{val:'我的订单',id:0,icon:'icon-dingdan'},
					{val:'收货地址',id:1,icon:'icon-icon-test'},
				],
				docheight:0,
				codeval:'',
				ivval:'',
				encryptedData:'',
				token:'',
				showbtn:false,
			};
		},
		methods:{
			loginbtn(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Wxauth/getUserAuth',
				    data: {
						code:this.codeval,
						iv:this.ivval,
						encryptedData:this.encryptedData
				    },
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							_this.showbtn = false
							uni.setStorage({
							    key: 'token',
							    data: res.data.data.user_info.token,
							    success: function () {}
							});
						}
				    }
				})
			},
			footfn(item){
				if(item.id==1){
					uni.redirectTo({
					    url: '../car/car'
					});
				}else if(item.id==0){
					uni.redirectTo({
					    url: '../index/index'
					});
				}
			},
			navfn(item){
				if(item.id==1){
					uni.redirectTo({
					    url: '../adress/adress'
					});
				}else if(item.id==0){
					uni.redirectTo({
					    url: '../order/order'
					});
				}
			},
			getUserInfo(e){
				let _this = this
				uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
					if (~res.provider.indexOf('weixin')) { 
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								_this.codeval = res2.code
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {//这里请求接口
										_this.ivval = info.iv,
										_this.encryptedData = info.encryptedData,
										_this.username = info.userInfo.nickName
										_this.userimg = info.userInfo.avatarUrl
										_this.loginbtn()
										// _this.getcode()
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
			},
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/My/getUser', //仅为示例，并非真实接口地址。
				    data: {},
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							_this.userimg = res.data.data.user_head_image
							_this.username = res.data.data.user_name
						}else if(res.data.code==2){
							_this.showbtn = true
						}
				    },
					fail:function() {
						_this.getUserInfo()
					}
				})
			},
		},
		onLoad() {
			let _this = this
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
					_this.token = res.data
					console.log(_this.token,'token')
					_this.getdata()
			    }
			})
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		.infobox{
			width: 100%;
			background-image: url(../../static/img/beijing.jpg);
			background-size: cover;
			overflow: hidden;
			.userimg{
				width: 160rpx;
				height: 160rpx;
				margin: 127rpx auto 57rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.username{
				width: 100%;
				text-align: center;
				font-size: 36rpx;
				color: orangered;
			}
			.loginbox{
				width: 100%;
				display: flex;
				justify-content: center;
				height: 100rpx;
				margin: 30rpx auto;
				.loginbtn{
					width: 200rpx;
					line-height: 60rpx;
					height: 60rpx;
				}
			}
		}
		.mylist{
			width: 90%;
			margin: 40rpx auto;
			background-color: white;
			padding:0 20rpx;
			box-sizing: border-box;
			.listitem,.listitem2{
				width: 100%;
				padding: 20rpx 0;
				border-top: 1rpx solid #ccc;
				display: flex;
				justify-content: space-between;
				height: 40rpx;
				line-height: 40rpx;
				.itemleft{
					display: flex;
					.itemval{
						font-size: 32rpx;
						margin-left: 15rpx;
					}
				}
			}
			.listitem2{
				border-top: none;
			}
		}
		.footbox{
			width: 100%;
			background-color: white;
			height: 100rpx;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			justify-content: space-between;
			.footitem,.footitem2{
				width: 50%;
				height: 100%;
				padding: 10rpx 0;
				box-sizing: border-box;
				text-align: center;
				font-size: 32rpx;
				.itemicon{
					font-size: 45rpx;
				}
			}
			.footitem2{
				color:orangered;
			}
		}
	}
</style>

