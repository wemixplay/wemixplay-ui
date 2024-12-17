"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),t=require("react"),a=require("../../utils/forReactUtils.js"),n=require("./AvatarGroup.module.scss.js"),r=require("./Person.js"),i={xsmall:12,small:24,medium:40,large:56,xlarge:72},s=a.makeCxFunc(n);module.exports=function(a){var n=a.className,c=void 0===n?"":n,o=a.list,u=a.avatarSize,l=void 0===u?"small":u,m=a.avatarCustomSize,v=void 0===m?30:m,d=a.showCnt,f=void 0===d?4:d,h=a.avatarHideRatio,g=void 0===h?.6:h,x=a.rotateDuration,S=void 0===x?5e3:x,p=t.useState([]),w=e(p,2),z=w[0],E=w[1],b="custom"===l?v:i[l],j=t.useMemo((function(){return(null!=o?o:[]).length>=3&&!!S}),[o,S]),C=t.useMemo((function(){return o?o.length>f||!j?f:o.length-1:0}),[o,f,j]),q=t.useMemo((function(){var e=b*g;return{avatarShowSize:e,containerWidth:e*(C-1)+b,containerHeight:i[l]}}),[g,C,b]),y=t.useCallback((function(){if(g<=0||g>=1)throw new Error("[AvatarGroup] avatarHideRatio는 0보다 크고 1보다 작아야 합니다.");if(f<2)throw new Error("[AvatarGroup] showCnt는 2 이상 이어야 합니다.")}),[g,f]),O=t.useCallback((function(e){return j?0===e?"translateX(".concat(q.avatarShowSize*C,"px) scale(0)"):"translateX(".concat(q.avatarShowSize*(e-1),"px) scale(").concat(C+1===e?0:1,")"):"translateX(".concat(q.avatarShowSize*e,"px) scale(1)")}),[C,j,q.avatarShowSize]);return t.useEffect((function(){if(j){var e=setInterval((function(){E((function(e){return e.map((function(t){return Object.assign(Object.assign({},t),{index:0===t.index?e.length-1:t.index-1})}))}))}),S);return function(){clearInterval(e)}}}),[j,S]),t.useEffect((function(){o&&o.length&&E(o.map((function(e,t){return"string"==typeof e?{src:e,size:b,index:t}:Object.assign(Object.assign({},e),{size:b,index:t})})))}),[o,b,f]),t.useEffect((function(){y()}),[y]),t.createElement("div",{className:s(c,"multiple-avatars")},t.createElement("div",{className:s("avatars-area"),style:{width:q.containerWidth,height:q.containerHeight}},z.map((function(e,a){return e.index<=f+1?t.createElement("div",{key:"".concat(e,"-").concat(a),className:s("avatar-item"),style:{transform:O(e.index),zIndex:e.index}},t.createElement(r,Object.assign({},e,{customSize:b}))):t.createElement(t.Fragment,null)}))))};