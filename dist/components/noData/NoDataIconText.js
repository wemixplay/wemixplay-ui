"use strict";var e=require("react"),t=require("../../utils/forReactUtils.js"),a=require("../../assets/svgs/ico-play-logo.svg.js"),s=require("./NoData.module.scss.js");const l=t.makeCxFunc(s);var r=t=>{let{className:s,nullText:r="no data",icon:c=e.createElement(a,null),style:n}=t;return e.createElement("div",{className:l("no-data",s),style:n},e.createElement("i",{className:l("no-data-icon")},c),"object"==typeof r?e.createElement("p",{className:l("no-data-text")},r):e.createElement("p",{className:l("no-data-text"),dangerouslySetInnerHTML:{__html:r}}))};module.exports=r;