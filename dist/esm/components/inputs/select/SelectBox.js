import e from"@babel/runtime/helpers/slicedToArray";import{__rest as r}from"../../../_virtual/_tslib.js";import n,{forwardRef as o,useRef as l,useState as t,useMemo as a,Children as s,useCallback as c,useEffect as i,useImperativeHandle as u,cloneElement as p}from"react";import d from"../../../hooks/useClickOutside.js";import{makeCxFunc as f}from"../../../utils/forReactUtils.js";import h from"../../noData/NoDataText.js";import v from"../../portal/Portal.js";import m from"../../../assets/svgs/ico-accordion.svg.js";import g from"./SelectBox.module.scss.js";import x from"./SelectDropBox.js";var C=f(g),b=o((function(o,f){var g=o.className,b=void 0===g?"":g,w=o.children,y=o.name,D=o.value,E=o.error,B=o.search,N=o.mobileLabel,j=o.placeholder,k=o.disabled,S=o.readOnly,O=o.dropBoxClassName,P=o.selectArrow,A=void 0===P?n.createElement(m,null):P,L=o.keepDropDown,T=o.searchPlaceholder,F=void 0===T?"Search":T,M=o.showCloseBtn,K=o.whenScrollCloseDropBox,U=o.noDataMsg,_=void 0===U?n.createElement(h,{className:C("no-data")}):U,I=o.onClick,R=o.handleChange,V=r(o,["className","children","name","value","error","search","mobileLabel","placeholder","disabled","readOnly","dropBoxClassName","selectArrow","keepDropDown","searchPlaceholder","showCloseBtn","whenScrollCloseDropBox","noDataMsg","onClick","handleChange"]),q=l(null),z=l(null),G=l(null),H=t(null!=D?D:""),J=e(H,2),Q=J[0],W=J[1],X=t(""),Y=e(X,2),Z=Y[0],$=Y[1],ee=t(""),re=e(ee,2),ne=re[0],oe=re[1],le=t(!1),te=e(le,2),ae=te[0],se=te[1],ce=t(!1),ie=e(ce,2),ue=ie[0],pe=ie[1],de=a((function(){var e=function(e){var r=e.value;k||(W(r),R&&R(r,y),q.current.value=String(r),V.onChange&&V.onChange({target:q.current}),L||se(!1))};return function r(n){return(null!=n?n:[]).flatMap((function(n){var o,l;return(null==n?void 0:n.props)?"Option"===(null===(o=n.type)||void 0===o?void 0:o.displayName)?(n.props.text||(l="string"==typeof n.props.label?n.props.label:"string"==typeof n.props.children?n.props.children:n.props.value.toString()),p(n,Object.assign(Object.assign({},n.props),{text:l.toLowerCase(),selectedValue:Q,searchText:Z,handleChange:e}))):Array.isArray(n.props.children)?r(n.props.children):[]:[]}))}(s.map(w,(function(e){return e})))}),[w,k,R,L,y,Z,Q,V]),fe=a((function(){return de.filter((function(e){return e.props.text.toLowerCase().includes(ne.toLowerCase())}))}),[de,ne]),he=a((function(){return de.find((function(e){return e.props.value===Q||e.props.value===D}))}),[de,Q,D]),ve=a((function(){var e,r,n,o,l;if(!he)return{text:null!==(o=null!==(r=null!=j?j:null===(e=de[0])||void 0===e?void 0:e.props.label)&&void 0!==r?r:null===(n=de[0])||void 0===n?void 0:n.props.children)&&void 0!==o?o:"",isPlaceholder:!!j};var t=he.props,a=t.label,s=t.children;return{text:null!==(l=null!=a?a:s)&&void 0!==l?l:"",isPlaceholder:!1}}),[he,de,j]),me=c((function(){if(I)I();else{if(k||S)return;se((function(e){return!e}))}}),[k,S,I]),ge=c((function(e){$(e),oe(e)}),[]),xe=c((function(){if(ae){var e=de.find((function(e){return e.props.text.includes(Z.toLowerCase())}));e&&(W(e.props.value),R&&R(e.props.value,y),q.current.value=e.props.value,V.onChange&&V.onChange({target:q.current}),se(!1),q.current.blur())}else se(!0)}),[R,V,y,ae,de,Z]),Ce=c((function(e){var r=de.findIndex((function(e){return Z?e.props.text===Z:e.props.value===Q})),n=("down"===e?r+1>=de.length?de[0]:de[r+1]:r<=0?de[de.length-1]:de[r-1]).props.text;$(n)}),[de,Q,Z]),be=c((function(e){"Enter"!==e.key||e.nativeEvent.isComposing?"ArrowDown"===e.key?(Ce("down"),e.preventDefault()):"ArrowUp"===e.key&&(Ce("up"),e.preventDefault()):xe()}),[xe,Ce]),we=c((function(e,r){pe(r),r?V.onFocus&&V.onFocus(e):V.onBlur&&V.onBlur(e)}),[V]);return d(z,(function(e){var r;"button"in e&&2===e.button||(null===(r=G.current)||void 0===r?void 0:r.contains(e.target))||se(!1)}),{offTouchEvent:!0}),i((function(){if(de.length&&!j&&!he){var e=de[0].props.value;W(e)}}),[j,he,de]),i((function(){void 0!==D&&W(D)}),[D]),i((function(){ae||$("")}),[ae]),u(f,(function(){return q.current.handleClickSelectBox=me,q.current})),n.createElement(n.Fragment,null,n.createElement("div",{ref:z,className:C("select-box",b,{open:ae,focus:ue,disabled:k,error:E,readonly:S,placeholder:ve.isPlaceholder,"not-allow":k}),onClick:me},n.createElement("label",null,n.createElement("div",{className:C("value",{placeholder:ve.isPlaceholder})},n.createElement("span",null,ve.text)),n.createElement("input",Object.assign({},V,{ref:q,type:"text",value:Q,name:y,readOnly:!0,onFocus:function(e){return we(e,!0)},onBlur:function(e){return we(e,!1)},onKeyDown:be})),n.createElement("i",{className:C("ico-arrow")},A))),ae&&n.createElement(v,null,n.createElement(x,{ref:G,className:O,label:N,inputEl:q.current,parentEl:z.current,setOpen:se,search:B,searchText:Z,searchPlaceholder:F,showCloseBtn:M,whenScrollCloseDropBox:K,noDataMsg:_,handleSearchTextChange:ge,handleKeyPress:be},fe)))}));b.displayName="SelectBox";var w=b;export{w as default};
