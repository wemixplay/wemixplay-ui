import{__rest as e}from"../../../_virtual/_tslib.js";import t,{forwardRef as n,useRef as r,useState as a,useMemo as s,useCallback as o,useEffect as l,useImperativeHandle as c}from"react";import{makeCxFunc as u}from"../../../utils/forReactUtils.js";import i from"../../../assets/svgs/ico-input-reset.svg.js";import m from"../../../assets/svgs/ico-search-default.svg.js";import d from"./TextInput.module.scss.js";const f=u(d),p=n(((n,u)=>{const{className:d="",error:p,info:v,hideBtnReset:h,prefixIcon:g,searchIcon:y=t.createElement(m,null),resetIcon:E=t.createElement(i,null),handleChange:N,handleReset:b,handleEnter:x,validate:I}=n,j=e(n,["className","error","info","hideBtnReset","prefixIcon","searchIcon","resetIcon","handleChange","handleReset","handleEnter","validate"]),w=e(j,["value"]),C=r(null),[B,R]=a(!1),[T,D]=a(""),F=s((()=>{const{type:e,readOnly:t}=j;return{reset:B&&!h&&!!T&&!t,search:"search"===e}}),[j,T,B,h]),K=o((e=>e&&I?"function"==typeof I?I(e):"string"==typeof e?I.test(e)?e:T:e:e),[T,I]),O=o((()=>{const e=j.name;D(""),N&&N("",e),b&&b("",e,!0)}),[j.name,N,b]),S=o((e=>{const{name:t}=e.target;let n=e.target.value;if(n===T)return;"number"==typeof j.value&&(n=Number(n));const r=K(n);N&&N(r,t),j.onChange&&j.onChange(e),D(r),C.current.value=String(r),""===r&&b&&b("",t)}),[T,K,N,j,b]),q=o(((e,t)=>{R(t),t?j.onFocus&&j.onFocus(e):j.onBlur&&j.onBlur(e)}),[j]),_=o((e=>{var t;const{value:n="",name:r}=e.target;x&&x(n,r),null===(t=C.current)||void 0===t||t.blur()}),[x]),k=o((e=>{"Enter"!==e.key||e.nativeEvent.isComposing||_(e),j.onKeyDown&&j.onKeyDown(e)}),[j,_]);return l((()=>{void 0!==j.value&&(D(j.value),C.current.value=String(j.value))}),[j.value]),l((()=>{C.current&&"function"==typeof C.current.scrollTo&&C.current.scrollTo(window.innerWidth,0)}),[F.reset]),c(u,(()=>C.current)),t.createElement("div",{className:f("text-input",d,j.type,{focus:B,filled:!!T,readonly:j.readOnly,disabled:j.disabled,required:j.required,error:p,info:v})},t.createElement("div",{className:f("input-area")},F.search&&t.createElement("span",{className:f("ico-prefix")},y),!F.search&&!!g&&t.createElement("span",{className:f("ico-prefix")},g),F.reset&&t.createElement("button",{className:f("ico-reset"),onMouseDown:O,onTouchStart:O},E),t.createElement("input",Object.assign({ref:C},w,{defaultValue:T,onChange:S,onFocus:e=>q(e,!0),onBlur:e=>q(e,!1),onKeyDown:k}))))}));p.displayName="TextInput";var v=p;export{v as default};