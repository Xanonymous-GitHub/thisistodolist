(function(t){function e(e){for(var r,i,s=e[0],l=e[1],c=e[2],u=0,p=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);d&&d(e);while(p.length)p.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,i=1;i<a.length;i++){var l=a[i];0!==o[l]&&(r=!1)}r&&(n.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},o={app:0},n=[];function i(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"e8fa8cdf"}[t]+".js"}function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(t){var e=[],a=o[t];if(0!==a)if(a)e.push(a[2]);else{var r=new Promise((function(e,r){a=o[t]=[e,r]}));e.push(a[2]=r);var n,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=i(t);var c=new Error;n=function(e){l.onerror=l.onload=null,clearTimeout(u);var a=o[t];if(0!==a){if(a){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+r+": "+n+")",c.name="ChunkLoadError",c.type=r,c.request=n,a[1](c)}o[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:l})}),12e4);l.onerror=l.onload=n,document.head.appendChild(l)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var d=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1521:function(t,e,a){},"3c03":function(t,e,a){"use strict";var r=a("1521"),o=a.n(r);o.a},"4cbb":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var r=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],i=(a("3c03"),a("2877")),s={},l=Object(i["a"])(s,o,n,!1,null,null,null),c=l.exports,u=(a("8da0"),a("8c4f")),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-navigation-drawer",{attrs:{app:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("div",{staticClass:"pa-2"},[a("v-btn",{attrs:{color:"amber",block:""},on:{click:t.logout}},[a("v-icon",{attrs:{dark:"",left:""}},[t._v("mdi-arrow-left")]),t._v("登出 ")],1)],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-apple")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("待辦事項")])],1)],1),a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-check")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("已完成")])],1)],1),a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-settings")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("設定")])],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"",color:"purple darken-3",dark:""}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",[a("b",[t._v("ThisIsToDoList")])])],1),a("v-content",[a("router-view")],1),a("v-card",{attrs:{id:"create"}},[a("v-speed-dial",{attrs:{top:t.top,bottom:t.bottom,right:t.right,left:t.left,direction:t.direction,"open-on-hover":t.hover,transition:t.transition},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-btn",{attrs:{color:"blue darken-2",dark:"",fab:""},model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[t.fab?a("v-icon",[t._v("mdi-close")]):a("v-icon",[t._v("mdi-account-circle")])],1)]},proxy:!0}]),model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"green"}},[a("v-icon",[t._v("mdi-pencil")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"indigo"}},[a("v-icon",[t._v("mdi-plus")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"red"}},[a("v-icon",[t._v("mdi-delete")])],1)],1)],1),a("v-footer",{attrs:{color:"purple darken-3",app:""}},[a("span",{staticClass:"white--text"},[t._v("Copyright © NPC GO version "+t._s(t.version))])])],1)},p=[],v=(a("4b6e"),{name:"home",components:{},data:()=>({version:"0.1.alpha",items:[{title:"Dashboard",icon:"dashboard"},{title:"Account",icon:"account_box"},{title:"Admin",icon:"gavel"}],drawer:null,direction:"top",fab:!1,fling:!1,hover:!0,tabs:null,top:!1,right:!0,bottom:!0,left:!1}),computed:{activeFab(){switch(this.tabs){case"one":return{class:"purple",icon:"account_circle"};case"two":return{class:"red",icon:"edit"};case"three":return{class:"green",icon:"keyboard_arrow_up"};default:return{}}}},watch:{top(t){this.bottom=!t},right(t){this.left=!t},bottom(t){this.top=!t},left(t){this.right=!t}},methods:{logout:()=>{window.location.replace("#/signin")}}}),m=v,f=(a("5d9c"),a("6544")),b=a.n(f),h=a("7496"),V=a("40dc"),w=a("5bc1"),g=a("8336"),_=a("b0af"),x=a("a75b"),y=a("553a"),k=a("132d"),C=a("8860"),T=a("da13"),j=a("1800"),O=a("5d23"),L=a("f774"),I=a("c73b"),A=a("2a7f"),P=Object(i["a"])(m,d,p,!1,null,"75d8a0e8",null),S=P.exports;b()(P,{VApp:h["a"],VAppBar:V["a"],VAppBarNavIcon:w["a"],VBtn:g["a"],VCard:_["a"],VContent:x["a"],VFooter:y["a"],VIcon:k["a"],VList:C["a"],VListItem:T["a"],VListItemAction:j["a"],VListItemContent:O["a"],VListItemTitle:O["b"],VNavigationDrawer:L["a"],VSpeedDial:I["a"],VToolbarTitle:A["a"]});var E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-2 my-2",attrs:{"max-width":"98%"}},[a("v-list",{directives:[{name:"show",rawName:"v-show",value:t.haveitems,expression:"haveitems"}],attrs:{shaped:""}},[a("v-list-item-group",{attrs:{multiple:""},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[t._l(t.items,(function(e,r){return[e?a("v-list-item",{key:""+e.uuid,attrs:{value:e.uuid,"active-class":"deep-purple--text text--accent-4"},scopedSlots:t._u([{key:"default",fn:function(r){var o=r.active,n=r.toggle;return[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1),a("v-list-item-action",[a("v-checkbox",{attrs:{"input-value":o,"true-value":e,color:"deep-purple accent-4"},on:{click:n}})],1)]}}],null,!0)}):a("v-divider",{key:"divider-"+r})]}))],2)],1)],1)},D=[],F=a("bc3a"),$=a.n(F),B={data:()=>({haveitems:!0,items:[{uuid:"123123",text:"test"}],model:["123123"]}),created:function(){$.a.get("/lists").then((function(t){this.haveitems=!0,t.forEach(t=>{this.items.unshift('{uuid:"'.concat(t.item_id,'",text:"').concat(t.user_input,'"')),"true"==t.status&&this.model.push('"'.concat(t.uuid,'"'))})})).catch((function(){this.haveitems=!1,this.items=[]}))}},M=B,N=a("ac7c"),G=a("ce7e"),J=a("1baa"),R=Object(i["a"])(M,E,D,!1,null,null,null),q=R.exports;b()(R,{VCard:_["a"],VCheckbox:N["a"],VDivider:G["a"],VList:C["a"],VListItem:T["a"],VListItemAction:j["a"],VListItemContent:O["a"],VListItemGroup:J["a"],VListItemTitle:O["b"]});var z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-content",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("登入 ThisIsToDoList")]),a("v-spacer")],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"帳號",name:"login","prepend-icon":"mdi-login",type:"text"}}),a("v-text-field",{attrs:{id:"password",label:"密碼",name:"password","prepend-icon":"mdi-lock",type:"password"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"amber"}},[t._v("登入")])],1)],1)],1)],1)],1)],1)],1)},H=[],K={},Q=K,U=a("99d9"),W=a("62ad"),X=a("a523"),Y=a("4bd4"),Z=a("0fd9"),tt=a("2fa4"),et=a("8654"),at=a("71d9"),rt=Object(i["a"])(Q,z,H,!1,null,null,null),ot=rt.exports;b()(rt,{VApp:h["a"],VBtn:g["a"],VCard:_["a"],VCardActions:U["a"],VCardText:U["b"],VCol:W["a"],VContainer:X["a"],VContent:x["a"],VForm:Y["a"],VRow:Z["a"],VSpacer:tt["a"],VTextField:et["a"],VToolbar:at["a"],VToolbarTitle:A["a"]});var nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-content",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("創建 ThisIsToDoList 帳號")]),a("v-spacer")],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"新帳號",name:"signup","prepend-icon":"mdi-login",type:"text"}}),a("v-text-field",{attrs:{id:"password",label:"建立密碼",name:"password","prepend-icon":"mdi-lock",type:"password"}}),a("v-text-field",{attrs:{id:"password_again",label:"確認密碼",name:"password2","prepend-icon":"mdi-",type:"password"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"}},[t._v("註冊")])],1)],1)],1)],1)],1)],1)],1)},it=[],st={},lt=st,ct=Object(i["a"])(lt,nt,it,!1,null,null,null),ut=ct.exports;b()(ct,{VApp:h["a"],VBtn:g["a"],VCard:_["a"],VCardActions:U["a"],VCardText:U["b"],VCol:W["a"],VContainer:X["a"],VContent:x["a"],VForm:Y["a"],VRow:Z["a"],VSpacer:tt["a"],VTextField:et["a"],VToolbar:at["a"],VToolbarTitle:A["a"]}),r["a"].use(u["a"]);var dt=[{path:"/",name:"home",component:S,redirect:"todolist",children:[{path:"todolist",component:q}]},{path:"/about",name:"about",component:()=>a.e("about").then(a.bind(null,"f820"))},{path:"/signin",component:ot},{path:"/signup",component:ut}],pt=new u["a"]({routes:dt}),vt=pt,mt=a("2f62");r["a"].use(mt["a"]);var ft=new mt["a"].Store({state:{},mutations:{},actions:{},modules:{}}),bt=a("f309");r["a"].use(bt["a"]);var ht=new bt["a"]({});r["a"].config.productionTip=!1,new r["a"]({router:vt,store:ft,vuetify:ht,render:t=>t(c)}).$mount("#app")},"5d9c":function(t,e,a){"use strict";var r=a("4cbb"),o=a.n(r);o.a}});
//# sourceMappingURL=app.dff37675.js.map