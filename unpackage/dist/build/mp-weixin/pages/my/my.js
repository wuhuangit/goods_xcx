(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{1621:function(t,e,n){"use strict";n.r(e);var a=n("8440"),o=n("8208");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("aff3");var r,c=n("f0c5"),s=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports},"65a5":function(t,e,n){},8208:function(t,e,n){"use strict";n.r(e);var a=n("b845"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},8440:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},aa9f:function(t,e,n){"use strict";(function(t){n("ff4d");a(n("66fd"));var e=a(n("1621"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},aff3:function(t,e,n){"use strict";var a=n("65a5"),o=n.n(a);o.a},b845:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{username:"",userimg:"",foorarr:[{val:"商品",id:0,icon:"icon-shangdian1",active:!1},{val:"我的",id:1,icon:"icon-tianchongxing-",active:!0}],listarr:[{val:"我的订单",id:0,icon:"icon-dingdan"},{val:"收货地址",id:1,icon:"icon-icon-test"}],docheight:0,codeval:"",ivval:"",encryptedData:"",token:"",showbtn:!1}},methods:{loginbtn:function(){var e=this;t.request({url:this.apis+"/user/Wxauth/getUserAuth",data:{code:this.codeval,iv:this.ivval,encryptedData:this.encryptedData},method:"post",success:function(n){1==n.data.code&&(e.showbtn=!1,t.setStorage({key:"token",data:n.data.data.user_info.token,success:function(){}}))}})},footfn:function(e){0==e.id&&t.redirectTo({url:"../index/index"})},navfn:function(e){1==e.id?t.redirectTo({url:"../adress/adress"}):0==e.id&&t.redirectTo({url:"../order/order"})},getUserInfo:function(e){var n=this;t.getProvider({service:"oauth",success:function(e){~e.provider.indexOf("weixin")?t.login({provider:"weixin",success:function(e){n.codeval=e.code,t.getUserInfo({provider:"weixin",success:function(t){n.ivval=t.iv,n.encryptedData=t.encryptedData,n.username=t.userInfo.nickName,n.userimg=t.userInfo.avatarUrl,n.loginbtn()},fail:function(){t.showToast({title:"微信登录授权失败",icon:"none"})}})},fail:function(){t.showToast({title:"微信登录授权失败",icon:"none"})}}):t.showToast({title:"请先安装微信或升级版本",icon:"none"})}})},getdata:function(){var e=this;t.request({url:this.apis+"/user/My/getUser",data:{},header:{token:this.token},method:"post",success:function(t){1==t.data.code?(e.userimg=t.data.data.user_head_image,e.username=t.data.data.user_name):2==t.data.code&&(e.showbtn=!0)},fail:function(){e.getUserInfo()}})}},onLoad:function(){var e=this;t.getStorage({key:"token",success:function(t){e.token=t.data,console.log(e.token,"token"),e.getdata()}})}};e.default=n}).call(this,n("543d")["default"])}},[["aa9f","common/runtime","common/vendor"]]]);