import e from"decimal.js";import t,{useMemo as l,useCallback as n}from"react";import{makeCxFunc as a}from"../../utils/forReactUtils.js";import r from"../../assets/svgs/ico-chevron-left.svg.js";import m from"../../assets/svgs/ico-chevron-right.svg.js";import i from"../../assets/svgs/ico-pagination-ellipsis.svg.js";import c from"./Pagination.module.scss.js";const s=a(c);var o=a=>{let{currPage:c=1,pageSize:o=20,totalCount:u=0,handlePageChange:p}=a;const g=l((()=>{const t=new e(u).div(new e(o));return t.isInt()?t.toNumber():t.add(1).floor().toNumber()}),[o,u]),E=n((()=>g<8?t.createElement(t.Fragment,null,Array.from({length:g},((e,t)=>t+1)).map((e=>t.createElement("li",{key:e},t.createElement("button",{className:s("pagination-page",c===e&&"selected"),type:"button",onClick:()=>p(e)},e))))):c<5?t.createElement(t.Fragment,null,Array.from({length:5},((e,t)=>t+1)).map((e=>t.createElement("li",{key:e},t.createElement("button",{className:s("pagination-page",c===e&&"selected"),type:"button",onClick:()=>p(e)},e)))),t.createElement("li",null,t.createElement("div",{className:"ellipsis"},t.createElement(i,null))),t.createElement("li",null,t.createElement("button",{className:s("pagination-page"),type:"button",onClick:()=>p(g)},g))):c>g-4?t.createElement(t.Fragment,null,t.createElement("li",null,t.createElement("button",{className:s("pagination-page"),type:"button",onClick:()=>p(1)},"1")),t.createElement("li",null,t.createElement("div",{className:"ellipsis"},t.createElement(i,null))),Array.from({length:5},((e,t)=>g-4+t)).map((e=>t.createElement("li",{key:e},t.createElement("button",{className:s("pagination-page",c===e&&"selected"),type:"button",onClick:()=>p(e)},e))))):t.createElement(t.Fragment,null,t.createElement("li",null,t.createElement("button",{className:s("pagination-page"),type:"button",onClick:()=>p(1)},"1")),t.createElement("li",null,t.createElement("div",{className:"ellipsis"},t.createElement(i,null))),Array.from({length:3},((e,t)=>c-1+t)).map((e=>t.createElement("li",{key:e},t.createElement("button",{className:s("pagination-page",c===e&&"selected"),type:"button",onClick:()=>p(e)},e)))),t.createElement("li",null,t.createElement("div",{className:"ellipsis"},t.createElement(i,null))),t.createElement("li",null,t.createElement("button",{className:s("pagination-page"),type:"button",onClick:()=>p(g)},g)))),[c,p,g]);return t.createElement("ul",{className:s("inbox-pagination")},t.createElement("li",null,t.createElement("button",{className:s("pagination-prev"),type:"button",disabled:1===c,onClick:()=>p(c-1)},t.createElement(r,null))),t.createElement(E,null),t.createElement("li",null,t.createElement("button",{className:s("pagination-next"),type:"button",disabled:!(c<g),onClick:()=>p(c+1)},t.createElement(m,null))))};export{o as default};
