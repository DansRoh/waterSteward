(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{45:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var o=r(t(46));e.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},46:function(e,n,t){"use strict";t.r(n);var r=t(47),o=t(49);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);t(54);var c,i=t(32),u=Object(i["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);u.options.__file="pages/login/login.vue",n["default"]=u.exports},47:function(e,n,t){"use strict";t.r(n);var r=t(48);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},48:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return a})),t.d(n,"components",(function(){return r}));try{r={navbar:function(){return t.e("components/navbar/navbar").then(t.bind(null,72))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},a=!1,c=[];o._withStripped=!0},49:function(e,n,t){"use strict";t.r(n);var r=t(50),o=t.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=o.a},50:function(e,n,t){"use strict";(function(e,r){var o=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(t(51)),c=o(t(53)),i=function(){t.e("components/navbar/navbar").then(function(){return resolve(t(72))}.bind(null,t)).catch(t.oe)},u={components:{navbar:i},data:function(){return{ptHeight:60}},onLoad:function(){var n=e.getStorageSync("navHeight");n&&(this.ptHeight=n)},methods:{getPhoneNumber:function(n){n.detail.code&&e.navigateTo({url:"/pages/getVerificationCode/getVerificationCode"}),console.log(n)},handleClickWxLogin:function(){var n=this;r.login({success:function(t){return(0,c.default)(a.default.mark((function o(){var c,i,u,s,d;return a.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(c=t.code,!c){o.next=11;break}return o.next=4,n.$http("/consumer/session/wechat","PUT",{code:c});case 4:i=o.sent,u=i.statusCode,s=i.wechat_openid,d=i.token,201===u?(e.setStorageSync("isLogin",!0),e.setStorageSync("token",d),e.redirectTo({url:"/pages/home/home"})):424===u?e.navigateTo({url:"/pages/writeUserInfo/writeUserInfo?wechat_openid="+s}):e.showToast({title:"登录失败",icon:"error"}),o.next=12;break;case 11:r.showToast("登录失败");case 12:case"end":return o.stop()}}),o)})))()}})}}};n.default=u}).call(this,t(2)["default"],t(1)["default"])},54:function(e,n,t){"use strict";t.r(n);var r=t(55),o=t.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=o.a},55:function(e,n,t){}},[[45,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map