"use strict";var e=require("react"),a=require("../../utils/forReactUtils.js"),t=require("./NoData.module.scss.js"),s=a.makeCxFunc(t);module.exports=function(a){var t=a.className,r=a.nullText,l=void 0===r?"no data":r,o=a.style,c=void 0===o?{paddingTop:8}:o;return e.createElement("div",{className:s("no-data",t),style:c},e.createElement("p",{className:s("no-data-text")},l))};
