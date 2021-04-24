<template>
	<view class="container">
		<view class="formlist">
			<view class="adressitem">
				<view class="itemname">收货人</view>
				<input class="itemval" name="username" v-model="adressobj.address_person" placeholder="请输入收货人" />
			</view>
			<view class="adressitem">
				<view class="itemname">手机号码</view>
				<input class="itemval" name="username" v-model="adressobj.address_phone" placeholder="请输入手机号码" />
			</view>
			<view class="adressitem">
				<view class="itemname">详细地址</view>
				<input class="itemval" name="username" v-model="adressobj.address_details" placeholder="请输入详细地址" />
			</view>
			<!-- <view class="adressitem">
				<view class="itemname">设为默认地址</view>
				<switch></switch>
			</view> -->
			<view class="savebox" @click="savebtn">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adress_id:'',
				adressobj:{},
				isclick:false,
				token:'',
				type:0,
			};
		},
		methods:{
			savebtn(){
				if(this.isclick==true){
					return false
				}
				this.isclick = true
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/userAddressSave', //仅为示例，并非真实接口地址。
				    data:this.adressobj,
					header: {
					        'token': this.token //自定义请求头信息
					    },
					method:'post',
				    success: (res) => {
						_this.isclick = false
						if(res.data.code==1){
							uni.showToast({
								icon:'success',
								title:"操作成功" 
							})
							setTimeout(function(){
								uni.redirectTo({
								    url: '../adress/adress?type='+_this.type
								});
							},1000)
						}else{
							uni.showToast({
								icon:'none',
								title:"操作失败" 
							})
						}
				    }
				})
			},
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/userAddressShow', //仅为示例，并非真实接口地址。
				    data: {
						id:this.adress_id
					},
					header: {
					        'token': this.token //自定义请求头信息
					    },
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							_this.adressobj = res.data.data
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
		},
		onLoad(option) {
			let _this = this
			console.log(option)
			_this.adress_id = option.id
			_this.type = option.type
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
					_this.token = res.data
					if(_this.adress_id){
						_this.getdata()
					}else{
						uni.redirectTo({
						    url: '../adress/adress'
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
	.container{
		width: 100%;
		.formlist{
			width: 100%;
			padding: 20rpx 40rpx;
			box-sizing: border-box;
			.adressitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				height: 50rpx;
				font-size: 32rpx;
				line-height: 50rpx;
				border-bottom: 1rpx solid #ccc;
				padding: 30rpx 0;
				.itemval{
					height: 40rpx;
					margin-top: 5rpx;
					text-align: right;
				}
			}
			.savebox{
				margin-top: 80rpx;
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: orangered;
				color: white;
				font-size: 32rpx;
			}
		}
	}
</style>
