(function(t){function e(e){for(var i,o,s=e[0],l=e[1],c=e[2],d=0,p=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],i=!0,o=1;o<a.length;o++){var l=a[o];0!==n[l]&&(i=!1)}i&&(r.splice(e--,1),t=s(s.s=a[0]))}return t}var i={},n={app:0},r=[];function o(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"fc0e3393"}[t]+".js"}function s(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(t){var e=[],a=n[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,i){a=n[t]=[e,i]}));e.push(a[2]=i);var r,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=o(t);var c=new Error;r=function(e){l.onerror=l.onload=null,clearTimeout(d);var a=n[t];if(0!==a){if(a){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",c.name="ChunkLoadError",c.type=i,c.request=r,a[1](c)}n[t]=void 0}};var d=setTimeout((function(){r({type:"timeout",target:l})}),12e4);l.onerror=l.onload=r,document.head.appendChild(l)}return Promise.all(e)},s.m=t,s.c=i,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var u=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1521:function(t,e,a){},"1b03":function(t,e,a){},"3bc3":function(t,e,a){"use strict";var i=a("1b03"),n=a.n(i);n.a},"3c03":function(t,e,a){"use strict";var i=a("1521"),n=a.n(i);n.a},"56d7":function(t,e,a){"use strict";a.r(e);var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},r=[],o=(a("3c03"),a("2877")),s={},l=Object(o["a"])(s,n,r,!1,null,null,null),c=l.exports,d=a("a18c"),u=a("2f62");i["a"].use(u["a"]);var p=new u["a"].Store({state:{},mutations:{},actions:{},modules:{}}),v=a("f309");i["a"].use(v["a"]);var f=new v["a"]({}),m=a("00e7");i["a"].use(m),i["a"].config.productionTip=!1,new i["a"]({router:d["a"],store:p,vuetify:f,render:t=>t(c)}).$mount("#app")},"56fc":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-content",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("創建 ThisIsToDoList 帳號")]),a("v-spacer")],1),a("v-card-text",[a("v-form",{ref:"form",attrs:{"lazy-validation":t.lazy},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-text-field",{attrs:{rules:t.emailRules,label:"新帳號",name:"signup","prepend-icon":"mdi-login",type:"text",required:""},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}}),a("v-text-field",{attrs:{id:"password",label:"建立密碼",name:"password","prepend-icon":"mdi-lock",type:"password",rules:t.pswdRules,required:""},model:{value:t.pswd,callback:function(e){t.pswd=e},expression:"pswd"}}),a("v-text-field",{attrs:{id:"password_again",label:"確認密碼",name:"password2","prepend-icon":"mdi-",type:"password",required:""},model:{value:t.pswd_s,callback:function(e){t.pswd_s=e},expression:"pswd_s"}}),a("v-btn",{attrs:{disabled:!t.valid||!t.id||!t.pswd||!t.pswd_s,color:"red"},on:{click:t.validate}},[t._v("註冊")]),a("v-btn",{staticClass:"mx-2",attrs:{color:"amber"},on:{click:t.signin}},[t._v("登入")])],1)],1),a("v-card-actions",[a("v-spacer")],1)],1)],1)],1)],1)],1)],1)},n=[],r=(a("5319"),a("498a"),a("bc3a")),o=a.n(r),s={data:()=>({s_self:null,lazy:!0,valid:!0,id:"",pswd:"",pswd_s:"",emailRules:[t=>!!t||"請填入一組有效電子郵件!",t=>/.+@.+\..+/.test(t)||"電子郵件格式不正確！"],pswdRules:[t=>!!t||"請輸入一組8個字以上的密碼!",t=>t&&t.length>7||"密碼至少8個字元"],pswd_sRules:[t=>!!t||"密碼不相符!",t=>t&&t==self.pswd||"密碼不相符!"]}),methods:{signin:function(){window.location.replace("./signin")},validate:function(){if(this.$refs.form.validate()&&this.pswd===this.pswd_s){this.snackbar=!0;var t=a("4458").sha256;this.pswd=t(this.pswd),o.a.post("/signup",JSON.stringify({username:this.id.trim(),password:this.pswd}),{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(){window.location.replace("./signin")})).catch((function(){alert("伺服器通訊失敗！")}))}else alert("密碼或帳號驗證未通過！");this.$refs.form.reset()}},created:function(){this.s_self=this,this.valid=!1}},l=s,c=a("2877"),d=a("6544"),u=a.n(d),p=a("7496"),v=a("8336"),f=a("b0af"),m=a("99d9"),b=a("62ad"),h=a("a523"),w=a("a75b"),_=a("4bd4"),g=a("0fd9"),V=a("2fa4"),k=a("8654"),y=a("71d9"),x=a("2a7f"),C=Object(c["a"])(l,i,n,!1,null,null,null);e["a"]=C.exports;u()(C,{VApp:p["a"],VBtn:v["a"],VCard:f["a"],VCardActions:m["a"],VCardText:m["b"],VCol:b["a"],VContainer:h["a"],VContent:w["a"],VForm:_["a"],VRow:g["a"],VSpacer:V["a"],VTextField:k["a"],VToolbar:y["a"],VToolbarTitle:x["a"]})},a18c:function(t,e,a){"use strict";(function(t){a("e6cf");var i=a("2b0e"),n=a("8c4f"),r=a("bb51"),o=a("bbfc"),s=a("ea2d"),l=a("56fc");i["a"].use(n["a"]);var c=[{path:"/",name:"home",component:r["a"],redirect:"todolist",children:[{path:"todolist",component:o["a"]}]},{path:"/about",name:"about",component:()=>a.e("about").then(a.bind(null,"f820"))},{path:"/signin",component:s["a"]},{path:"/signup",component:l["a"]}],d=new n["a"]({mode:"history",base:t,routes:c});e["a"]=d}).call(this,"/")},bb51:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-navigation-drawer",{attrs:{app:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("div",{staticClass:"pa-2",on:{click:t.logout}},[a("v-btn",{attrs:{color:"amber",block:""}},[a("v-icon",{attrs:{dark:"",left:""}},[t._v("mdi-arrow-left")]),t._v(" "),a("router-link",{attrs:{to:"/signin",tag:"button",replace:""}},[t._v("登出")])],1)],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-apple")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("待辦事項")])],1)],1),a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-check")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("已完成")])],1)],1),a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-settings")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("設定")])],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"",color:"purple darken-3",dark:""}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",[a("b",[t._v("ThisIsToDoList")])])],1),a("v-content",[a("router-view")],1),a("v-card",{attrs:{id:"create"}},[a("v-speed-dial",{attrs:{top:t.top,bottom:t.bottom,right:t.right,left:t.left,direction:t.direction,"open-on-hover":t.hover,transition:t.transition},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-btn",{attrs:{color:"blue darken-2",dark:"",fab:""},model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[t.fab?a("v-icon",[t._v("mdi-close")]):a("v-icon",[t._v("mdi-account-circle")])],1)]},proxy:!0}]),model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"green"}},[a("v-icon",[t._v("mdi-pencil")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"indigo"}},[a("v-icon",[t._v("mdi-plus")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"red"}},[a("v-icon",[t._v("mdi-delete")])],1)],1)],1),a("v-footer",{attrs:{color:"purple darken-3",app:""}},[a("span",{staticClass:"white--text"},[t._v("Copyright © NPC GO version "+t._s(t.version))])])],1)},n=[],r=(a("5319"),{name:"home",components:{},data:()=>({version:"0.1.alpha",items:[{title:"Dashboard",icon:"dashboard"},{title:"Account",icon:"account_box"},{title:"Admin",icon:"gavel"}],drawer:null,direction:"top",fab:!1,fling:!1,hover:!0,tabs:null,top:!1,right:!0,bottom:!0,left:!1}),computed:{activeFab(){switch(this.tabs){case"one":return{class:"purple",icon:"account_circle"};case"two":return{class:"red",icon:"edit"};case"three":return{class:"green",icon:"keyboard_arrow_up"};default:return{}}}},watch:{top(t){this.bottom=!t},right(t){this.left=!t},bottom(t){this.top=!t},left(t){this.right=!t}},methods:{logout:()=>{(void 0).$cookie.delete("test"),window.location.replace("./signin")}}}),o=r,s=(a("3bc3"),a("2877")),l=a("6544"),c=a.n(l),d=a("7496"),u=a("40dc"),p=a("5bc1"),v=a("8336"),f=a("b0af"),m=a("a75b"),b=a("553a"),h=a("132d"),w=a("8860"),_=a("da13"),g=a("1800"),V=a("5d23"),k=a("f774"),y=a("c73b"),x=a("2a7f"),C=Object(s["a"])(o,i,n,!1,null,"c1354332",null);e["a"]=C.exports;c()(C,{VApp:d["a"],VAppBar:u["a"],VAppBarNavIcon:p["a"],VBtn:v["a"],VCard:f["a"],VContent:m["a"],VFooter:b["a"],VIcon:h["a"],VList:w["a"],VListItem:_["a"],VListItemAction:g["a"],VListItemContent:V["a"],VListItemTitle:V["b"],VNavigationDrawer:k["a"],VSpeedDial:y["a"],VToolbarTitle:x["a"]})},bbfc:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-2 my-2",attrs:{"max-width":"98%"}},[a("v-list",{directives:[{name:"show",rawName:"v-show",value:t.haveitems,expression:"haveitems"}],attrs:{shaped:""}},[a("v-list-item-group",{attrs:{multiple:""},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[t._l(t.items,(function(e,i){return[e?a("v-list-item",{key:""+e.item_id,attrs:{value:e.item_id,"active-class":"deep-purple--text text--accent-4"},scopedSlots:t._u([{key:"default",fn:function(i){var n=i.active,r=i.toggle;return[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.user_input)}})],1),a("v-list-item-action",[a("v-checkbox",{attrs:{"input-value":n,"true-value":e,color:"deep-purple accent-4"},on:{click:r}})],1)]}}],null,!0)}):a("v-divider",{key:"divider-"+i})]}))],2)],1)],1)},n=[],r=a("bc3a"),o=a.n(r),s={data:()=>({haveitems:!1,items:[{item_id:"123123",user_input:"test",status:!0}],model:["123123"]}),created:function(){var t=this;o.a.get("/lists").then((function(e){var a=e.data;t.haveitems=!0,t.items=[];for(var i=0;i<a.length;i++)t.items.unshift({item_id:a[i].item_id,user_input:a[i].user_input}),1==a[i].status&&t.model.push(a[i].item_id)})).catch((function(){}))}},l=s,c=a("2877"),d=a("6544"),u=a.n(d),p=a("b0af"),v=a("ac7c"),f=a("ce7e"),m=a("8860"),b=a("da13"),h=a("1800"),w=a("5d23"),_=a("1baa"),g=Object(c["a"])(l,i,n,!1,null,null,null);e["a"]=g.exports;u()(g,{VCard:p["a"],VCheckbox:v["a"],VDivider:f["a"],VList:m["a"],VListItem:b["a"],VListItemAction:h["a"],VListItemContent:w["a"],VListItemGroup:_["a"],VListItemTitle:w["b"]})},ea2d:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-content",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("登入 ThisIsToDoList")]),a("v-spacer")],1),a("v-card-text",[a("v-form",{ref:"form",attrs:{"lazy-validation":t.lazy},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-text-field",{attrs:{label:"帳號",rules:t.emailRules,name:"login","prepend-icon":"mdi-login",type:"text",required:""},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}}),a("v-text-field",{attrs:{id:"password",label:"密碼",rules:t.pswdRules,name:"password","prepend-icon":"mdi-lock",type:"password",required:""},model:{value:t.pswd,callback:function(e){t.pswd=e},expression:"pswd"}}),a("v-btn",{staticClass:"mx-2",attrs:{disabled:!t.valid||!t.id||!t.pswd,color:"light-green accent-3"},on:{click:t.validate}},[t._v("登入")]),a("v-btn",{staticClass:"mx-2",attrs:{color:"amber"},on:{click:t.signup}},[t._v("註冊")])],1)],1),a("v-card-actions",[a("v-spacer")],1)],1)],1)],1)],1)],1)],1)},n=[],r=(a("5319"),a("498a"),a("bc3a")),o=a.n(r),s={data:function(){return{valid:!0,lazy:!0,id:"",pswd:"",self:self,emailRules:[t=>!!t||"請填入有效電子郵件!",t=>/.+@.+\..+/.test(t)||"電子郵件格式不正確！"],pswdRules:[t=>!!t||"請輸入密碼!"]}},created:function(){this.s_self=this,this.valid=!1},methods:{signup:function(){window.location.replace("./signup")},validate:function(){if(this.$refs.form.validate()){var t=a("4458").sha256;this.pswd=t(this.pswd),o.a.post("/signin",JSON.stringify({username:this.id.trim(),password:this.pswd}),{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(){window.location.replace("./")})).catch((function(){alert("伺服器通訊失敗！")}))}else alert("密碼或帳號驗證未通過！");this.$refs.form.reset()}}},l=s,c=a("2877"),d=a("6544"),u=a.n(d),p=a("7496"),v=a("8336"),f=a("b0af"),m=a("99d9"),b=a("62ad"),h=a("a523"),w=a("a75b"),_=a("4bd4"),g=a("0fd9"),V=a("2fa4"),k=a("8654"),y=a("71d9"),x=a("2a7f"),C=Object(c["a"])(l,i,n,!1,null,null,null);e["a"]=C.exports;u()(C,{VApp:p["a"],VBtn:v["a"],VCard:f["a"],VCardActions:m["a"],VCardText:m["b"],VCol:b["a"],VContainer:h["a"],VContent:w["a"],VForm:_["a"],VRow:g["a"],VSpacer:V["a"],VTextField:k["a"],VToolbar:y["a"],VToolbarTitle:x["a"]})}});
//# sourceMappingURL=app.35eda789.js.map