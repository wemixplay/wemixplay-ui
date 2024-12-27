"use strict";var e=require("../../../_virtual/_tslib.js"),r=require("decimal.js"),n=require('./../../../ext/lodash/last.js'),t=require('./../../../ext/lodash/replace.js'),u=require("react"),a=require("../../../utils/forReactUtils.js"),l=require("../../../utils/valueParserUtils.js"),s=require("../../../assets/svgs/keyboard-arrow-down-2.svg.js"),o=require("../../../assets/svgs/keyboard-arrow-up-2.svg.js"),i=require("../../ripple/Ripple.js"),c=require("./NumberInput.module.scss.js");const d=a.makeCxFunc(c),m=u.forwardRef(((a,c)=>{var m,{className:p="",step:v=1,error:w,isDirect:b=!0,increaseStep:g,decreaseStep:f,maxLength:E,arrowUpElement:h=u.createElement(o,null),arrowDownElement:N=u.createElement(s,null),rippleOption:C,hideButton:j,handleChange:k,handleEnter:R}=a,y=e.__rest(a,["className","step","error","isDirect","increaseStep","decreaseStep","maxLength","arrowUpElement","arrowDownElement","rippleOption","hideButton","handleChange","handleEnter"]);const{value:O,readOnly:D,disabled:S,min:q,max:M="9999999999999",digit:T=18,onFocus:U,onBlur:_}=y,x=u.useRef(),P=u.useRef(!1),B=u.useRef(),W=u.useRef(),F=u.useRef(),I=u.useRef(0),L=u.useRef(0),$=u.useRef(1e3),[H,z]=u.useState(null!=O?O:""),[A,G]=u.useState(!1),J=u.useMemo((()=>S||new r(null!=q?q:0).cmp(new r(M))>0),[S,M,q]),K=u.useCallback(((e,n,t)=>{var u,a,l,s,o,i;return"up"===t?new r(e||0).add(new r(null!==(l=null!==(a=null===(u=W.current)||void 0===u?void 0:u.increase)&&void 0!==a?a:n)&&void 0!==l?l:1)).toDP(T,r.ROUND_DOWN).toString():new r(e||0).sub(new r(null!==(i=null!==(o=null===(s=W.current)||void 0===s?void 0:s.decrease)&&void 0!==o?o:n)&&void 0!==i?i:1)).toDP(T,r.ROUND_DOWN).toString()}),[T]),Q=u.useCallback((e=>void 0===e||!e||J?"":e.endsWith(".")?e:void 0!==q&&new r(Number(e)).lt(new r(q))?String(q):void 0!==M&&new r(l.commaStrToNumber(e||"")).gt(new r(M))?String(M):e),[q,M,J]),V=u.useCallback((e=>J?"":e.endsWith(".")?e:Q(e)),[J,Q]),X=u.useCallback((e=>{let{type:r,e:u}=e;if(!x.current||J)return;const{value:a,name:s}=x.current,o=(e=>{var r;const u=null===(r=null==e?void 0:e.target)||void 0===r?void 0:r.value;return t(u,/^0+[\d,]/gm,(e=>n(e))).replace(/[^\d.-]/g,"")})({target:{value:a}}),i=T?new RegExp("^[0-9]*[.]{0,1}[0-9]{0,".concat(T,"}$"),"gm"):/^\d{0,18}$/;o.match(i)&&(void 0!==E&&(o||"").split(".")[0].replace(/[^0-9]/g,"").length>Number(E)||(x.current.value=l.makeParts(null!=o?o:"").join("."),B.current!==o&&(k&&k(o,s,{type:r}),u&&y.onChange&&y.onChange(u),B.current=o),z(o)))}),[J,T,E,k,y]),Y=u.useCallback(((e,r)=>{x.current&&(G(r),r?U&&U(e):(x.current.value=V(x.current.value),X({}),_&&_(e)))}),[U,V,X,_]),Z=u.useCallback((e=>{var r,n;if(J||D)return P.current=!1,void window.clearTimeout(I.current);B.current=K(null!==(r=B.current)&&void 0!==r?r:"0",F.current,e),B.current=Q(null!==(n=B.current)&&void 0!==n?n:"0"),z(String(B.current)),k&&k(B.current,y.name,{type:e}),P.current&&(window.clearTimeout(L.current),L.current=window.setTimeout((()=>{Z(e),$.current>100&&($.current-=$.current/5)}),$.current))}),[K,Q,J,k,y.name,D]),ee=u.useCallback((e=>{if(J||D)return P.current=!1,void window.clearTimeout(I.current);I.current=window.setTimeout((()=>{P.current=!0,Z(e)}),500)}),[J,Z,D]),re=u.useCallback((e=>{if(J||D)return P.current=!1,void window.clearTimeout(I.current);P.current=!1,$.current=500,window.clearTimeout(I.current),e&&X({type:e})}),[J,X,D]);return u.useEffect((()=>{void 0!==O&&z(O)}),[O]),u.useEffect((()=>{F.current=v}),[v]),u.useEffect((()=>{W.current={increase:g,decrease:f}}),[g,f]),u.useImperativeHandle(c,(()=>x.current)),u.createElement("div",{className:d("number-input",p,{focus:A,readonly:D,disabled:S,error:w})},u.createElement("div",{className:d("number-inp-cont")},u.createElement("input",Object.assign({},y,{ref:c||x,type:"text",inputMode:"decimal",value:null!==(m=l.makeParts(null!=H?H:"").join("."))&&void 0!==m?m:"",readOnly:!b,onChange:e=>X({e:e}),onFocus:e=>Y(e,!0),onBlur:e=>Y(e,!1)})),!j&&u.createElement("div",{className:d("number-btn-area")},u.createElement(i.default,Object.assign({},C,{disabled:J||(null==C?void 0:C.disabled)}),u.createElement("button",{"data-type":"up",className:d("number-btn","up"),disabled:J||M===H,onMouseDown:()=>ee("up"),onMouseUp:()=>re("up"),onMouseOut:()=>re(),onClick:()=>Z("up")},h)),u.createElement(i.default,Object.assign({},C,{disabled:J||(null==C?void 0:C.disabled)}),u.createElement("button",{"data-type":"down",className:d("number-btn","down"),disabled:J||q===H,onMouseDown:()=>ee("down"),onMouseUp:()=>re("down"),onMouseOut:()=>re(),onClick:()=>Z("down")},N)))))}));m.displayName="NumberInput";var p=m;module.exports=p;
