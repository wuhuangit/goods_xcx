<template>
	<view class="container" :style="'min-height: '+docheight+'px;'">
		<view class="adresslist">
			<view class="adressitem" v-for="item in adressarr">
				<view class="itemtop">
						<view class="username">
							<view class="adressname">
								{{item.address_person}}
							</view>
							<view :class="item.address_default==2?'radiobox2':'radiobox'" @click="setmoren(item)">
								<view class="radionei" v-if="item.address_default==2"></view>
							</view>
						</view>
						<view class="usertel">{{item.address_phone}}</view>
						<view class="adressval">{{item.address_details}}</view>
				</view>
				<view class="itemunder">
					<view class="delbtn" @click="delfn(item)">删除</view>
					<view class="edit" @click="editfn(item)">编辑</view>
				</view>
			</view>
			<view class="savebox" @click="addfn">新增</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adressarr:[],
				docheight:'',
				type:0,
				token:'',
			};
		},
		methods:{
			setmoren(item){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/setAddress', //仅为示例，并非真实接口地址。
				    data: {
						id:item.id
					},
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							if(_this.type ==1){
								uni.redirectTo({
								    url: '../buy/buy'
								});
							}else{
								uni.showToast({
									icon:'success',
									title:"操作成功" 
								})
								_this.getdata()
							}
						}
				    }
				})
			},
			addfn(){
				if(this.type){
					uni.redirectTo({
					    url: '../add_adress/add_adress?type='+this.type
					});
				}else{
					uni.redirectTo({
					    url: '../add_adress/add_adress'
					});
				}
			},
			delfn(item){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Order/userAddressDel', //仅为示例，并非真实接口地址。
				    data: {
						id:item.id
					},
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								icon:'success',
								title:"操作成功" 
							})
							_this.getdata()
						}
				    }
				})
			},
			editfn(item){
				if(this.type){
					uni.redirectTo({
					    url: '../adress_detail/adress_detail?type='+this.type+'&id='+item.id
					});
				}else{
					uni.redirectTo({
					    url: '../adress_detail/adress_detail?id='+item.id
					});
				}
				
			},
			getdata(){
				let _this = this
				console.log(222)
				uni.request({
				    url: this.apis+'/user/Order/userAddressList', //仅为示例，并非真实接口地址。
				    data: {},
					header:{
						'token':this.token
					},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							_this.adressarr=  res.data.data
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
			}
		},
		onLoad(option) {
			let _this = this
			console.log(option)
			this.type = option.type
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
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		background-color: rgb(247,247,247);
		.adresslist{
			width: 100%;
			box-sizing: border-box;
			.adressitem{
				width: 100%;
				padding: 40rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				background-color: white;
				margin-bottom: 30rpx;
				.itemtop{
					width: 100%;
					padding-bottom: 30rpx;
					border-bottom: 1rpx solid #ccc;
					.username{
						width: 100%;
						display: flex;
						justify-content: space-between;
						padding: 30rpx 0 10rpx;
						font-size: 32rpx;
						.radiobox,.radiobox2{
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							border: 1rpx solid #ccc;
							padding: 5rpx;
							box-sizing: border-box;
							.radionei{
								width: 100%;
								height: 100%;
								border-radius: 50%;
								background-color: orangered;
							}
						}
						.radiobox2{
							border:1rpx solid orangered;
						}
					}
					.usertel{
						color: #666;
						font-size: 30rpx;
					}
					.adressval{
						font-size: 30rpx;
						height: 30rpx;
						line-height: 30rpx;
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-top: 10rpx;
					}
				}
				.itemunder{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					margin-top: 20rpx;
					.edit,.delbtn{
						background-color: orangered;
						padding: 20rpx 50rpx;
						color: white;
						font-size: 28rpx;
						margin-left: 20rpx;
						border: 1rpx solid orangered;
					}
					.delbtn{
						background-color: white;
						color: orangered;
					}
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
