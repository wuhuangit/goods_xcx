(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0ac9":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var o=function(){var t=this,a=t.$createElement;t._self._c},i=[]},3243:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{foorarr:[{val:"商品",id:0,icon:"icon-shangdian1",active:!0},{val:"我的",id:1,icon:"icon-tianchongxing-",active:!1}],goodsarr:[],keyword:"",totlePage:"",params:{page:1,num:5},count:"",showTxt:"",canget:!0}},onReachBottom:function(){this.fenye()},methods:{serchfn:function(t){this.params.page=1,this.goodsarr=[],this.getdata()},footfn:function(a){1==a.id&&t.redirectTo({url:"../my/my"})},goodsfn:function(a){t.redirectTo({url:"../goods_detail/goods_detail?id="+a.id})},getdata:function(){var a=this,e=this;t.request({url:this.apis+"/user/Goods/GoodsList",data:{search:this.keyword,page:this.params.page},method:"post",success:function(t){if(a.text="request success",1==t.data.code){for(var n=0;n<t.data.data.data.length;n++)e.goodsarr.push(t.data.data.data[n]);e.params.num=t.data.data.total,t.data.data.last_page>t.data.data.current_page?e.canget=!0:e.canget=!1}}})},fenye:function(){this.totlePage=Math.ceil(this.count/this.params.num),console.log(this.params.page>=this.totlePage),console.log(this.canget),this.params.page>=this.totlePage&&this.canget?(this.showTxt="加载中",this.params.page++,this.canget=!1,this.getdata()):this.showTxt="已加载完"}},onLoad:function(){this.goodsarr=[],this.getdata()}};a.default=e}).call(this,e("543d")["default"])},"4be5":function(t,a,e){"use strict";e.r(a);var n=e("0ac9"),o=e("e865");for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);e("945c");var s,c=e("f0c5"),r=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);a["default"]=r.exports},"945c":function(t,a,e){"use strict";var n=e("a367"),o=e.n(n);o.a},a367:function(t,a,e){},e865:function(t,a,e){"use strict";e.r(a);var n=e("3243"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=o.a},eec2:function(t,a,e){"use strict";(function(t){e("ff4d");n(e("66fd"));var a=n(e("4be5"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])}},[["eec2","common/runtime","common/vendor"]]]);