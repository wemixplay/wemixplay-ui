"use strict";var e=require("react"),t=require("../../utils/forReactUtils.js"),r=require("../../utils/valueParserUtils.js"),s=require("./Timer.module.scss.js");const n=t.makeCxFunc(s),a=1e3,u=e=>{const t=e/a,r=Math.floor(t/86400),s=Math.floor(t%86400/3600),n=Math.floor(t%3600/60),u=Math.ceil(t%60);return{days:r,hours:s,minutes:n,seconds:60===u?59:u,restMs:e%a}},c=e=>{if("number"==typeof e)return e;const{days:t=0,hours:r=0,minutes:s=0,seconds:n=0}=e;return 86400*t+3600*r*a+60*s*a+n*a};var l=t=>{let{className:s="",duration:l,saperator:o,suffix:m,useButtons:i=!0,pausedElement:f="pause",resumedElement:p="resume",refreshElement:d="refresh",defaultPaused:E=!1,showAllUnits:h=!1,onEnd:b}=t;const[C,w]=e.useState(E),[N,y]=e.useState(0===l),[k,M]=e.useState(c(l)),v=e.useRef(k),R=e.useRef(null),x=e.useRef(null),q=e.useRef(null),D=e.useRef(null),F=e.useRef(null),g=e.useRef(0),j=e.useRef(!1),{showDaysCount:H,showHoursCount:S,showMinutesCount:U}=e.useMemo((()=>{const{days:e,hours:t,minutes:r}=u(k);return{showDaysCount:e>0,showHoursCount:t>0,showMinutesCount:r>0}}),[k]),I=e.useCallback((e=>r.pad(e,"0",2)),[]),P=e.useCallback(((e,t)=>{e&&(e.innerHTML=I(t))}),[I]),T=e.useCallback((()=>{const{hours:e,minutes:t,seconds:r}=u(v.current);P(q.current,e),P(x.current,t),P(R.current,r)}),[P]),A=e.useCallback((()=>{clearInterval(F.current),F.current=null}),[]),B=e.useCallback(((e,t)=>{A(),g.current=Date.now(),F.current=setInterval((()=>e(t)),t)}),[A]),L=e.useCallback((e=>{const t=u(v.current),r=v.current-e,s=u(r);s.days!==t.days&&P(D.current,s.days),s.hours!==t.hours&&P(q.current,s.hours),s.minutes!==t.minutes&&P(x.current,s.minutes),P(R.current,s.seconds),v.current=r,v.current<=0?(A(),y(!0)):e!==a&&(A(),B(L,a))}),[A,B,P]),z=e.useCallback((()=>{const{restMs:e}=u(v.current);B(L,e||a)}),[B,L]),G=e.useCallback((()=>{if(!C){const e=Date.now()-g.current,{restMs:t}=u(e);v.current-=t}w(!C)}),[C]),J=e.useCallback((()=>{C?A():v.current>0&&z()}),[C,z,A]),K=e.useCallback((e=>{v.current=e}),[]),O=e.useCallback((e=>{K(e),y(0===e),j.current=!1,T(),J()}),[J,K,T]);e.useEffect((()=>{if("number"!=typeof l){const{seconds:e,minutes:t,hours:r}=l;if("number"==typeof e&&e>=60)throw new Error("duration prop에서 seconds의 값(".concat(e,")은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 분 단위에 더하여 설정해야 합니다!"));if("number"==typeof t&&t>=60)throw new Error("duration prop에서 minutes의 값(".concat(t,")은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 시간 단위에 더하여 설정해야 합니다!"));if("number"==typeof r&&r>=24)throw new Error("duration prop에서 hours의 값(".concat(r,")은 23 보다 클 수 없으며 이를 초과하는 나머지 값은 일 단위에 더하여 설정해야 합니다!"))}else if(l<0)throw new Error("duration은 0보다 작을 수 없습니다!");const e=c(l);e!==k&&(A(),M(e),O(e))}),[l,k,O,A]),e.useEffect((()=>{J()}),[J]),e.useEffect((()=>{N&&!j.current&&(j.current=!0,null==b||b())}),[N,b]);const{days:Q,hours:V,minutes:W,seconds:X}=u(v.current);return e.createElement("span",{className:n("timer-wrapper",s)},i&&e.createElement("span",{className:n("timer-button-container")},e.createElement("button",{onClick:G,className:n("timer-button")},C?p:f),e.createElement("button",{className:n("timer-button"),onClick:()=>O(k)},d)),e.createElement("span",{className:n("timer-counter-container")},(h||H)&&e.createElement(e.Fragment,null,e.createElement("span",{className:n("timer-counter")},e.createElement("span",{ref:D},I(Q)),(null==m?void 0:m.days)&&e.createElement("span",{className:n("timer-suffix")},m.days)),o&&e.createElement("span",{className:n("timer-separator")},o)),(h||H||S)&&e.createElement(e.Fragment,null,e.createElement("span",{className:n("timer-counter")},e.createElement("span",{ref:q},I(V)),(null==m?void 0:m.hours)&&e.createElement("span",{className:n("timer-suffix")},m.hours)),o&&e.createElement("span",{className:n("timer-separator")},o)),(h||H||S||U)&&e.createElement(e.Fragment,null,e.createElement("span",{className:n("timer-counter")},e.createElement("span",{ref:x},I(W)),(null==m?void 0:m.minutes)&&e.createElement("span",{className:n("timer-suffix")},m.minutes)),o&&e.createElement("span",{className:n("timer-separator")},o)),e.createElement("span",{className:n("timer-counter")},e.createElement("span",{ref:R},I(X)),(null==m?void 0:m.seconds)&&e.createElement("span",{className:n("timer-suffix")},m.seconds))))};module.exports=l;
