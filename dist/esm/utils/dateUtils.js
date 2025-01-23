import e from"dayjs";import d from'./../ext/dayjs/plugin/advancedFormat.js';import t from'./../ext/dayjs/plugin/isBetween.js';import s from'./../ext/dayjs/plugin/relativeTime.js';import a from'./../ext/dayjs/plugin/timezone.js';import n from'./../ext/dayjs/plugin/updateLocale.js';import o from'./../ext/dayjs/plugin/utc.js';const r={name:"en",relativeTime:{future:"in %s",past:"%s ago",s:"1 seconds",ss:"%d seconds",m:"1 min",mm:"%d min",h:"1 hour",hh:"%d hours",d:"1 day",dd:"%d days",w:"1 week",ww:"%d weeks",M:"1 month",MM:"%d months",y:"1 year",yy:"%d years"}},m={name:"ko",relativeTime:{future:"%s 이후",past:"%s 전",s:"1 초",ss:"%d 초",m:"1 분",mm:"%d 분",h:"1 시간",hh:"%d 시간",d:"1 일",dd:"%d 일",w:"1 주",ww:"%d 주",M:"1 달",MM:"%d 달",y:"1 년",yy:"%d 년"}},u={name:"ja",relativeTime:{future:"%s後",past:"%s前",s:"1秒",ss:"%d秒",m:"1分钟",mm:"%d分",h:"一時間",hh:"%d時間",d:"一日",dd:"%d日",w:"一週間",ww:"%d週間",M:"一か月",MM:"%dか月",y:"一年",yy:"%d年"}},l={name:"pt",relativeTime:{future:"%s depois",past:"%s atrás",s:"1 segundo",ss:"%d segundo",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",w:"uma semana",ww:"%d semanas",M:"há um mês",MM:"%d meses",y:"um ano",yy:"%d anos"}},i={name:"zh-Hans",relativeTime:{future:"%s後",past:"%s前",s:"1秒",ss:"%d秒",m:"1分钟",mm:"%d分钟",h:"一小时",hh:"%d小时",d:"一天",dd:"%d天",w:"一周",ww:"%d周",M:"一个月",MM:"%d个月",y:"一年",yy:"%d年"}},h={name:"zh-Hant",relativeTime:{future:"%s後",past:"%s前",s:"1秒",ss:"%d秒",m:"1分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",w:"一週",ww:"%d週",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}},c={thresholds:[{l:"s",r:1},{l:"ss",r:59,d:"second"},{l:"m",r:1},{l:"mm",r:59,d:"minute"},{l:"h",r:1},{l:"hh",r:23,d:"hour"},{l:"d",r:1},{l:"dd",r:6,d:"day"},{l:"w",r:1},{l:"ww",r:3,d:"week"},{l:"M",r:1},{l:"MM",r:11,d:"month"},{l:"y",r:1},{l:"yy",d:"year"}],rounding:Math.floor};e.extend(o),e.extend(a),e.extend(t),e.extend(d),e.extend(s,c),e.extend(n),e.updateLocale("en",r),e.updateLocale("ko",m),e.updateLocale("pt",l),e.updateLocale("zh-cn",i),e.updateLocale("zh-tw",h),e.updateLocale("ja",u);const y=d=>{var t,s;return(null===(t=e(d))||void 0===t?void 0:t.isUTC)?e(d):null===(s=e(d))||void 0===s?void 0:s.utc()},M=e=>{switch(e){case"zh-Hant":return"zh-cn";case"zh-Hans":return"zh-tw";default:return e}},p=e=>+y(e).unix(),w=e=>+y(13===String(e).length?e:1e3*e),f=function(e){let d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return d=M(d),e=w(e),y(e).locale(d).fromNow()},g=(e,d)=>{e=w(e);const t=y(),s=y(e);return Math.floor(s.diff(t,d,!0))},j=function(e){let d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";d=M(d);const t="string"==typeof e?p(e):e,s=Math.abs(g(t,"day")),a=(new Date).getFullYear(),n=y(w(t)).format("YYYY"),o=s>=7;let r="ko"===d?"YYYY년 MM월 DD일":"MMM D, YYYY";return Number(a)===Number(n)&&(r="ko"===d?"MM월 DD일":"MMM D"),o?y(w(t)).format(r):f(t,d)},v=e=>{let{createdAt:d,updatedAt:t,locale:s="en"}=e;if(!t||d===t)return j(d,s);s=M(s);const a="string"==typeof t?p(t):t;if(Math.abs(g(a,"hour"))<24){const e=f(a,s);switch(s){case"ko":return"".concat(e,"에 수정됨");case"ja":return"".concat(e,"修正");case"pt":return"Editado há ".concat(e);case"zh-Hans":return"".concat(e,"编辑");case"zh-Hant":return"".concat(e,"編輯");default:return"Modified ".concat(e)}}return j(d,s)};export{r as ENGLISH_LOCALE_OBJECT,u as JAPAN_LOCALE_OBJECT,m as KOREAN_LOCALE_OBJECT,l as PORT_LOCALE_OBJECT,c as RELATIVE_TIME_CONFIG,i as ZH_CN__LOCALE_OBJECT,h as ZH_TW__LOCALE_OBJECT,y as dayjs,f as formatRelativeTime,p as getDateUnix,g as getGapFromNow,v as getModifyTimeString,j as getTimeString,w as getTimestamp};
