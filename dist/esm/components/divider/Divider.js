import e from"@babel/runtime/helpers/defineProperty";import t from"react";import o from"./Divider.module.scss.js";import{makeCxFunc as i}from"../../utils/forReactUtils.js";var n=i(o),c=function(o){var i=o.className,c=o.type,r=void 0===c?"horizontal":c,a=o.variant,s=void 0===a?"solid":a,l=o.color,d=o.size,m=void 0===d?1:d,p=o.spaceSize,v=o.spaceDirection,f=void 0===v?"both":v,z=o.contentAlign,h=void 0===z?"center":z,u=o.contentSpace,b=void 0===u?12:u,y=o.contentPosition,g=o.children,j=o.style;return t.createElement("div",{className:n("divider",i,r,s,f,e(e(e(e({},"size-".concat(m),m),"space-size-".concat(p),p),"content-align-".concat(h),"horizontal"===r&&h),"content-position-".concat(y),"horizontal"===r&&"number"==typeof y)),style:Object.assign(Object.assign({},j),{"--divider-color":l})},!!g&&"horizontal"===r&&t.createElement("div",{className:n("divider-content",e({},"content-space-".concat(b),b))},g))};export{c as default};
