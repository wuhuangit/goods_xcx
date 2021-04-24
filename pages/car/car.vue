<template>
	<view class="container">
		<view class="carlist">
			<view class="checkcont">
				<view style="display: flex;">
					<view :class="checkall?'itemcheck2':'itemcheck'" @click="checkallfn()"></view>
					<view style="line-height: 35rpx;">全选</view>
				</view>
				<view class="delbtn" @click="delfn()">删除</view>
			</view>
			<view class="listitem" v-for="item in goodsarr">
				<view :class="item.check?'itemcheck2':'itemcheck'" @click="checkfn(item)"></view>
				<view class="itemright">
					<view class="goodsimg"  @click="goodsfn(item)">
						<image :src="item.goods_imgs"></image>
					</view>
					<view class="goodsinfo">
						<view class="goodsname">
							{{item.goods_name}}
						</view>
						<!-- <view class="goodsdec">{{item.goods_describe}}</view> -->
						<view class="numbox">
							<view class="numbtn" @click="jianfn(item)" >-</view>
							<input type="number" @input="inputfn" v-model="item.num" />
							<view class="numbtn" @click="addfn(item)">+</view>
						</view>
						<view class="goodsprice">
							<view class="pricexian">￥{{item.goods_present_price}}</view>
							<view class="priceyuan">￥{{item.goods_original_price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="carbtnbox">
			<view class="allmoney">合计:<text style="color: orangered;margin-left: 10px;">{{allmoney}}</text> </view>
			<view class="carbtn" @click="buyfn()">结算</view>
		</view>
		<view class="footbox">
			<view :class="item.active?'footitem2':'footitem'" v-for="item in foorarr" @click="footfn(item)">
				<view :class="'itemicon iconfont '+item.icon"></view>
				<view class="itemval">{{item.val}}</view>
			</view>
		</view>
		<view class="tishival" v-if="goodsarr.length==0">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				allmoney:0,
				checkall:false,
				goodsarr:[],
				foorarr:[
					{val:'商品',id:0,icon:'icon-shangdian1',active:false},
					{val:'购物车',id:1,icon:'icon-gouwucheman',active:true},
					{val:'我的',id:2,icon:'icon-tianchongxing-',active:false},
				],
			}
		},
		methods:{
			delfn(){
				var idsarr = []
				for(let i = 0;i<this.goodsarr.length;i++){
					if(this.goodsarr[i].check){
						idsarr.push(this.goodsarr[i].cart_id)
					}
				}
				if(idsarr.length==0){
					uni.showToast({
						title: '选择不能为空',
						icon:"none"
					});
					return false
				}
				
				var ids = idsarr.join(',')
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
				var data = {
					cart_ids:ids,
				}
				let _this = this
				uni.request({
					url: this.apis+'/user/Order/shoppingCartDel', //仅为示例，并非真实接口地址。
					data:data,
					method:'post',
					header:{
						'token':this.token
					},
					success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title: '删除成功',
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
					}
				});
			},
			
			buyfn(){
				var arr = []
				var idsarr = []
				for(let i = 0;i<this.goodsarr.length;i++){
					if(this.goodsarr[i].check){
						var obj = {
							goods_id:this.goodsarr[i].goods_id,
							goods_image:this.goodsarr[i].goods_imgs,
							goods_name:this.goodsarr[i].goods_name,
							goods_price:this.goodsarr[i].goods_present_price,
							num:this.goodsarr[i].num,
						}
						arr.push(obj)
						idsarr.push(this.goodsarr[i].cart_id)
					}
				}
				if(arr.length==0){
					uni.showToast({
						title: '选择不能为空',
						icon:"none"
					});
					return false
				}
				
				var ids = idsarr.join(',')
				var obj = arr
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
									url: '../buy/buy?ids='+ids
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
			inputfn(){
				this.getmoney()
			},
			jianfn(item){
				if(item.num>1){
					item.num--
				}else{
					item.num = 1
				}
				this.getmoney()
			},
			getmoney(){
				var sum = 0
				for (let i = 0;i<this.goodsarr.length;i++) {
					if(this.goodsarr[i].check){
						sum +=this.goodsarr[i].num*this.goodsarr[i].goods_present_price
					}
				}
				this.allmoney = sum.toFixed(2)
			},
			addfn(item){
				item.num++
				this.getmoney()
			},
			goodsfn(item){
				uni.redirectTo({
				    url: '../goods_detail/goods_detail?id='+item.goods_id
				});
			},
			checkallfn(){
				this.checkall = !this.checkall
				if(this.checkall){
					for (let i = 0;i<this.goodsarr.length;i++) {
						this.goodsarr[i].check = true
					}
				}else{
					for (let i = 0;i<this.goodsarr.length;i++) {
						this.goodsarr[i].check = false
					}
				}
				this.getmoney()
			},
			checkfn(item){
				item.check =!item.check
				var result = false
				if(item.check){
					result = true
					for (let i = 0;i<this.goodsarr.length;i++) {
						if(!this.goodsarr[i].check){
							result = false
						}
					}
				}
				this.checkall = result
				this.getmoney()
			},
			footfn(item){
				if(item.id==0){
					uni.redirectTo({
					    url: '../index/index'
					});
				}else if(item.id==2){
					uni.redirectTo({
					    url: '../my/my'
					});
				}
			},
			getdata(){
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
					url: this.apis+'/user/Order/shoppingCartList', //仅为示例，并非真实接口地址。
					data:{},
					method:'post',
					header:{
						'token':this.token
					},
					success: (res) => {
						_this.goodsarr = res.data.data
					}
				});
			},
		},
		onLoad() {
			let _this = this
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
					_this.token = res.data
					_this.getdata()
			    }
			})
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		padding-bottom: 66px;
		.carlist{
			width: 100%;
			padding:50rpx 5%;
			box-sizing: border-box;
			.checkcont{
				width: 100%;
				padding: 0 0px 10px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				.itemcheck,.itemcheck2{
					width: 35rpx;
					height: 35rpx;
					border: 1px solid #ccc;
					margin-right: 40rpx;
					border-radius: 50%;
				}
				.itemcheck2{
					border: 1px solid orangered;
					background-color: orangered;
				}
			}
			.listitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 40rpx;
				.itemcheck,.itemcheck2{
					width: 35rpx;
					height: 35rpx;
					border: 1px solid #ccc;
					margin-right: 40rpx;
					margin-top: 60rpx;
					border-radius: 50%;
				}
				.itemcheck2{
					border: 1px solid orangered;
					background-color: orangered;
				}
				.itemright{
					width: 100rpx;
					flex: 1;
					display: flex;
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
						border-bottom: 1rpx solid #ccc;
						padding-bottom: 30rpx;
						.goodsname{
							font-size: 36rpx;
							font-weight: bold;
							height: 60rpx;
							line-height: 60rpx;
							white-space: nowrap;
						    overflow: hidden;
						    text-overflow: ellipsis;
							color: #333333;
							width: 100%;
						}
						.numbox{
							width: 120px;
							outline: 1px solid #ccc;
							display: flex;
							margin-bottom: 5px;
							.numbtn{
								width: 35px;
								height: 30px;
								background-color: #CCCCCC;
								color: white;
								text-align: center;
								line-height: 30px;
							}
							input{
								width: 20px;
								flex: 1;
								height: 30px;
								line-height: 30px;
								text-align: center;
							}
						}
						
						.goodsdec{
							width: 100%;
							height: 60rpx;
							width: 100%;
							font-size: 28rpx;
							color: #C1C1C1;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.goodsprice{
							width: 100%;
							display: flex;
							font-size: 30rpx;
							height: 40rpx;
							line-height: 40rpx;
							.pricexian{
								color: orangered;
								font-size: 40rpx;
							}
							.priceyuan{
								color: #C1C1C1;
								text-decoration: line-through;
								margin-left: 15rpx;
							}
						}
					}
				}
			}
		}
		.carbtnbox{
			width: 100%;
			position: fixed;
			bottom: 55px;
			left: 0;
			background-color: white;
			border-top: 1px solid #ccc;
			display: flex;
			padding: 10px;
			box-sizing: border-box;
			justify-content: space-between;
			font-size: 16px;
			line-height: 40px;
			z-index: 100;
			.carbtn{
				height: 40px;
				width: 100px;
				background-color: orangered;
				color: white;
				text-align: center;
				line-height: 40px;
				border-radius: 20px;
			}
		}
		.tishival{
			width: 100%;
			text-align: center;
			padding: 10px 0;
		}
		.footbox{
			width: 100%;
			background-color: white;
			height: 100rpx;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1px solid #ccc;
			justify-content: space-between;
			z-index: 100;
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
