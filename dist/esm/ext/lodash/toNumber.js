import{_ as r}from"./_baseTrim.js";import{i as t}from"./isObject.js";import{i}from"./isSymbol.js";var e=r,s=t,a=i,f=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,n=/^0o[0-7]+$/i,m=parseInt;var u=function(r){if("number"==typeof r)return r;if(a(r))return NaN;if(s(r)){var t="function"==typeof r.valueOf?r.valueOf():r;r=s(t)?t+"":t}if("string"!=typeof r)return 0===r?r:+r;r=e(r);var i=o.test(r);return i||n.test(r)?m(r.slice(2),i?2:8):f.test(r)?NaN:+r};export{u as t};