"use strict";var e=require("@babel/runtime/helpers/typeof"),t=require("react"),a=require("../../utils/forReactUtils.js"),s=require("../../assets/svgs/ico-play-logo.svg.js"),r=require("./NoData.module.scss.js"),l=a.makeCxFunc(r);module.exports=function(a){var r=a.className,n=a.nullText,o=void 0===n?"no data":n,c=a.icon,i=void 0===c?t.createElement(s,null):c,u=a.style;return t.createElement("div",{className:l("no-data",r),style:u},t.createElement("i",{className:l("no-data-icon")},i),"object"===e(o)?t.createElement("p",{className:l("no-data-text")},o):t.createElement("p",{className:l("no-data-text"),dangerouslySetInnerHTML:{__html:o}}))};
