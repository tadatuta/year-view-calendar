(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(23)},19:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),c=n.n(o),s=(n(19),n(1)),i=n(2),l=n(6),u=n(3),m=n(7),d=n(10),v=n(9),f=n(8),h=n.n(f),p=["#E59942","rebeccapurple","#649B5E","#49B851","#14A0E7","#A2EEFE","#79B473"],g=h.a.mark(E);function y(e){return(e.getDay()+6)%7}function E(e,t){var n;return h.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:n=new Date(e);case 1:if(!(n<=t)){a.next=7;break}return a.next=4,n;case 4:n.setDate(n.getDate()+1),a.next=1;break;case 7:case"end":return a.stop()}},g)}function D(e){var t=e.getMonth(),n=e.getDate();return[e.getFullYear(),(t<10?"0":"")+t,(n<10?"0":"")+n].join("")}var w={WEEKEND:"\u0432\u044b\u0445\u043e\u0434\u043d\u043e\u0439",BUSINESS_TRIP:"\u043a\u043e\u043c\u0430\u043d\u0434\u0438\u0440\u043e\u0432\u043a\u0430",VACATION:"\u043e\u0442\u043f\u0443\u0441\u043a",CONCERT:"\u043a\u043e\u043d\u0446\u0435\u0440\u0442",SUBBOTNIK:"\u0441\u0443\u0431\u0431\u043e\u0442\u043d\u0438\u043a",HIKE:"\u043f\u043e\u0445\u043e\u0434",TRAINING:"\u0442\u0440\u0435\u043d\u0438\u043d\u0433",FRIDAY:"\u043f\u042f\u0422\u042c\u043d\u0438\u0446\u0430",HACKATHON:"\u0445\u0430\u043a\u0430\u0442\u043e\u043d",CALIBRATION:"\u043a\u0430\u043b\u0438\u0431\u0440\u043e\u0432\u043a",UNKNOWN:""};function N(e){for(var t=(e.summary+e.description).toLowerCase(),n=0,a=Object.values(w);n<a.length;n++){var r=a[n];if(t.includes(r))return r}return w.UNKNOWN}var b=function(){var e=Object.values(w);return function(t){return p[e.indexOf(N(t))]}}();function k(e,t){var n=e.split("."),a=Object(v.a)(n,3),r=a[0],o=a[1],c=a[2];return new Date(+c||t||(new Date).getFullYear(),+o-1,+r)}var O=n(13),j=Object(O.cn)("Calendar");n(22);function I(e){return 1===e.length?e[0].color:"linear-gradient(to bottom, "+e.reduce(function(t,n,a){return t.push(n.color+" "+100*a/e.length+"%",n.color+" "+100*(a+1)/e.length+"%"),t},[]).join(", ")+")"}function L(e){var t=e.day,n=e.isCurrent,o=e.isWeekend,c=e.isPassed,s=e.events,i=e.className,l=t.date.getDate(),u=s.length>0;return r.a.createElement("td",{className:j("Day",{current:n,otherMonth:t.meta&&t.meta.otherMonth,weekend:o,hasEvents:u,passed:c},[i]),tabIndex:1},r.a.createElement("div",{className:j("DayText"),style:u?{background:I(s)}:void 0},l),u&&r.a.createElement("div",{className:j("DayInfo")},s.map(function(e,t){return r.a.createElement(a.Fragment,{key:t},r.a.createElement("h3",{className:j("DayInfoSummary")},e.summary),r.a.createElement("div",{className:j("DayInfoDescription")},[e.description,e.location,e.url].filter(Boolean).map(function(e,t){return r.a.createElement("p",{key:t},e)})))})))}var S=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ru-Ru",t=[],n={weekday:"short"},a=new Date,r=0;r<7;r++)a.setDate(a.getDate()+1),t[y(a)]=a.toLocaleDateString(e,n);return t}();function T(){return r.a.createElement("tr",{className:j("DaysOfWeek")},S.map(function(e){return r.a.createElement("th",{key:e},e)}))}function x(e){var t=e.data.filter(function(e){return e.summary}),n=t.reduce(function(e,t){return e[t.color]=t.type||"???",e},{}),a=new Date;a.setHours(0,0,0,0);var o=!1;return r.a.createElement("div",{className:j("Legend")},r.a.createElement("ul",{className:j("LegendList")},Object.keys(n).map(function(e,t){return r.a.createElement("li",{className:j("LegendItem"),style:{color:e},key:t},r.a.createElement("span",{className:j("LegendItemText")},n[e]))})),r.a.createElement("ul",{className:j("LegendList")},t.map(function(e,t){var n=e.start.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit"}),c=e.end.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit"}),s=!1;return!o&&a<e.start&&(o=!0,s=!0),r.a.createElement("li",{className:j("LegendItem",{passed:e.end<a,markToday:s}),style:{color:e.color},key:e.start.toString()+t},r.a.createElement("span",{className:j("LegendItemText")},r.a.createElement("strong",null,n!==c?[n,c].join("-"):n)," ",e.summary))})))}var C=function(e){function t(e){var n,a,r;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).events=void 0,n.normalizedEvents=void 0,n.normalizedEvents=(a=n.props.data,r=n.props.year,a.split("\n").map(function(e){var t=e.split(/\s/),n=Object(d.a)(t),a=n[0],o=n.slice(1),c=a.split("-"),s=Object(v.a)(c,2),i=s[0],l=s[1],u=o.join(" ").split("."),m=Object(d.a)(u),f=m[0],h=m.slice(1).join(".").trim(),p={start:k(i,r),end:k(l||i,r),summary:f,description:h};return p.type=N(p),p.color=b(p),p}).sort(function(e,t){return+e.start-+t.start+(+e.end-+t.end)})),n.events=n.normalizedEvents.reduce(function(e,t,n){var a=E(t.start,t.end),r=!0,o=!1,c=void 0;try{for(var s,i=a[Symbol.iterator]();!(r=(s=i.next()).done);r=!0){var l=D(s.value);e[l]||(e[l]=[]),e[l].push(t)}}catch(u){o=!0,c=u}finally{try{r||null==i.return||i.return()}finally{if(o)throw c}}return e},{}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){if("undefined"!==typeof window){var e=new Date,t=new Date(e);t.setHours(0,0,0,0),window.history.pushState(null,"","#"+t.toLocaleDateString("en-US",{month:"long"}))}}},{key:"render",value:function(){var e=this,t=new Date,n=function(e){e||(e=(new Date).getFullYear());var t=new Date(e,0,1),n=new Date(t),a=new Date(t);a.setFullYear(t.getFullYear()+1);for(var r=[],o=0;n<a;){var c=n.getMonth();r[c]||(o=0,r[c]=[]);var s=y(n);if(!r[c][o]){r[c][o]=[];for(var i=0;i<s;i++){var l=new Date(n);l.setDate(l.getDate()-s+i),r[c][o].push({date:l,meta:{otherMonth:!0}})}}r[c][o][s]={date:new Date(n)},6===y(n)&&o++,n.setDate(n.getDate()+1)}return r}(this.props.year||t.getFullYear()),a=new Date(t);return a.setHours(0,0,0,0),r.a.createElement("div",{className:j()},r.a.createElement("div",{className:j("Year")},n.map(function(n,o){var c=new Date;return c.setMonth(o),r.a.createElement("div",{className:j("Month"),key:o},r.a.createElement("h2",{className:j("MonthName"),id:c.toLocaleDateString("en-US",{month:"long"})},c.toLocaleDateString("ru-RU",{month:"long"})),r.a.createElement("table",{className:j("MonthTable")},r.a.createElement("tbody",null,r.a.createElement(T,null),n.map(function(n,o){return r.a.createElement("tr",{className:j("Week"),key:o},n.map(function(n,o){var c,s,i=n.date,l=D(i),u=e.events[l]||[];return r.a.createElement(L,{day:n,isCurrent:(c=i,s=t,D(c)===D(s)),isWeekend:o>4,events:u,isPassed:n.date<a,key:l})}))}))))})),r.a.createElement(x,{data:this.normalizedEvents}))}}]),t}(a.Component),A=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(C,{data:"\n01.01-06.01 \u0420\u043e\u0437\u0430 \u0425\u0443\u0442\u043e\u0440\n14.02 \u043f\u042f\u0422\u042c\u043d\u0438\u0446\u0430 \u041c\u043e\u0441\u043a\u0432\u0430\n15.02-16.02 \u0424\u0440\u043e\u043d\u0442\u0435\u043d\u0434-\u0445\u0430\u043a\u0430\u0442\u043e\u043d \u041c\u043e\u0441\u043a\u0432\u0430\n24.02-01.03 [?] \u0421\u043e\u0447\u0438\n29.02 \u042f love \u0444\u0440\u043e\u043d\u0442\u0435\u043d\u0434\n26.03-27.03 \u0422\u0440\u0435\u043d\u0438\u043d\u0433 \xab\u042d\u043c\u043e\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0438\u043d\u0442\u0435\u043b\u043b\u0435\u043a\u0442 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f\xbb\n30.03-31.03 \u0422\u0440\u0435\u043d\u0438\u043d\u0433 \xab\u0421\u043b\u043e\u0436\u043d\u044b\u0435 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438\xbb\n01.04-30.04 \u041a\u0430\u043b\u0438\u0431\u0440\u043e\u0432\u043a\u0438\n25.04 \u0421\u0443\u0431\u0431\u043e\u0442\u043d\u0438\u043a \u041c\u043e\u0441\u043a\u0432\u0430\n15.05 \u043f\u042f\u0422\u042c\u043d\u0438\u0446\u0430 \u041c\u043e\u0441\u043a\u0432\u0430\n16.05-17.05 \u0424\u0440\u043e\u043d\u0442\u0435\u043d\u0434-\u0445\u0430\u043a\u0430\u0442\u043e\u043d \u041c\u043e\u0441\u043a\u0432\u0430\n23.05 \u0421\u0443\u0431\u0431\u043e\u0442\u043d\u0438\u043a \u0421\u0438\u043c\u0444\u0435\u0440\u043e\u043f\u043e\u043b\u044c\n29.05-31.05 \u041f\u043e\u0445\u043e\u0434 \u0432 \u0433\u043e\u0440\u044b\n27.06 \u0421\u0443\u0431\u0431\u043e\u0442\u043d\u0438\u043a \u041f\u0438\u0442\u0435\u0440\n14.08 \u043f\u042f\u0422\u042c\u043d\u0438\u0446\u0430 \u041f\u0438\u0442\u0435\u0440\n15.08-16.08 \u0424\u0440\u043e\u043d\u0442\u0435\u043d\u0434-\u0445\u0430\u043a\u0430\u0442\u043e\u043d \u041f\u0438\u0442\u0435\u0440\n01.10-31.10 \u041a\u0430\u043b\u0438\u0431\u0440\u043e\u0432\u043a\u0438\n20.11 \u043f\u042f\u0422\u042c\u043d\u0438\u0446\u0430 \u041c\u043e\u0441\u043a\u0432\u0430\n21.11-22.11 \u041c\u043e\u0441\u043a\u0432\u0430\n"})}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.22d997ea.chunk.js.map