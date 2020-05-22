(function(e){function t(t){for(var r,o,i=t[0],l=t[1],c=t[2],d=0,p=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},s=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/figma-tokens-app/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"35e5":function(e,t,n){},3865:function(e,t,n){"use strict";var r=n("35e5"),a=n.n(r);a.a},"4e2f":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"min-h-full bg-gray-100 pb-12"},[n("router-view")],1)},s=[],o=(n("5c0b"),n("2877")),i={},l=Object(o["a"])(i,a,s,!1,null,null,null),c=l.exports,u=n("8c4f"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"flex w-full flex-col items-center"},[n("div",{staticClass:"w-full max-w-screen-md"},[n("h1",{staticClass:"p-12 shadow-font text-7xl tracking-tight text-center"},[e._v("Get your Figma tokens")]),n("TokenForm",{ref:"form",attrs:{tokens:e.tokensSearch,disabled:!!e.tokensData},on:{onAddToken:e.addToken,onSearch:e.getData}}),e.errorMessage?n("div",[n("p",{staticClass:"text-red-700 py-3 px-32 text-center bg-red-200 border-red-700 border rounded-lg"},[e._v(e._s(e.errorMessage))])]):e._e(),e.tokensSearch?n("ul",{staticClass:"flex items-center justify-center flex-wrap"},e._l(e.tokensSearch,(function(t,r){return n("li",{key:t.name+r,staticClass:"relative bg-gray-600 text-white rounded-lg px-4 py-1 ml-4 mb-4 first:ml-0 flex items-center"},[e._v(" "+e._s("token: "+t.name+" ("+t.type+")")+" "),n("font-awesome-icon",{staticClass:"ml-4 hover:text-red-400 cursor-pointer transition-all ease-out duration-300",attrs:{icon:"times-circle"},on:{click:function(n){return e.deleteToken(t.name)}}})],1)})),0):e._e(),e.loading?n("Loading"):e._e(),e.tokensData?n("TokensTree",{attrs:{data:e.tokensData},on:{onClose:e.resetTokens}}):e._e(),e.tokensData&&!e.tokenStyles.length?n("div",{staticClass:"py-8 justify-center flex items-center"},[n("custom-button",{on:{click:e.handleStyle}},[e._v("Get styles")])],1):e._e()],1),n("div",{staticClass:"w-full max-w-screen-lg px-8 mt-8"},[e.tokenStyles.length?n("div",[n("ul",{staticClass:"grid grid-code gap-8"},e._l(e.tokenStyles,(function(t,r){return n("li",{key:"tokenStyle"+r,staticClass:"bg-white p-8 border-b-4 border-gray-400 border rounded-lg h-full flex-col justify-center"},[n("p",{staticClass:"text-2xl mb-4"},[e._v(e._s(t.name))]),n("pre",{staticClass:"language-css rounded-lg"},[n("code",[e._v(e._s(t.code))])])])})),0)]):e._e()])])},p=[],f=(n("4de4"),n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),h=n("bc3a"),m=n.n(h),b={getTokens:function(e){return Object(f["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m.a.post("https://figma-tokens-app-server.herokuapp.com/tokens",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},getStyles:function(e){return Object(f["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m.a.post("https://figma-tokens-app-server.herokuapp.com/style-dictionary",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()}},g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"mb-10",class:{"opacity-50 pointer-events-none":e.disabled}},[n("div",{staticClass:"flex justify-center mb-8"},[n("input-text",{ref:"authInput",attrs:{"extra-class":"flex-auto mr-4",placeholder:"Auth token"},model:{value:e.authToken,callback:function(t){e.authToken=t},expression:"authToken"}}),n("input-text",{ref:"idFileInput",attrs:{"extra-class":"flex-1",placeholder:"Id File"},model:{value:e.idFile,callback:function(t){e.idFile=t},expression:"idFile"}})],1),n("div",{staticClass:"flex justify-center mb-4"},[n("input-text",{ref:"addInput",attrs:{"extra-class":"mr-4 ",placeholder:"Token name"},model:{value:e.tokenName,callback:function(t){e.tokenName=t},expression:"tokenName"}}),n("custom-select",{staticClass:"addSelect",attrs:{options:e.typeOptions},model:{value:e.tokenType,callback:function(t){e.tokenType=t},expression:"tokenType"}}),n("div",{staticClass:"ml-4 flex items-center"},[n("custom-button",{attrs:{size:"small",type:"green",disabled:e.isDisabledAdd},on:{click:e.handleAdd}},[e._v("Add token")])],1),n("div",{staticClass:"ml-8 pl-8 flex items-center border-l"},[n("custom-button",{attrs:{disabled:e.disabledSearch},on:{click:e.handleSearch}},[e._v("Get tokens")])],1)],1)])},k=[],y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"transition duration-300 ease-in-out text-white font-bold my-1 py-4 border-b-4 rounded",class:[e.disabled&&e.disabledClasses,e.extraClass,e.typeClasses,e.sizeClass],attrs:{disabled:e.disabled},on:{click:e.handleClick}},[e._t("default")],2)},v=[],x={name:"CustomButton",props:["extraClass","disabled","type","size"],methods:{handleClick:function(e){e.preventDefault(),this.$emit("click",e)}},computed:{extraClasses:function(){return this.extraClass||""},disabledClasses:function(){return"opacity-50 pointer-events-none"},typeClasses:function(){return"green"===this.type?"bg-green-500 border-green-700 hover:border-green-500 hover:border-green-400":"bg-blue-500 border-blue-700 hover:border-blue-500 hover:bg-blue-400 "},sizeClass:function(){return"small"===this.size?"px-8":"px-24"}}},C=x,w=Object(o["a"])(C,y,v,!1,null,null,null),_=w.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"relative"},[n("select",{staticClass:"appearance-none w-full bg-white border border-gray-300 rounded-lg py-6 pl-6 pr-12 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-b-4",domProps:{value:e.value},on:{change:e.handleChange}},e._l(e.options,(function(t,r){return n("option",{key:t+r,domProps:{value:r}},[e._v(e._s(t))])})),0),n("div",{staticClass:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])},T=[],O=(n("a9e3"),{name:"CustomSelect",props:{options:{type:Array,required:!0},value:{type:[String,Number]}},data:function(){return{selected:null,mutableFlightSegment:JSON.parse(JSON.stringify(this.value))}},methods:{handleChange:function(e){this.$emit("input",e.target.value),this.$emit("change")}}}),j=O,$=Object(o["a"])(j,S,T,!1,null,null,null),D=$.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{ref:"field",staticClass:"bg-white  focus:shadow-outline border border-gray-300 rounded-lg py-4 px-6 block appearance-none leading-normal border-b-4",class:e.extraClass,attrs:{type:"text",placeholder:e.placeholder||"Type"},domProps:{value:e.value},on:{input:function(t){return e.getData(t.target.value)},keyup:function(t){return e.onInputKeyUp(t)}}})},P=[],M={name:"InputText",props:{placeholder:{type:String},extraClass:{type:String},value:{type:String}},computed:{extraClasses:function(){return this.extraClass||""}},methods:{getData:function(e){this.$emit("input",e)},onInputKeyUp:function(e){null!==this.onKeyUp&&this.$emit("onKeyUp",e.target.value)},clear:function(){this.$refs.field.value=null}}},A=M,I=Object(o["a"])(A,F,P,!1,null,null,null),N=I.exports,E={name:"TokenForm",components:{CustomButton:_,CustomSelect:D,InputText:N},props:{isDisabledSearch:{type:Boolean},tokens:{type:Array},disabled:{type:Boolean}},data:function(){return{authToken:"",idFile:"",tokenName:"",tokenType:0,typeOptions:["color","typography","space","radius","breakpoint","opacity"]}},computed:{isDisabledAdd:function(){return!this.tokenName},disabledSearch:function(){return!(this.tokens.length&&this.authToken&&this.idFile)}},methods:{handleAdd:function(){this.$emit("onAddToken",{name:this.tokenName,type:this.typeOptions[this.tokenType]}),this.resetPanel()},handleSearch:function(){this.$emit("onSearch",{authToken:this.authToken,idFile:this.idFile}),this.resetPanel()},resetPanel:function(){this.tokenType=0,this.tokenName="",this.tokensData=null}}},z=E,B=Object(o["a"])(z,g,k,!1,null,null,null),L=B.exports,J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bg-white p-6 border-b-4 border-gray-400 border rounded-lg relative"},[n("vue-json-pretty",{attrs:{showLine:!1,showDoubleQuotes:!1,deep:1,data:e.data}}),n("font-awesome-icon",{staticClass:"close-icon text-red-600 absolute ml-4 hover:text-red-800 cursor-pointer transition-all ease-out duration-300",attrs:{icon:"times-circle",size:"2x"},on:{click:function(t){return e.$emit("onClose")}}})],1)},K=[],R=n("d538"),U=n.n(R),G={name:"TokensTree",components:{VueJsonPretty:U.a},props:{data:{type:Object}}},H=G,q=(n("3865"),Object(o["a"])(H,J,K,!1,null,"1bdb26b7",null)),Q=q.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-center py-12 text-green-400"},[n("font-awesome-icon",{attrs:{icon:"spinner",spin:"",size:"4x"}})],1)},W=[],X={name:"Loading",props:{loading:{type:Boolean}}},Y=X,Z=Object(o["a"])(Y,V,W,!1,null,null,null),ee=Z.exports,te=(n("caad"),n("d3b7"),n("ac1f"),n("25f0"),n("2532"),n("1276"),n("498a"),n("5530")),ne=function(e){return e.code.includes(":root")?Object(te["a"])(Object(te["a"])({},e),{},{code:":root".concat(e.code.toString().split(":root")[1].trim())}):e},re={name:"Home",components:{TokenForm:L,TokensTree:Q,Loading:ee,CustomButton:_},data:function(){return{errorMessage:null,tokensData:null,loading:!1,tokensSearch:[],tokenStyles:[]}},methods:{getData:function(e){var t=this;this.loading=!0,this.errorMessage=null;var n={authToken:e.authToken,idFile:e.idFile,config:this.tokensSearch};b.getTokens(n).then((function(e){"error"===e.type?(console.log(e),t.errorMessage=e.message):(t.errorMessage=null,t.tokensData=e,t.$refs.form.$refs.authInput.clear(),t.$refs.form.$refs.idFileInput.clear()),t.loading=!1,t.tokensSearch=[]}))},addToken:function(e){this.tokensSearch.push(e),this.errorMessage=null},deleteToken:function(e){this.tokensSearch=this.tokensSearch.filter((function(t){return t.name!==e}))},resetTokens:function(){this.tokensData=null,this.tokenStyles=[]},handleStyle:function(){var e=this;b.getStyles().then((function(t){t.forEach((function(t){e.tokenStyles.push(ne(t))}))}))}}},ae=re,se=(n("a1ea"),Object(o["a"])(ae,d,p,!1,null,"5f6a50ba",null)),oe=se.exports;r["a"].use(u["a"]);var ie=[{path:"/",name:"Home",component:oe}],le=new u["a"]({mode:"history",base:"/figma-tokens-app/",routes:ie}),ce=le,ue=n("2f62");r["a"].use(ue["a"]);var de=new ue["a"].Store({state:{},mutations:{},actions:{},modules:{}}),pe=n("97fa"),fe=n("ecee"),he=n("c074"),me=n("ad3d");n("a878"),n("a41b");fe["c"].add(he["a"],he["b"]),r["a"].component("font-awesome-icon",me["a"]),r["a"].use(pe["a"]),r["a"].config.productionTip=!1,new r["a"]({router:ce,store:de,render:function(e){return e(c)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"9c0c":function(e,t,n){},a1ea:function(e,t,n){"use strict";var r=n("4e2f"),a=n.n(r);a.a},a41b:function(e,t,n){}});
//# sourceMappingURL=app.e3ccb77d.js.map