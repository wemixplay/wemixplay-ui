import{__rest as e}from"../../../_virtual/_tslib.js";import t,{forwardRef as r,useRef as a,useState as n,useCallback as l,useEffect as s,useImperativeHandle as o}from"react";import{makeCxFunc as c}from"../../../utils/forReactUtils.js";import{commaWithValue as u}from"../../../utils/valueParserUtils.js";import m from"./TextArea.module.scss.js";const i=c(m),v=r(((r,c)=>{var{className:m="",value:v,maxLength:g,error:h,info:f,handleChange:p}=r,x=e(r,["className","value","maxLength","error","info","handleChange"]);const d=a(),[E,b]=n(0),j=l((e=>{const{value:t,name:r}=e.target;p&&p(t,r),x.onChange&&x.onChange(e),b(t.length)}),[p,x]);return s((()=>{var e;d.current&&b((null!==(e=d.current.value)&&void 0!==e?e:"").length)}),[]),s((()=>{d.current&&d.current.value.length>g&&(d.current.value=d.current.value.slice(0,g),dispatchEvent(new Event("change",{bubbles:!0})))}),[g]),o(c,(()=>d.current)),t.createElement("div",{className:i(m,"text-area",{error:h})},t.createElement("textarea",Object.assign({ref:d},x,{maxLength:g,onChange:j})),!!g&&t.createElement("p",{className:i("text-count")},t.createElement("strong",null,u(E)),"/",u(g)))}));v.displayName="TextArea";var g=v;export{g as default};
