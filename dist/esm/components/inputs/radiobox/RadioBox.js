import{__rest as e}from"../../../_virtual/_tslib.js";import a,{forwardRef as l,useRef as n,useMemo as r,useCallback as t,useImperativeHandle as o}from"react";import i from"./RadioBox.module.scss.js";import{makeCxFunc as c}from"../../../utils/forReactUtils.js";var s=c(i),d=l((function(l,i){var c=l.className,d=void 0===c?"":c,u=l.children,m=l.size,v=void 0===m?"normal":m,h=l.checkValue,f=l.value,p=l.handleChange,b=e(l,["className","children","size","checkValue","value","handleChange"]),N=n(null),g=r((function(){if(f)return f===h}),[f,h]),y=t((function(e){var a=e.target,l=a.name,n=a.value;("number"==typeof h?Number(n)===h:n===h)&&p&&p(h,l),b.onChange&&b.onChange(e)}),[p,b,h]);return o(i,(function(){return N.current})),a.createElement("div",{className:s("radio-box",d,v,{readonly:null==b?void 0:b.readOnly,disabled:null==b?void 0:b.disabled,"not-allow":(null==b?void 0:b.readOnly)||(null==b?void 0:b.disabled),checked:g})},a.createElement("label",null,a.createElement("input",Object.assign({ref:N},b,{type:"radio",value:h,checked:g,onChange:y})),a.createElement("span",{className:s("ico-check")},a.createElement("i",{className:s("icon")})),a.createElement("span",{className:s("text")},u)))}));d.displayName="RadioBox";var u=d;export{u as default};
