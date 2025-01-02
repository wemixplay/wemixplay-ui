import e,{useState as r,useRef as t,useMemo as n,useCallback as s,useEffect as a}from"react";import{makeCxFunc as u}from"../../utils/forReactUtils.js";import{pad as o}from"../../utils/valueParserUtils.js";import c from"./Timer.module.scss.js";const l=u(c),m=1e3,i=e=>{const r=e/m,t=Math.floor(r/86400),n=Math.floor(r%86400/3600),s=Math.floor(r%3600/60),a=Math.ceil(r%60);return{days:t,hours:n,minutes:s,seconds:60===a?59:a,restMs:e%m}},p=e=>{if("number"==typeof e)return e;const{days:r=0,hours:t=0,minutes:n=0,seconds:s=0}=e;return 86400*r+3600*t*m+60*n*m+s*m};var f=u=>{let{className:c="",duration:f,saperator:d,suffix:E,useButtons:h=!0,pausedElement:w="pause",resumedElement:N="resume",refreshElement:y="refresh",defaultPaused:b=!1,showAllUnits:M=!1,onEnd:v}=u;const[C,x]=r(b),[D,g]=r(0===f),[j,F]=r(p(f)),H=t(j),U=t(null),k=t(null),I=t(null),P=t(null),T=t(null),A=t(0),B=t(!1),{showDaysCount:L,showHoursCount:R,showMinutesCount:q}=n((()=>{const{days:e,hours:r,minutes:t}=i(j);return{showDaysCount:e>0,showHoursCount:r>0,showMinutesCount:t>0}}),[j]),z=s((e=>o(e,"0",2)),[]),G=s(((e,r)=>{e&&(e.innerHTML=z(r))}),[z]),J=s((()=>{const{hours:e,minutes:r,seconds:t}=i(H.current);G(I.current,e),G(k.current,r),G(U.current,t)}),[G]),K=s((()=>{clearInterval(T.current),T.current=null}),[]),O=s(((e,r)=>{K(),A.current=Date.now(),T.current=setInterval((()=>e(r)),r)}),[K]),Q=s((e=>{const r=i(H.current),t=H.current-e,n=i(t);n.days!==r.days&&G(P.current,n.days),n.hours!==r.hours&&G(I.current,n.hours),n.minutes!==r.minutes&&G(k.current,n.minutes),G(U.current,n.seconds),H.current=t,H.current<=0?(K(),g(!0)):e!==m&&(K(),O(Q,m))}),[K,O,G]),S=s((()=>{const{restMs:e}=i(H.current);O(Q,e||m)}),[O,Q]),V=s((()=>{if(!C){const e=Date.now()-A.current,{restMs:r}=i(e);H.current-=r}x(!C)}),[C]),W=s((()=>{C?K():H.current>0&&S()}),[C,S,K]),X=s((e=>{H.current=e}),[]),Y=s((e=>{X(e),g(0===e),B.current=!1,J(),W()}),[W,X,J]);a((()=>{if("number"!=typeof f){const{seconds:e,minutes:r,hours:t}=f;if("number"==typeof e&&e>=60)throw new Error("duration prop에서 seconds의 값(".concat(e,")은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 분 단위에 더하여 설정해야 합니다!"));if("number"==typeof r&&r>=60)throw new Error("duration prop에서 minutes의 값(".concat(r,")은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 시간 단위에 더하여 설정해야 합니다!"));if("number"==typeof t&&t>=24)throw new Error("duration prop에서 hours의 값(".concat(t,")은 23 보다 클 수 없으며 이를 초과하는 나머지 값은 일 단위에 더하여 설정해야 합니다!"))}else if(f<0)throw new Error("duration은 0보다 작을 수 없습니다!");const e=p(f);e!==j&&(K(),F(e),Y(e))}),[f,j,Y,K]),a((()=>{W()}),[W]),a((()=>{D&&!B.current&&(B.current=!0,null==v||v())}),[D,v]);const{days:Z,hours:$,minutes:_,seconds:ee}=i(H.current);return e.createElement("span",{className:l("timer-wrapper",c)},h&&e.createElement("span",{className:l("timer-button-container")},e.createElement("button",{onClick:V,className:l("timer-button")},C?N:w),e.createElement("button",{className:l("timer-button"),onClick:()=>Y(j)},y)),e.createElement("span",{className:l("timer-counter-container")},(M||L)&&e.createElement(e.Fragment,null,e.createElement("span",{className:l("timer-counter")},e.createElement("span",{ref:P},z(Z)),(null==E?void 0:E.days)&&e.createElement("span",{className:l("timer-suffix")},E.days)),d&&e.createElement("span",{className:l("timer-separator")},d)),(M||L||R)&&e.createElement(e.Fragment,null,e.createElement("span",{className:l("timer-counter")},e.createElement("span",{ref:I},z($)),(null==E?void 0:E.hours)&&e.createElement("span",{className:l("timer-suffix")},E.hours)),d&&e.createElement("span",{className:l("timer-separator")},d)),(M||L||R||q)&&e.createElement(e.Fragment,null,e.createElement("span",{className:l("timer-counter")},e.createElement("span",{ref:k},z(_)),(null==E?void 0:E.minutes)&&e.createElement("span",{className:l("timer-suffix")},E.minutes)),d&&e.createElement("span",{className:l("timer-separator")},d)),e.createElement("span",{className:l("timer-counter")},e.createElement("span",{ref:U},z(ee)),(null==E?void 0:E.seconds)&&e.createElement("span",{className:l("timer-suffix")},E.seconds))))};export{f as default};
