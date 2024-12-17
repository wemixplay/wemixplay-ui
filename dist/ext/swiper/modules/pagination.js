"use strict";var a=require("../shared/classes-to-selector.js"),e=require("../shared/create-element-if-not-defined.js"),s=require("../shared/utils.js");module.exports=function(l){let{swiper:t,extendParams:i,on:n,emit:r}=l;const o="swiper-pagination";let p;i({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:a=>a,formatFractionTotal:a=>a,bulletClass:`${o}-bullet`,bulletActiveClass:`${o}-bullet-active`,modifierClass:`${o}-`,currentClass:`${o}-current`,totalClass:`${o}-total`,hiddenClass:`${o}-hidden`,progressbarFillClass:`${o}-progressbar-fill`,progressbarOppositeClass:`${o}-progressbar-opposite`,clickableClass:`${o}-clickable`,lockClass:`${o}-lock`,horizontalClass:`${o}-horizontal`,verticalClass:`${o}-vertical`,paginationDisabledClass:`${o}-disabled`}}),t.pagination={el:null,bullets:[]};let c=0;function d(){return!t.params.pagination.el||!t.pagination.el||Array.isArray(t.pagination.el)&&0===t.pagination.el.length}function u(a,e){const{bulletActiveClass:s}=t.params.pagination;a&&(a=a[("prev"===e?"previous":"next")+"ElementSibling"])&&(a.classList.add(`${s}-${e}`),(a=a[("prev"===e?"previous":"next")+"ElementSibling"])&&a.classList.add(`${s}-${e}-${e}`))}function g(e){const l=e.target.closest(a.c(t.params.pagination.bulletClass));if(!l)return;e.preventDefault();const i=s.h(l)*t.params.slidesPerGroup;if(t.params.loop){if(t.realIndex===i)return;const a=(n=t.realIndex,r=i,o=t.slides.length,(r%=o)==1+(n%=o)?"next":r===n-1?"previous":void 0);"next"===a?t.slideNext():"previous"===a?t.slidePrev():t.slideToLoop(i)}else t.slideTo(i);var n,r,o}function m(){const e=t.rtl,l=t.params.pagination;if(d())return;let i,n,o=t.pagination.el;o=s.m(o);const g=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,m=t.params.loop?Math.ceil(g/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(n=t.previousRealIndex||0,i=t.params.slidesPerGroup>1?Math.floor(t.realIndex/t.params.slidesPerGroup):t.realIndex):void 0!==t.snapIndex?(i=t.snapIndex,n=t.previousSnapIndex):(n=t.previousIndex||0,i=t.activeIndex||0),"bullets"===l.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const a=t.pagination.bullets;let r,d,g;if(l.dynamicBullets&&(p=s.f(a[0],t.isHorizontal()?"width":"height"),o.forEach((a=>{a.style[t.isHorizontal()?"width":"height"]=p*(l.dynamicMainBullets+4)+"px"})),l.dynamicMainBullets>1&&void 0!==n&&(c+=i-(n||0),c>l.dynamicMainBullets-1?c=l.dynamicMainBullets-1:c<0&&(c=0)),r=Math.max(i-c,0),d=r+(Math.min(a.length,l.dynamicMainBullets)-1),g=(d+r)/2),a.forEach((a=>{const e=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((a=>`${l.bulletActiveClass}${a}`))].map((a=>"string"==typeof a&&a.includes(" ")?a.split(" "):a)).flat();a.classList.remove(...e)})),o.length>1)a.forEach((a=>{const e=s.h(a);e===i?a.classList.add(...l.bulletActiveClass.split(" ")):t.isElement&&a.setAttribute("part","bullet"),l.dynamicBullets&&(e>=r&&e<=d&&a.classList.add(...`${l.bulletActiveClass}-main`.split(" ")),e===r&&u(a,"prev"),e===d&&u(a,"next"))}));else{const e=a[i];if(e&&e.classList.add(...l.bulletActiveClass.split(" ")),t.isElement&&a.forEach(((a,e)=>{a.setAttribute("part",e===i?"bullet-active":"bullet")})),l.dynamicBullets){const e=a[r],s=a[d];for(let e=r;e<=d;e+=1)a[e]&&a[e].classList.add(...`${l.bulletActiveClass}-main`.split(" "));u(e,"prev"),u(s,"next")}}if(l.dynamicBullets){const s=Math.min(a.length,l.dynamicMainBullets+4),i=(p*s-p)/2-g*p,n=e?"right":"left";a.forEach((a=>{a.style[t.isHorizontal()?n:"top"]=`${i}px`}))}}o.forEach(((e,s)=>{if("fraction"===l.type&&(e.querySelectorAll(a.c(l.currentClass)).forEach((a=>{a.textContent=l.formatFractionCurrent(i+1)})),e.querySelectorAll(a.c(l.totalClass)).forEach((a=>{a.textContent=l.formatFractionTotal(m)}))),"progressbar"===l.type){let s;s=l.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const n=(i+1)/m;let r=1,o=1;"horizontal"===s?r=n:o=n,e.querySelectorAll(a.c(l.progressbarFillClass)).forEach((a=>{a.style.transform=`translate3d(0,0,0) scaleX(${r}) scaleY(${o})`,a.style.transitionDuration=`${t.params.speed}ms`}))}"custom"===l.type&&l.renderCustom?(e.innerHTML=l.renderCustom(t,i+1,m),0===s&&r("paginationRender",e)):(0===s&&r("paginationRender",e),r("paginationUpdate",e)),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](l.lockClass)}))}function b(){const e=t.params.pagination;if(d())return;const l=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.grid&&t.params.grid.rows>1?t.slides.length/Math.ceil(t.params.grid.rows):t.slides.length;let i=t.pagination.el;i=s.m(i);let n="";if("bullets"===e.type){let a=t.params.loop?Math.ceil(l/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&a>l&&(a=l);for(let s=0;s<a;s+=1)e.renderBullet?n+=e.renderBullet.call(t,s,e.bulletClass):n+=`<${e.bulletElement} ${t.isElement?'part="bullet"':""} class="${e.bulletClass}"></${e.bulletElement}>`}"fraction"===e.type&&(n=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),"progressbar"===e.type&&(n=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`),t.pagination.bullets=[],i.forEach((s=>{"custom"!==e.type&&(s.innerHTML=n||""),"bullets"===e.type&&t.pagination.bullets.push(...s.querySelectorAll(a.c(e.bulletClass)))})),"custom"!==e.type&&r("paginationRender",i[0])}function h(){t.params.pagination=e.c(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const a=t.params.pagination;if(!a.el)return;let l;"string"==typeof a.el&&t.isElement&&(l=t.el.querySelector(a.el)),l||"string"!=typeof a.el||(l=[...document.querySelectorAll(a.el)]),l||(l=a.el),l&&0!==l.length&&(t.params.uniqueNavElements&&"string"==typeof a.el&&Array.isArray(l)&&l.length>1&&(l=[...t.el.querySelectorAll(a.el)],l.length>1&&(l=l.filter((a=>s.a(a,".swiper")[0]===t.el))[0])),Array.isArray(l)&&1===l.length&&(l=l[0]),Object.assign(t.pagination,{el:l}),l=s.m(l),l.forEach((e=>{"bullets"===a.type&&a.clickable&&e.classList.add(...(a.clickableClass||"").split(" ")),e.classList.add(a.modifierClass+a.type),e.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass),"bullets"===a.type&&a.dynamicBullets&&(e.classList.add(`${a.modifierClass}${a.type}-dynamic`),c=0,a.dynamicMainBullets<1&&(a.dynamicMainBullets=1)),"progressbar"===a.type&&a.progressbarOpposite&&e.classList.add(a.progressbarOppositeClass),a.clickable&&e.addEventListener("click",g),t.enabled||e.classList.add(a.lockClass)})))}function f(){const a=t.params.pagination;if(d())return;let e=t.pagination.el;e&&(e=s.m(e),e.forEach((e=>{e.classList.remove(a.hiddenClass),e.classList.remove(a.modifierClass+a.type),e.classList.remove(t.isHorizontal()?a.horizontalClass:a.verticalClass),a.clickable&&(e.classList.remove(...(a.clickableClass||"").split(" ")),e.removeEventListener("click",g))}))),t.pagination.bullets&&t.pagination.bullets.forEach((e=>e.classList.remove(...a.bulletActiveClass.split(" "))))}n("changeDirection",(()=>{if(!t.pagination||!t.pagination.el)return;const a=t.params.pagination;let{el:e}=t.pagination;e=s.m(e),e.forEach((e=>{e.classList.remove(a.horizontalClass,a.verticalClass),e.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass)}))})),n("init",(()=>{!1===t.params.pagination.enabled?v():(h(),b(),m())})),n("activeIndexChange",(()=>{void 0===t.snapIndex&&m()})),n("snapIndexChange",(()=>{m()})),n("snapGridLengthChange",(()=>{b(),m()})),n("destroy",(()=>{f()})),n("enable disable",(()=>{let{el:a}=t.pagination;a&&(a=s.m(a),a.forEach((a=>a.classList[t.enabled?"remove":"add"](t.params.pagination.lockClass))))})),n("lock unlock",(()=>{m()})),n("click",((a,e)=>{const l=e.target,i=s.m(t.pagination.el);if(t.params.pagination.el&&t.params.pagination.hideOnClick&&i&&i.length>0&&!l.classList.contains(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&l===t.navigation.nextEl||t.navigation.prevEl&&l===t.navigation.prevEl))return;const a=i[0].classList.contains(t.params.pagination.hiddenClass);r(!0===a?"paginationShow":"paginationHide"),i.forEach((a=>a.classList.toggle(t.params.pagination.hiddenClass)))}}));const v=()=>{t.el.classList.add(t.params.pagination.paginationDisabledClass);let{el:a}=t.pagination;a&&(a=s.m(a),a.forEach((a=>a.classList.add(t.params.pagination.paginationDisabledClass)))),f()};Object.assign(t.pagination,{enable:()=>{t.el.classList.remove(t.params.pagination.paginationDisabledClass);let{el:a}=t.pagination;a&&(a=s.m(a),a.forEach((a=>a.classList.remove(t.params.pagination.paginationDisabledClass)))),h(),b(),m()},disable:v,render:b,update:m,init:h,destroy:f})};
