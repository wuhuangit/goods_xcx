(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/adress_detail/adress_detail"],{"0d79":function(t,e,s){"use strict";s.r(e);var n=s("ca44"),a=s.n(n);for(var o in n)"default"!==o&&function(t){s.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},3667:function(t,e,s){"use strict";s.r(e);var n=s("5b0f"),a=s("0d79");for(var o in a)"default"!==o&&function(t){s.d(e,t,(function(){return a[t]}))}(o);s("5717");var r,i=s("f0c5"),c=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},5717:function(t,e,s){"use strict";var n=s("6970"),a=s.n(n);a.a},"5b0f":function(t,e,s){"use strict";var n;s.d(e,"b",(function(){return a})),s.d(e,"c",(function(){return o})),s.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},6970:function(t,e,s){},b625:function(t,e,s){"use strict";(function(t){s("ff4d");n(s("66fd"));var e=n(s("3667"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},ca44:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{adress_id:"",adressobj:{},isclick:!1,token:"",type:0}},methods:{savebtn:function(){if(1==this.isclick)return!1;this.isclick=!0;var e=this;t.request({url:this.apis+"/user/Order/userAddressSave",data:this.adressobj,header:{token:this.token},method:"post",success:function(s){e.isclick=!1,1==s.data.code?(t.showToast({icon:"success",title:"操作成功"}),setTimeout((function(){t.redirectTo({url:"../adress/adress?type="+e.type})}),1e3)):t.showToast({icon:"none",title:"操作失败"})}})},getdata:function(){var e=this;t.request({url:this.apis+"/user/Order/userAddressShow",data:{id:this.adress_id},header:{token:this.token},method:"post",success:function(s){1==s.data.code?e.adressobj=s.data.data:2==s.data.code&&(t.showToast({title:"登录过期",icon:"none"}),setTimeout((function(){t.redirectTo({url:"../my/my"})}),1e3))}})}},onLoad:function(e){var s=this;console.log(e),s.adress_id=e.id,s.type=e.type,t.getStorage({key:"token",success:function(e){s.token=e.data,s.adress_id?s.getdata():t.redirectTo({url:"../adress/adress"})},fail:function(){t.showToast({title:"请授权",icon:"none"}),t.redirectTo({url:"../my/my"})}})}};e.default=s}).call(this,s("543d")["default"])}},[["b625","common/runtime","common/vendor"]]]);