"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),r=require("react"),t=require("../../utils/forReactUtils.js"),n=require("../../utils/valueParserUtils.js"),s=require("./Timer.module.scss.js"),u=t.makeCxFunc(s),a=1e3,c=function(e){var r=e/a,t=Math.floor(r/86400),n=Math.floor(r%86400/3600),s=Math.floor(r%3600/60),u=Math.ceil(r%60);return{days:t,hours:n,minutes:s,seconds:60===u?59:u,restMs:e%a}},o=function(e){if("number"==typeof e)return e;var r=e.days,t=void 0===r?0:r,n=e.hours,s=void 0===n?0:n,u=e.minutes,c=void 0===u?0:u,o=e.seconds;return 86400*t+3600*s*a+60*c*a+(void 0===o?0:o)*a};module.exports=function(t){var s=t.className,l=void 0===s?"":s,i=t.duration,m=t.saperator,f=t.suffix,d=t.useButtons,p=void 0===d||d,E=t.pausedElement,h=void 0===E?"pause":E,v=t.resumedElement,b=void 0===v?"resume":v,C=t.refreshElement,w=void 0===C?"refresh":C,y=t.defaultPaused,N=void 0!==y&&y,k=t.showAllUnits,M=void 0!==k&&k,R=t.onEnd,x=r.useState(N),q=e(x,2),D=q[0],F=q[1],g=r.useState(0===i),j=e(g,2),H=j[0],S=j[1],T=r.useState(o(i)),U=e(T,2),A=U[0],I=U[1],P=r.useRef(A),B=r.useRef(null),L=r.useRef(null),z=r.useRef(null),G=r.useRef(null),J=r.useRef(null),K=r.useRef(0),O=r.useRef(!1),Q=r.useMemo((function(){var e=c(A);return{showDaysCount:e.days>0,showHoursCount:e.hours>0,showMinutesCount:e.minutes>0}}),[A]),V=Q.showDaysCount,W=Q.showHoursCount,X=Q.showMinutesCount,Y=r.useCallback((function(e){return n.pad(e,"0",2)}),[]),Z=r.useCallback((function(e,r){e&&(e.innerHTML=Y(r))}),[Y]),$=r.useCallback((function(){var e=c(P.current),r=e.hours,t=e.minutes,n=e.seconds;Z(z.current,r),Z(L.current,t),Z(B.current,n)}),[Z]),_=r.useCallback((function(){clearInterval(J.current),J.current=null}),[]),ee=r.useCallback((function(e,r){_(),K.current=Date.now(),J.current=setInterval((function(){return e(r)}),r)}),[_]),re=r.useCallback((function(e){var r=c(P.current),t=P.current-e,n=c(t);n.days!==r.days&&Z(G.current,n.days),n.hours!==r.hours&&Z(z.current,n.hours),n.minutes!==r.minutes&&Z(L.current,n.minutes),Z(B.current,n.seconds),P.current=t,P.current<=0?(_(),S(!0)):e!==a&&(_(),ee(re,a))}),[_,ee,Z]),te=r.useCallback((function(){var e=c(P.current).restMs;ee(re,e||a)}),[ee,re]),ne=r.useCallback((function(){if(!D){var e=Date.now()-K.current,r=c(e).restMs;P.current-=r}F(!D)}),[D]),se=r.useCallback((function(){D?_():P.current>0&&te()}),[D,te,_]),ue=r.useCallback((function(e){P.current=e}),[]),ae=r.useCallback((function(e){ue(e),S(0===e),O.current=!1,$(),se()}),[se,ue,$]);r.useEffect((function(){if("number"!=typeof i){var e=i.seconds,r=i.minutes,t=i.hours;if("number"==typeof e&&e>=60)throw new Error("duration prop에서 seconds의 값(".concat(e,")은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 분 단위에 더하여 설정해야 합니다!"));if("number"==typeof r&&r>=60)throw new Error("duration prop에서 minutes의 값(".concat(r,")은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 시간 단위에 더하여 설정해야 합니다!"));if("number"==typeof t&&t>=24)throw new Error("duration prop에서 hours의 값(".concat(t,")은 23 보다 클 수 없으며 이를 초과하는 나머지 값은 일 단위에 더하여 설정해야 합니다!"))}else if(i<0)throw new Error("duration은 0보다 작을 수 없습니다!");var n=o(i);n!==A&&(_(),I(n),ae(n))}),[i,A,ae,_]),r.useEffect((function(){se()}),[se]),r.useEffect((function(){H&&!O.current&&(O.current=!0,null==R||R())}),[H,R]);var ce=c(P.current),oe=ce.days,le=ce.hours,ie=ce.minutes,me=ce.seconds;return r.createElement("span",{className:u("timer-wrapper",l)},p&&r.createElement("span",{className:u("timer-button-container")},r.createElement("button",{onClick:ne,className:u("timer-button")},D?b:h),r.createElement("button",{className:u("timer-button"),onClick:function(){return ae(A)}},w)),r.createElement("span",{className:u("timer-counter-container")},(M||V)&&r.createElement(r.Fragment,null,r.createElement("span",{className:u("timer-counter")},r.createElement("span",{ref:G},Y(oe)),(null==f?void 0:f.days)&&r.createElement("span",{className:u("timer-suffix")},f.days)),m&&r.createElement("span",{className:u("timer-separator")},m)),(M||V||W)&&r.createElement(r.Fragment,null,r.createElement("span",{className:u("timer-counter")},r.createElement("span",{ref:z},Y(le)),(null==f?void 0:f.hours)&&r.createElement("span",{className:u("timer-suffix")},f.hours)),m&&r.createElement("span",{className:u("timer-separator")},m)),(M||V||W||X)&&r.createElement(r.Fragment,null,r.createElement("span",{className:u("timer-counter")},r.createElement("span",{ref:L},Y(ie)),(null==f?void 0:f.minutes)&&r.createElement("span",{className:u("timer-suffix")},f.minutes)),m&&r.createElement("span",{className:u("timer-separator")},m)),r.createElement("span",{className:u("timer-counter")},r.createElement("span",{ref:B},Y(me)),(null==f?void 0:f.seconds)&&r.createElement("span",{className:u("timer-suffix")},f.seconds))))};
