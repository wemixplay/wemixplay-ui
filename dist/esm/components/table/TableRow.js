import e from"@babel/runtime/helpers/slicedToArray";import r from"@babel/runtime/regenerator";import{__awaiter as n}from"../../_virtual/_tslib.js";import t,{useRef as a,useState as i,useCallback as o,useMemo as l,useEffect as s}from"react";import{makeCxFunc as c}from"../../utils/forReactUtils.js";import{wait as p}from"../../utils/etcUtils.js";import u from"./Table.module.scss.js";var d=c(u),f=function(c){var u=c.className,f=void 0===u?"":u,m=c.children,v=c.expendOpen,b=void 0!==v&&v,x=c.handleExpendChange,h=c.beforeExpendOpen,y=c.onClick,g=a(null),A=i(b),j=e(A,2),E=j[0],N=j[1],O=o((function(e){if(g.current){var r="boolean"==typeof e?e:!E,n=g.current.firstChild;n&&(n.style.maxHeight=r?"".concat(n.scrollHeight,"px"):"0px")}}),[g,E]),T=o((function(){return n(void 0,void 0,void 0,r.mark((function e(){return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!h||E){e.next=6;break}return e.next=4,h();case 4:return e.next=6,p(10);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0);case 11:return e.prev=11,N(!E),x&&x(!E),e.finish(11);case 15:case"end":return e.stop()}}),e,null,[[0,8,11,15]])})))}),[E,x,h]),k=l((function(){var e=function(r){return r.flatMap((function(r){var n;return(null==r?void 0:r.props)?"TdColumn"===(null===(n=r.type)||void 0===n?void 0:n.displayName)?Object.assign(Object.assign({},r),{props:Object.assign(Object.assign({},r.props),{handleExpendToggle:T,expendOpen:b})}):Array.isArray(r.props.children)?e(r.props.children):[]:[]}))},r=Array.isArray(m)?m:[m];return e(r)}),[m,b,T]),C=l((function(){var e=function(r){return r.flatMap((function(r){var n;if(null==r?void 0:r.props)return"TdExpend"===(null===(n=r.type)||void 0===n?void 0:n.displayName)?r:Array.isArray(r.props.children)?e(r.props.children):void 0}))},r=Array.isArray(m)?m:[m];return e(r).filter((function(e){return e}))[0]}),[m]);return s((function(){O(E)}),[E,O]),s((function(){void 0!==b&&N(b)}),[b]),t.createElement(t.Fragment,null,t.createElement("tr",{className:d(f,"table-row"),onClick:y},k),!!C&&t.createElement("tr",{className:d("expend-tr")},t.createElement("td",{ref:g,className:d("expend-table-cell",{open:E}),colSpan:k.length},C)))};f.displayName="TableRow";export{f as default};
