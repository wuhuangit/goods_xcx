<template>
	<view class="container">
		<view class="serchbox">
			<input v-model="keyword" placeholder="商品搜索" @input="serchfn($event)" />
			<view class="serchicon iconfont icon-sousuo" @click="serchfn($event)"></view>
		</view>
		<view class="navbox">
			<view :class="item.active?'navitem2':'navitem'" v-for="item in navarr" @click="navfn(item)">{{item.goods_cate_name}}</view>
		</view>
		<view class="goodslist">
			<view class="listitem" v-for="item in goodsarr" @click="goodsfn(item)">
				<view class="goodsimg">
					<image :src="item.goods_imgs"></image>
				</view>
				<view class="goodsinfo">
					<view class="goodsname">
						<view class="goodsnameval">{{item.goods_name}}</view>
						<view class="zanicon iconfont icon-zan" v-if="item.goods_is_recommend==2"></view>
					</view>
					<view class="goodsdec">{{item.goods_describe}}</view>
					<view class="goodsprice">
						<view class="pricexian">￥{{item.goods_present_price}}</view>
						<view class="priceyuan">￥{{item.goods_original_price}}</view>
					</view>
				</view>
			</view>
			<div class="loding">{{showTxt}}</div>
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
				navarr:[],
				cat_id:'',
				foorarr:[
					{val:'商品',id:0,icon:'icon-shangdian1',active:true},
					{val:'购物车',id:1,icon:'icon-gouwucheman',active:false},
					{val:'我的',id:2,icon:'icon-tianchongxing-',active:false},
				],
				
				goodsarr:[],
				keyword:'',
				
				totlePage:'',
				params:{
	　　　　　　　　page:1,
	　　　　　　　　num:5,
	　　　　　　},
	　　　　　　count:'',
	　　　　　　showTxt:'',
			   canget:true,
			}
		},
		onReachBottom(){//uniapp 监听下拉加载生命周期
		　　this.fenye()
		},
		methods:{
			navfn(e){
				for (let i = 0;i<this.navarr.length;i++) {
					this.navarr[i].active = false
				}
				this.cat_id = e.goods_cate_id
				e.active = true
				this.goodsarr = []
				this.showTxt = ''
				this.params.page = 1
				this.getdata()
			},
			serchfn(e){
				this.params.page = 1
				this.goodsarr = []
				this.getdata()
			},
			footfn(item){
				if(item.id==1){
					uni.redirectTo({
					    url: '../car/car'
					});
				}else if(item.id==2){
					uni.redirectTo({
					    url: '../my/my'
					});
				}
			},
			goodsfn(item){
				uni.redirectTo({
				    url: '../goods_detail/goods_detail?id='+item.id
				});
			},
			getdata(){
				let _this = this
				uni.request({
				    url: this.apis+'/user/Goods/GoodsList', //仅为示例，并非真实接口地址。
				    data: {
				        search: this.keyword,
						page:this.params.page,
						goods_cate_id:this.cat_id,
				    },
					method:'post',
				    success: (res) => {
				        this.text = 'request success';
						if(res.data.code==1){
							if(this.params.page==1&&res.data.data.data.length==0){
								this.showTxt = '暂无数据'
							}
							for (let i = 0;i<res.data.data.data.length;i++) {
								_this.goodsarr.push(res.data.data.data[i])
							}
							_this.params.num = res.data.data.total
							if(res.data.data.last_page>res.data.data.current_page){
								_this.canget = true
							}else{
								_this.canget = false
							}
						}
				    }
				});
			},
			fenye(){
			    //获取列表之后
			    this.totlePage = Math.ceil(this.count / this.params.num);
			    //页面触底事件
				console.log(this.params.page >= this.totlePage)
				console.log(this.canget)
			    if(this.params.page >= this.totlePage&&this.canget){
			        this.showTxt = '加载中'
					this.params.page++
					this.canget = false
					this.getdata()
			    }else{
					this.showTxt = '已加载完'
				}
			},
			getcatfn(){
				let _this = this
				uni.request({
				    url: this.apis+'/common/Goodscate/goodsCateList', //仅为示例，并非真实接口地址。
				    data: {},
					method:'post',
				    success: (res) => {
						if(res.data.code==1){
							for (let i = 0;i<res.data.data.length;i++) {
								res.data.data[i]['active'] = false
							}
							_this.navarr = res.data.data
							_this.navarr.unshift({goods_cate_name:'全部',goods_cate_id:'',active:true})
							console.log(_this.navarr)
						}
				    }
				});
			}
		},
		onLoad() {
			this.goodsarr = []
			this.getcatfn()
			this.getdata()
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
		padding-bottom: 50rpx;
		.serchbox{
			width: 90%;
			margin: 20rpx auto;
			border: 1rpx solid #B5B5B5;
			padding: 15rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
			position: relative;
			.serchicon{
				position: absolute;
				right: 30rpx;
				top: 15rpx;
				font-size: 40rpx;
			}
		}
		.navbox{
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			white-space: nowrap;
			overflow-x: scroll;
			.navitem,.navitem2{
				display: inline-block;
				padding: 5px 10px;
			}
			.navitem2{
				border-bottom: 2px solid orangered;
				color: orangered;
			}
		}
		.goodslist{
			width: 100%;
			padding:50rpx 5%;
			box-sizing: border-box;
			.listitem{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 40rpx;
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
						display: flex;
						height: 60rpx;
						line-height: 60rpx;
						color: #333333;
						.zanicon{
							margin-left: 20rpx;
							color:orangered;
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
			.loding{
				width: 100%;
				font-size: 32rpx;
				text-align: center;
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
