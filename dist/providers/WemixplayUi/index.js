"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("./wemixplay-ui.module.scss.js");const a=require("../../utils/forReactUtils.js").makeCxFunc(t),s={theme:"light",setThemeData:e=>{}},r=e.createContext(s);var i=t=>{let{children:i,theme:c}=t;const[m,o]=e.useState(c),l=e.useMemo((()=>Object.assign(Object.assign({},s),{theme:m,setThemeData:o})),[m,o]);return e.useEffect((()=>{const e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;o(void 0===c?e?"dark":"light":c)}),[c]),e.createElement(r.Provider,{value:l},e.createElement("div",{className:a("wemixplay-ui"),"data-theme":m},i))};exports.WemixplayUIContext=r,exports.default=i;
