webpackJsonp([3],{"998d":function(t,e){},B6Mt:function(t,e){},FkRG:function(t,e){},NHnr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"nav"},[e("router-link",{staticClass:"route",attrs:{to:{path:"/"}}},[this._v("Задачи")]),e("router-link",{staticClass:"route",attrs:{to:{path:"/settings"}}},[this._v("Настройки")]),e("router-link",{staticClass:"route",attrs:{to:{path:"/reporting"}}},[this._v("Отчеты")])],1)},staticRenderFns:[]};var a={name:"App",components:{navigation:r("VU/8")({name:"navigations",data:function(){return{}}},o,!1,function(t){r("RLQB")},null,null).exports},data:function(){return{config:{WORKTIME:30,RELAXTIME:6}}},mounted:function(){if(localStorage.getItem("setting"))try{this.config=JSON.parse(localStorage.getItem("setting"))}catch(t){localStorage.removeItem("setting")}}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("navigation"),this._v(" "),e("router-view",{attrs:{config:this.config}})],1)},staticRenderFns:[]};var s=r("VU/8")(a,i,!1,function(t){r("fIa7")},null,null).exports,c=r("/ocq"),u=r("mvHQ"),l=r.n(u),m={name:"todo",props:["config"],components:{taskList:function(){return r.e(1).then(r.bind(null,"fyZ6"))},timmer:function(){return r.e(0).then(r.bind(null,"eXv8"))}},data:function(){return{timeLeft:0,tasks:[],report:{},taskStarted:null}},mounted:function(){if(localStorage.getItem("tasks"))try{this.tasks=JSON.parse(localStorage.getItem("tasks"))}catch(t){localStorage.removeItem("tasks")}if(localStorage.getItem("report"))try{this.report=JSON.parse(localStorage.getItem("report"))}catch(t){localStorage.removeItem("report")}},methods:{saveTasks:function(){this.sortByComleted(),localStorage.setItem("report",l()(this.report)),localStorage.setItem("tasks",l()(this.tasks))},sortByComleted:function(){this.tasks.sort(function(t,e){return t.completed&&!e.completed?1:e.completed&&!t.completed?-1:0})},addTask:function(t){this.taskStarted.completed=!0,this.timeLeft+=t,this.taskStarted.totalTime+=t,this.addReport(t),this.taskStarted=null,this.saveTasks()},currTaskDone:function(){this.taskStarted.completed=!0,this.currTaskClose()},currTaskClose:function(){var t=this.config.WORKTIME-this.timeLeft+this.config.RELAXTIME;this.taskStarted.totalTime+=t,this.addReport(t),this.taskStarted=null,this.saveTasks(),this.timeLeft=0},addReport:function(t){var e=this.taskStarted.title,r=this.formatDate();void 0===this.report[r]?(this.report[r]={},this.report[r][e]=t):void 0===this.report[r][e]?this.report[r][e]=t:this.report[r][e]=this.report[r][e]+t},formatDate:function(){var t=new Date,e=t.getDate();e<10&&(e="0"+e);var r=t.getMonth()+1;r<10&&(r="0"+r);var n=t.getFullYear()%100;return n<10&&(n="0"+n),e+"."+r+"."+n}}},p={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[null!=t.taskStarted?r("timmer",{attrs:{WORKTIME:t.config.WORKTIME-t.timeLeft,RELAXTIME:t.config.RELAXTIME,currTask:t.taskStarted},on:{currTaskClosed:t.currTaskClose,addTask:t.addTask,currTaskIsDone:t.currTaskDone}}):r("taskList",{attrs:{tasks:t.tasks},on:{taskListChanged:t.saveTasks,selectTask:function(e){t.taskStarted=e}}})],1)},staticRenderFns:[]};var f=r("VU/8")(m,p,!1,function(t){r("FkRG")},null,null).exports,h={name:"settings",props:["config"],data:function(){return{workmin:0,relaxmin:0}},mounted:function(){this.workmin=this.config.WORKTIME/60,this.relaxmin=this.config.RELAXTIME/60},methods:{save:function(){this.config.WORKTIME=60*this.workmin,this.config.RELAXTIME=60*this.relaxmin,localStorage.setItem("setting",l()(this.config))}}},d={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"setting"},[r("div",{staticClass:"row"},[r("p",[t._v("Работа (мин)")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.workmin,expression:"workmin",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.workmin},on:{change:t.save,input:function(e){e.target.composing||(t.workmin=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"row"},[r("p",[t._v("Отдых (мин)")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.relaxmin,expression:"relaxmin",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.relaxmin},on:{change:t.save,input:function(e){e.target.composing||(t.relaxmin=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])])},staticRenderFns:[]};var v=r("VU/8")(h,d,!1,function(t){r("998d")},null,null).exports,g=r("Gu7T"),k=r.n(g),_={name:"Reporting",data:function(){return{from:"",to:"",rawReport:{}}},mounted:function(){if(localStorage.getItem("report"))try{this.rawReport=JSON.parse(localStorage.getItem("report"))}catch(t){localStorage.removeItem("report")}},methods:{timeFormating:function(t){return Math.round(t/360)/10},clearDate:function(){this.from="",this.to=""}},computed:{report:function(){if(""===this.from&&""===this.to)return this.rawReport;var t={},e=new Date(this.from),r=new Date(this.to);for(var n in this.rawReport){var o=n.split("."),a=new Date("20"+o[2],o[1]-1,o[0]);a<e||a>r||(t[n]=this.rawReport[n])}return t},tableFooter:function(){var t=this,e=[];for(var r in this.report){var n=0;for(var o in this.report[r])n+=this.report[r][o];e.push(n)}return[this.timeFormating(e.reduce(function(t,e){return t+e},0))].concat(k()(e.map(function(e){return t.timeFormating(e)})))},headers:function(){var t=[];for(var e in this.report)t.push(e);return t},rows:function(){var t=this,e=[],r=[],n=this.report;for(var o in n)for(var a in n[o])r.includes(a)||r.push(a);var i=1;for(var s in r){var c=r[s],u=0,l=[];for(var m in n)void 0===n[m][c]?l.push(""):(l.push(n[m][c]),u+=this.report[m][c]);e.push([i++,c,this.timeFormating(u)].concat(k()(l.map(function(e){return t.timeFormating(e)}))))}return e}}},T={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"reporting"},[r("div",{staticClass:"row"},[r("p",[t._v("С")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.from,expression:"from"}],attrs:{type:"date"},domProps:{value:t.from},on:{input:function(e){e.target.composing||(t.from=e.target.value)}}}),r("p",[t._v("ДО")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.to,expression:"to"}],attrs:{type:"date"},domProps:{value:t.to},on:{input:function(e){e.target.composing||(t.to=e.target.value)}}}),r("button",{on:{click:t.clearDate}},[t._v("Сброс дат")])]),r("table",[r("tr",[r("th",[t._v("#")]),r("th",[t._v("Задача")]),r("th",[t._v("Общее время")]),t._l(t.headers,function(e){return r("th",[t._v(t._s(e))])})],2),t._l(t.rows,function(e){return r("tr",t._l(e,function(e){return r("td",[t._v(t._s(e))])}),0)}),r("tr",[r("th",{attrs:{colspan:"2"}},[t._v("Итого")]),t._l(t.tableFooter,function(e){return r("th",[t._v(t._s(e))])})],2)],2)])},staticRenderFns:[]};var I=r("VU/8")(_,T,!1,function(t){r("B6Mt")},null,null).exports;n.a.use(c.a);var R=new c.a({routes:[{path:"/",name:"todo",component:f},{path:"/settings",name:"settings",component:v},{path:"/reporting",name:"reporting",component:I}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:R,components:{App:s},template:"<App/>"})},RLQB:function(t,e){},fIa7:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b744d26aac12fd118ad0.js.map