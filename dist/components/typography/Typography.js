"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("../../utils/forReactUtils.js"),a=require("./Typography.module.scss.js");const s=t.makeCxFunc(a),r=t=>{let{className:a,tag:r="span",hLevel:c=1,type:n,color:o,children:l}=t;return e.createElement("h"===r?"".concat(r).concat(c):r,{className:s("typography",a,n),style:{color:o?"var(--wp-semantic-".concat(o,")"):void 0}},l)},c=t=>e.createElement(r,Object.assign({},t,{tag:"h"})),n=t=>e.createElement(r,Object.assign({},t,{tag:"p"})),o=t=>e.createElement(r,Object.assign({},t,{tag:"span"})),l=t=>e.createElement(r,Object.assign({},t,{tag:"font"})),p=t=>e.createElement(r,Object.assign({},t,{tag:"label"}));r.H=c,r.P=n,r.Span=o,r.Font=l,r.Label=p;var i=r;exports.Font=l,exports.H=c,exports.Label=p,exports.P=n,exports.Span=o,exports.default=i;
