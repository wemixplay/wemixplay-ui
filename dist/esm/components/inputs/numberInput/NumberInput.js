import{__rest as e}from"../../../_virtual/_tslib.js";import r from"decimal.js";import n from"../../../node_modules/lodash/last.js";import t from"../../../node_modules/lodash/replace.js";import o,{forwardRef as u,useRef as l,useState as a,useMemo as i,useCallback as s,useEffect as c,useImperativeHandle as d}from"react";import{makeCxFunc as m}from"../../../utils/forReactUtils.js";import{commaStrToNumber as p,makeParts as v}from"../../../utils/valueParserUtils.js";import w from"../../../assets/svgs/keyboard-arrow-down-2.svg.js";import b from"../../../assets/svgs/keyboard-arrow-up-2.svg.js";import g from"../../ripple/Ripple.js";import f from"./NumberInput.module.scss.js";const h=m(f),E=u(((u,m)=>{var f,{className:E="",step:N=1,error:j,isDirect:y=!0,increaseStep:O,decreaseStep:D,maxLength:S,arrowUpElement:U=o.createElement(b,null),arrowDownElement:C=o.createElement(w,null),rippleOption:M,hideButton:T,handleChange:x,handleEnter:_}=u,R=e(u,["className","step","error","isDirect","increaseStep","decreaseStep","maxLength","arrowUpElement","arrowDownElement","rippleOption","hideButton","handleChange","handleEnter"]);const{value:k,readOnly:B,disabled:W,min:P,max:F="9999999999999",digit:I=18,onFocus:L,onBlur:$}=R,q=l(),z=l(!1),A=l(),G=l(),H=l(),J=l(0),K=l(0),Q=l(1e3),[V,X]=a(null!=k?k:""),[Y,Z]=a(!1),ee=i((()=>W||new r(null!=P?P:0).cmp(new r(F))>0),[W,F,P]),re=s(((e,n,t)=>{var o,u,l,a,i,s;return"up"===t?new r(e||0).add(new r(null!==(l=null!==(u=null===(o=G.current)||void 0===o?void 0:o.increase)&&void 0!==u?u:n)&&void 0!==l?l:1)).toDP(I,r.ROUND_DOWN).toString():new r(e||0).sub(new r(null!==(s=null!==(i=null===(a=G.current)||void 0===a?void 0:a.decrease)&&void 0!==i?i:n)&&void 0!==s?s:1)).toDP(I,r.ROUND_DOWN).toString()}),[I]),ne=s((e=>void 0===e||!e||ee?"":e.endsWith(".")?e:void 0!==P&&new r(Number(e)).lt(new r(P))?String(P):void 0!==F&&new r(p(e||"")).gt(new r(F))?String(F):e),[P,F,ee]),te=s((e=>ee?"":e.endsWith(".")?e:ne(e)),[ee,ne]),oe=s((e=>{let{type:r,e:o}=e;if(!q.current||ee)return;const{value:u,name:l}=q.current,a=(e=>{var r;const o=null===(r=null==e?void 0:e.target)||void 0===r?void 0:r.value;return t(o,/^0+[\d,]/gm,(e=>n(e))).replace(/[^\d.-]/g,"")})({target:{value:u}}),i=I?new RegExp("^[0-9]*[.]{0,1}[0-9]{0,".concat(I,"}$"),"gm"):/^\d{0,18}$/;a.match(i)&&(void 0!==S&&(a||"").split(".")[0].replace(/[^0-9]/g,"").length>Number(S)||(q.current.value=v(null!=a?a:"").join("."),A.current!==a&&(x&&x(a,l,{type:r}),o&&R.onChange&&R.onChange(o),A.current=a),X(a)))}),[ee,I,S,x,R]),ue=s(((e,r)=>{q.current&&(Z(r),r?L&&L(e):(q.current.value=te(q.current.value),oe({}),$&&$(e)))}),[L,te,oe,$]),le=s((e=>{var r,n;if(ee||B)return z.current=!1,void window.clearTimeout(J.current);A.current=re(null!==(r=A.current)&&void 0!==r?r:"0",H.current,e),A.current=ne(null!==(n=A.current)&&void 0!==n?n:"0"),X(String(A.current)),x&&x(A.current,R.name,{type:e}),z.current&&(window.clearTimeout(K.current),K.current=window.setTimeout((()=>{le(e),Q.current>100&&(Q.current-=Q.current/5)}),Q.current))}),[re,ne,ee,x,R.name,B]),ae=s((e=>{if(ee||B)return z.current=!1,void window.clearTimeout(J.current);J.current=window.setTimeout((()=>{z.current=!0,le(e)}),500)}),[ee,le,B]),ie=s((e=>{if(ee||B)return z.current=!1,void window.clearTimeout(J.current);z.current=!1,Q.current=500,window.clearTimeout(J.current),e&&oe({type:e})}),[ee,oe,B]);return c((()=>{void 0!==k&&X(k)}),[k]),c((()=>{H.current=N}),[N]),c((()=>{G.current={increase:O,decrease:D}}),[O,D]),d(m,(()=>q.current)),o.createElement("div",{className:h("number-input",E,{focus:Y,readonly:B,disabled:W,error:j})},o.createElement("div",{className:h("number-inp-cont")},o.createElement("input",Object.assign({},R,{ref:m||q,type:"text",inputMode:"decimal",value:null!==(f=v(null!=V?V:"").join("."))&&void 0!==f?f:"",readOnly:!y,onChange:e=>oe({e:e}),onFocus:e=>ue(e,!0),onBlur:e=>ue(e,!1)})),!T&&o.createElement("div",{className:h("number-btn-area")},o.createElement(g,Object.assign({},M,{disabled:ee||(null==M?void 0:M.disabled)}),o.createElement("button",{"data-type":"up",className:h("number-btn","up"),disabled:ee||F===V,onMouseDown:()=>ae("up"),onMouseUp:()=>ie("up"),onMouseOut:()=>ie(),onClick:()=>le("up")},U)),o.createElement(g,Object.assign({},M,{disabled:ee||(null==M?void 0:M.disabled)}),o.createElement("button",{"data-type":"down",className:h("number-btn","down"),disabled:ee||P===V,onMouseDown:()=>ae("down"),onMouseUp:()=>ie("down"),onMouseOut:()=>ie(),onClick:()=>le("down")},C)))))}));E.displayName="NumberInput";var N=E;export{N as default};
