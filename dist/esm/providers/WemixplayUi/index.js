import e,{createContext as t,useState as a,useMemo as m,useEffect as i}from"react";import s from"./wemixplay-ui.module.scss.js";import r from'./../../ext/classnames/bind.js';const o=r.bind(s),d={theme:"light",setThemeData:e=>{}},c=t(d);var l=t=>{let{children:s,theme:r}=t;const[l,n]=a(r),h=m((()=>Object.assign(Object.assign({},d),{theme:l,setThemeData:n})),[l,n]);return i((()=>{const e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;n(void 0===r?e?"dark":"light":r)}),[r]),e.createElement(c.Provider,{value:h},e.createElement("div",{id:"wemixplay-ui",className:o("wemixplay-ui"),"data-theme":l},s))};export{c as WemixplayUIContext,l as default};
