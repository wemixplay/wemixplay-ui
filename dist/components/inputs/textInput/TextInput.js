"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),n=require("../../../_virtual/_tslib.js"),r=require("react"),t=require("../../../utils/forReactUtils.js"),a=require("../../../assets/svgs/ico-input-reset.svg.js"),s=require("../../../assets/svgs/ico-search-default.svg.js"),u=require("./TextInput.module.scss.js"),l=t.makeCxFunc(u),o=r.forwardRef((function(t,u){var o=t.className,c=void 0===o?"":o,i=t.error,f=t.info,d=t.hideBtnReset,v=t.prefixIcon,m=t.searchIcon,h=void 0===m?r.createElement(s,null):m,p=t.resetIcon,g=void 0===p?r.createElement(a,null):p,b=t.handleChange,y=t.handleReset,E=t.handleEnter,C=t.validate,q=n.__rest(t,["className","error","info","hideBtnReset","prefixIcon","searchIcon","resetIcon","handleChange","handleReset","handleEnter","validate"]),x=n.__rest(q,["value"]),I=r.useRef(null),N=r.useState(!1),k=e(N,2),w=k[0],R=k[1],j=r.useState(""),T=e(j,2),_=T[0],B=T[1],S=r.useMemo((function(){var e=q.type,n=q.readOnly;return{reset:w&&!d&&!!_&&!n,search:"search"===e}}),[q,_,w,d]),D=r.useCallback((function(e){return e&&C?"function"==typeof C?C(e):"string"==typeof e?C.test(e)?e:_:e:e}),[_,C]),F=r.useCallback((function(){var e=q.name;B(""),b&&b("",e),y&&y("",e,!0)}),[q.name,b,y]),K=r.useCallback((function(e){var n=e.target.name,r=e.target.value;if(r!==_){"number"==typeof q.value&&(r=Number(r));var t=D(r);b&&b(t,n),q.onChange&&q.onChange(e),B(t),I.current.value=String(t),""===t&&y&&y("",n)}}),[_,D,b,q,y]),O=r.useCallback((function(e,n){R(n),n?q.onFocus&&q.onFocus(e):q.onBlur&&q.onBlur(e)}),[q]),M=r.useCallback((function(e){var n,r=e.target,t=r.value,a=void 0===t?"":t,s=r.name;E&&E(a,s),null===(n=I.current)||void 0===n||n.blur()}),[E]),A=r.useCallback((function(e){"Enter"!==e.key||e.nativeEvent.isComposing||M(e),q.onKeyDown&&q.onKeyDown(e)}),[q,M]);return r.useEffect((function(){void 0!==q.value&&(B(q.value),I.current.value=String(q.value))}),[q.value]),r.useEffect((function(){I.current&&"function"==typeof I.current.scrollTo&&I.current.scrollTo(window.innerWidth,0)}),[S.reset]),r.useImperativeHandle(u,(function(){return I.current})),r.createElement("div",{className:l("text-input",c,q.type,{focus:w,filled:!!_,readonly:q.readOnly,disabled:q.disabled,required:q.required,error:i,info:f})},r.createElement("div",{className:l("input-area")},S.search&&r.createElement("span",{className:l("ico-prefix")},h),!S.search&&!!v&&r.createElement("span",{className:l("ico-prefix")},v),S.reset&&r.createElement("button",{className:l("ico-reset"),onMouseDown:F,onTouchStart:F},g),r.createElement("input",Object.assign({ref:I},x,{defaultValue:_,onChange:K,onFocus:function(e){return O(e,!0)},onBlur:function(e){return O(e,!1)},onKeyDown:A}))))}));o.displayName="TextInput";var c=o;module.exports=c;
