import e,{createContext as t,useState as a,useMemo as m,useEffect as s}from"react";import i from"./wemixplay-ui.module.scss.js";import r from'./../../ext/classnames/bind.js';const o=r.bind(i),c={theme:"light",setThemeData:e=>{}},d=t(c);var l=t=>{let{children:i,theme:r}=t;const[l,n]=a(r),h=m((()=>Object.assign(Object.assign({},c),{theme:l,setThemeData:n})),[l,n]);return s((()=>{const e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;n(void 0===r?e?"dark":"light":r)}),[r]),e.createElement(d.Provider,{value:h},e.createElement("div",{className:o("wemixplay-ui"),"data-theme":l},i))};export{d as WemixplayUIContext,l as default};
