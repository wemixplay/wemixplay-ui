"use strict";var e=require("dayjs"),t=require('./../ext/dayjs/plugin/advancedFormat.js'),d=require('./../ext/dayjs/plugin/isBetween.js'),s=require('./../ext/dayjs/plugin/relativeTime.js'),r=require('./../ext/dayjs/plugin/timezone.js'),a=require('./../ext/dayjs/plugin/updateLocale.js'),n=require('./../ext/dayjs/plugin/utc.js');const o={name:"en",relativeTime:{future:"in %s",past:"%s ago",s:"1 seconds",ss:"%d seconds",m:"1 min",mm:"%d min",h:"1 hour",hh:"%d hours",d:"1 day",dd:"%d days",w:"1 week",ww:"%d weeks",M:"1 month",MM:"%d months",y:"1 year",yy:"%d years"}},u={name:"ko",relativeTime:{future:"%s 이후",past:"%s 전",s:"1 초",ss:"%d 초",m:"1 분",mm:"%d 분",h:"1 시간",hh:"%d 시간",d:"1 일",dd:"%d 일",w:"1 주",ww:"%d 주",M:"1 달",MM:"%d 달",y:"1 년",yy:"%d 년"}},m={name:"ja",relativeTime:{future:"%s後",past:"%s前",s:"1秒",ss:"%d秒",m:"1分钟",mm:"%d分",h:"一時間",hh:"%d時間",d:"一日",dd:"%d日",w:"一週間",ww:"%d週間",M:"一か月",MM:"%dか月",y:"一年",yy:"%d年"}},i={name:"pt",relativeTime:{future:"%s depois",past:"%s atrás",s:"1 segundo",ss:"%d segundo",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",w:"uma semana",ww:"%d semanas",M:"há um mês",MM:"%d meses",y:"um ano",yy:"%d anos"}},l={name:"zh-Hans",relativeTime:{future:"%s後",past:"%s前",s:"1秒",ss:"%d秒",m:"1分钟",mm:"%d分钟",h:"一小时",hh:"%d小时",d:"一天",dd:"%d天",w:"一周",ww:"%d周",M:"一个月",MM:"%d个月",y:"一年",yy:"%d年"}},h={name:"zh-Hant",relativeTime:{future:"%s後",past:"%s前",s:"1秒",ss:"%d秒",m:"1分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",w:"一週",ww:"%d週",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}},c={thresholds:[{l:"s",r:1},{l:"ss",r:59,d:"second"},{l:"m",r:1},{l:"mm",r:59,d:"minute"},{l:"h",r:1},{l:"hh",r:23,d:"hour"},{l:"d",r:1},{l:"dd",r:6,d:"day"},{l:"w",r:1},{l:"ww",r:3,d:"week"},{l:"M",r:1},{l:"MM",r:11,d:"month"},{l:"y",r:1},{l:"yy",d:"year"}],rounding:Math.floor};e.extend(n),e.extend(r),e.extend(d),e.extend(t),e.extend(s,c),e.extend(a),e.updateLocale("en",o),e.updateLocale("ko",u),e.updateLocale("pt",i),e.updateLocale("zh-cn",l),e.updateLocale("zh-tw",h),e.updateLocale("ja",m);const p=t=>{var d,s;return(null===(d=e(t))||void 0===d?void 0:d.isUTC)?e(t):null===(s=e(t))||void 0===s?void 0:s.utc()},y=e=>{switch(e){case"zh-Hant":return"zh-cn";case"zh-Hans":return"zh-tw";default:return e}},M=e=>+p(e).unix(),w=e=>+p(13===String(e).length?e:1e3*e),f=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return t=y(t),e=w(e),p(e).locale(t).fromNow()},g=(e,t)=>{e=w(e);const d=p(),s=p(e);return Math.floor(s.diff(d,t,!0))},_=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";t=y(t);const d="string"==typeof e?M(e):e,s=Math.abs(g(d,"day")),r=(new Date).getFullYear(),a=p(w(d)).format("YYYY"),n=s>=7;let o="ko"===t?"YYYY년 MM월 DD일":"MMM D, YYYY";return Number(r)===Number(a)&&(o="ko"===t?"MM월 DD일":"MMM D"),n?p(w(d)).format(o):f(d,t)};exports.ENGLISH_LOCALE_OBJECT=o,exports.JAPAN_LOCALE_OBJECT=m,exports.KOREAN_LOCALE_OBJECT=u,exports.PORT_LOCALE_OBJECT=i,exports.RELATIVE_TIME_CONFIG=c,exports.ZH_CN__LOCALE_OBJECT=l,exports.ZH_TW__LOCALE_OBJECT=h,exports.dayjs=p,exports.formatRelativeTime=f,exports.getDateUnix=M,exports.getGapFromNow=g,exports.getModifyTimeString=e=>{let{createdAt:t,updatedAt:d,locale:s="en"}=e;if(!d||t===d)return _(t,s);s=y(s);const r="string"==typeof d?M(d):d;if(Math.abs(g(r,"hour"))<24){const e=f(r,s);switch(s){case"ko":return"".concat(e,"에 수정됨");case"ja":return"".concat(e,"修正");case"pt":return"Editado há ".concat(e);case"zh-Hans":return"".concat(e,"编辑");case"zh-Hant":return"".concat(e,"編輯");default:return"Modified ".concat(e)}}return _(t,s)},exports.getTimeString=_,exports.getTimestamp=w;