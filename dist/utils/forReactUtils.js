"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),r=require("@babel/runtime/helpers/typeof"),t=require("clsx");exports.makeCxFunc=function(n){return function(){for(var i=arguments.length,u=new Array(i),c=0;c<i;c++)u[c]=arguments[c];var o=u.reduce((function(t,i,c){if("string"==typeof i)t+="".concat(i," "),u[c]=n[i];else if("object"===r(i)){var o={};t+=Object.entries(i).reduce((function(r,t){var i=e(t,2),u=i[0],c=i[1];return o[n[u]]=!!c,c&&(r+=" ".concat(u)),r}),""),u[c]=o}return t}),"");u.push(n["wm-ui"]);var a="".concat(o," ").concat(t(u)," wm-ui").trim().split(" ");return a.filter((function(e,r){return a.indexOf(e)===r})).join(" ")}};
