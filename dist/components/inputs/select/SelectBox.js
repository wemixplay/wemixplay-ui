"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),r=require("../../../_virtual/_tslib.js"),n=require("react"),l=require("../../../hooks/useClickOutside.js"),t=require("../../../utils/forReactUtils.js"),o=require("../../noData/NoDataText.js"),a=require("../../portal/Portal.js"),s=require("../../../assets/svgs/ico-accordion.svg.js"),u=require("./SelectBox.module.scss.js"),c=require("./SelectDropBox.js"),i=t.makeCxFunc(u),p=n.forwardRef((function(t,u){var p=t.className,d=void 0===p?"":p,f=t.children,h=t.name,v=t.value,m=t.error,C=t.search,b=t.mobileLabel,g=t.placeholder,x=t.disabled,w=t.readOnly,E=t.dropBoxClassName,k=t.selectArrow,y=void 0===k?n.createElement(s,null):k,D=t.keepDropDown,S=t.searchPlaceholder,B=void 0===S?"Search":S,N=t.showCloseBtn,j=t.whenScrollCloseDropBox,q=t.noDataMsg,O=void 0===q?n.createElement(o,{className:i("no-data")}):q,P=t.onClick,M=t.handleChange,A=r.__rest(t,["className","children","name","value","error","search","mobileLabel","placeholder","disabled","readOnly","dropBoxClassName","selectArrow","keepDropDown","searchPlaceholder","showCloseBtn","whenScrollCloseDropBox","noDataMsg","onClick","handleChange"]),L=n.useRef(null),T=n.useRef(null),F=n.useRef(null),R=n.useState(null!=v?v:""),_=e(R,2),I=_[0],K=_[1],U=n.useState(""),H=e(U,2),V=H[0],z=H[1],G=n.useState(""),J=e(G,2),Q=J[0],W=J[1],X=n.useState(!1),Y=e(X,2),Z=Y[0],$=Y[1],ee=n.useState(!1),re=e(ee,2),ne=re[0],le=re[1],te=n.useMemo((function(){var e=function(e){var r=e.value;x||(K(r),M&&M(r,h),L.current.value=String(r),A.onChange&&A.onChange({target:L.current}),D||$(!1))},r=function(l){return(null!=l?l:[]).flatMap((function(l){var t,o;return(null==l?void 0:l.props)?"Option"===(null===(t=l.type)||void 0===t?void 0:t.displayName)?(l.props.text||(o="string"==typeof l.props.label?l.props.label:"string"==typeof l.props.children?l.props.children:l.props.value.toString()),n.cloneElement(l,Object.assign(Object.assign({},l.props),{text:o.toLowerCase(),selectedValue:I,searchText:V,handleChange:e}))):Array.isArray(l.props.children)?r(l.props.children):[]:[]}))},l=n.Children.map(f,(function(e){return e}));return r(l)}),[f,x,M,D,h,V,I,A]),oe=n.useMemo((function(){return te.filter((function(e){return e.props.text.toLowerCase().includes(Q.toLowerCase())}))}),[te,Q]),ae=n.useMemo((function(){return te.find((function(e){return e.props.value===I||e.props.value===v}))}),[te,I,v]),se=n.useMemo((function(){var e,r,n,l,t;if(!ae)return{text:null!==(l=null!==(r=null!=g?g:null===(e=te[0])||void 0===e?void 0:e.props.label)&&void 0!==r?r:null===(n=te[0])||void 0===n?void 0:n.props.children)&&void 0!==l?l:"",isPlaceholder:!!g};var o=ae.props,a=o.label,s=o.children;return{text:null!==(t=null!=a?a:s)&&void 0!==t?t:"",isPlaceholder:!1}}),[ae,te,g]),ue=n.useCallback((function(){if(P)P();else{if(x||w)return;$((function(e){return!e}))}}),[x,w,P]),ce=n.useCallback((function(e){z(e),W(e)}),[]),ie=n.useCallback((function(){if(Z){var e=te.find((function(e){return e.props.text.includes(V.toLowerCase())}));e&&(K(e.props.value),M&&M(e.props.value,h),L.current.value=e.props.value,A.onChange&&A.onChange({target:L.current}),$(!1),L.current.blur())}else $(!0)}),[M,A,h,Z,te,V]),pe=n.useCallback((function(e){var r=te.findIndex((function(e){return V?e.props.text===V:e.props.value===I})),n=("down"===e?r+1>=te.length?te[0]:te[r+1]:r<=0?te[te.length-1]:te[r-1]).props.text;z(n)}),[te,I,V]),de=n.useCallback((function(e){"Enter"!==e.key||e.nativeEvent.isComposing?"ArrowDown"===e.key?(pe("down"),e.preventDefault()):"ArrowUp"===e.key&&(pe("up"),e.preventDefault()):ie()}),[ie,pe]),fe=n.useCallback((function(e,r){le(r),r?A.onFocus&&A.onFocus(e):A.onBlur&&A.onBlur(e)}),[A]);return l(T,(function(e){var r;"button"in e&&2===e.button||(null===(r=F.current)||void 0===r?void 0:r.contains(e.target))||$(!1)}),{offTouchEvent:!0}),n.useEffect((function(){if(te.length&&!g&&!ae){var e=te[0].props.value;K(e)}}),[g,ae,te]),n.useEffect((function(){void 0!==v&&K(v)}),[v]),n.useEffect((function(){Z||z("")}),[Z]),n.useImperativeHandle(u,(function(){return L.current.handleClickSelectBox=ue,L.current})),n.createElement(n.Fragment,null,n.createElement("div",{ref:T,className:i("select-box",d,{open:Z,focus:ne,disabled:x,error:m,readonly:w,placeholder:se.isPlaceholder,"not-allow":x}),onClick:ue},n.createElement("label",null,n.createElement("div",{className:i("value",{placeholder:se.isPlaceholder})},n.createElement("span",null,se.text)),n.createElement("input",Object.assign({},A,{ref:L,type:"text",value:I,name:h,readOnly:!0,onFocus:function(e){return fe(e,!0)},onBlur:function(e){return fe(e,!1)},onKeyDown:de})),n.createElement("i",{className:i("ico-arrow")},y))),Z&&n.createElement(a,null,n.createElement(c,{ref:F,className:E,label:b,inputEl:L.current,parentEl:T.current,setOpen:$,search:C,searchText:V,searchPlaceholder:B,showCloseBtn:N,whenScrollCloseDropBox:j,noDataMsg:O,handleSearchTextChange:ce,handleKeyPress:de},oe)))}));p.displayName="SelectBox",module.exports=p;
