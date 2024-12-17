import e from"@babel/runtime/helpers/toConsumableArray";import n from"@babel/runtime/helpers/slicedToArray";import{__rest as o}from"../../_virtual/_tslib.js";import t,{useRef as i,useState as a,useMemo as r,Children as l,useCallback as s,useEffect as d}from"react";import{SwiperSlide as c,Swiper as u}from'./../../ext/swiper/swiper-react.js';import{makeCxFunc as m}from"../../utils/forReactUtils.js";import p from"./Carousel.module.scss.js";import v from"../../assets/svgs/ico-carousel-next.svg.js";import f from"../../assets/svgs/ico-carousel-prev.svg.js";import g from'./../../ext/swiper/modules/navigation.js';import h from'./../../ext/swiper/modules/pagination.js';import w from'./../../ext/swiper/modules/free-mode.js';import E from'./../../ext/swiper/modules/effect-fade.js';var b=m(p),C=function(m){var p=m.className,C=m.isLoading,S=void 0!==C&&C,k=m.skeletonCount,j=void 0===k?3:k,x=m.skeletonElement,y=void 0===x?null:x,B=m.children,N=m.modules,T=void 0===N?[]:N,M=m.effect,O=void 0===M?"slide":M,_=m.spaceBetween,P=void 0===_?10:_,I=m.breakpoints,U=m.slidesPerView,A=void 0===U?1:U,V=m.threshold,L=void 0===V?5:V,R=m.longSwipesMs,q=void 0===R?1e3:R,z=m.initialSlide,D=void 0===z?0:z,F=m.speed,G=void 0===F?1e3:F,H=m.loop,J=void 0===H||H,K=m.autoplay,Q=void 0!==K&&K,W=m.allowTouchMove,X=void 0===W||W,Y=m.navigation,Z=void 0!==Y&&Y,$=m.pagination,ee=void 0!==$&&$,ne=m.prevButton,oe=void 0===ne?t.createElement(f,null):ne,te=m.nextButton,ie=void 0===te?t.createElement(v,null):te,ae=m.onSlideChangeTransitionEnd,re=m.handleOnSlideChangeTransitionEnd,le=m.onSlideChange,se=m.onSwiper,de=m.onUpdate,ce=m.onPrevButtonClick,ue=m.onNextButtonClick,me=o(m,["className","isLoading","skeletonCount","skeletonElement","children","modules","effect","spaceBetween","breakpoints","slidesPerView","threshold","longSwipesMs","initialSlide","speed","loop","autoplay","allowTouchMove","navigation","pagination","prevButton","nextButton","onSlideChangeTransitionEnd","handleOnSlideChangeTransitionEnd","onSlideChange","onSwiper","onUpdate","onPrevButtonClick","onNextButtonClick"]),pe=i(),ve=i(null),fe=a(),ge=n(fe,2),he=ge[0],we=ge[1],Ee=a(),be=n(Ee,2),Ce=be[0],Se=be[1],ke=r((function(){return S?Array.from({length:j},(function(e,n){return t.createElement(c,{key:"slide-item-".concat(n)},y)})):l.map(B,(function(e){return e})).map((function(e,n){return t.createElement(c,{key:"slide-item-".concat(n)},e)}))}),[S,B,j,y]),je=r((function(){return String(Math.random()).replace(".","")}),[]),xe=s((function(e){var n=("auto"===A?1:A)-1;return 0===e?"first":e===ke.length-1-n?"last":"middle"}),[A,ke]),ye=s((function(e){pe.current=e,se&&se(e)}),[se]);return d((function(){pe.current&&Z&&(pe.current.navigation.prevEl=he,pe.current.navigation.nextEl=Ce)}),[Z,Ce,he]),t.createElement("div",{className:b("carousel-wrapper",p)},t.createElement("div",{className:b("carousel-swiper")},t.createElement(u,Object.assign({modules:[g,h,w,E].concat(e(T)),effect:O,slidesPerView:A,initialSlide:D,speed:G,threshold:L,longSwipesMs:q,loop:J,autoplay:Q,allowTouchMove:X,breakpoints:I,spaceBetween:P,onSlideChangeTransitionEnd:function(e){null==ae||ae(e);var n=e.realIndex,o=e.activeIndex,t=e.previousIndex,i=xe(n);null==re||re({realIndex:n,position:i,direction:o-t>0?"next":"prev"})},onSlideChange:le,onSwiper:ye,onUpdate:de,navigation:!!Z&&Object.assign({prevEl:he,nextEl:Ce},"boolean"==typeof Z?{}:Z),pagination:!!ee&&Object.assign({clickable:!0,el:"#pagination-".concat(je)},"boolean"==typeof ee?{}:ee)},me,{style:Object.assign(Object.assign({},me.style),{width:"auto"===A?"auto":""})}),ke)),Z&&t.createElement("div",{className:b("carousel-navigation")},t.createElement("button",{ref:we,className:b("nav-prev-btn"),onClick:ce},oe),t.createElement("button",{ref:Se,className:b("nav-next-btn"),onClick:ue},ie)),ee&&t.createElement("div",{ref:ve,id:"pagination-".concat(je),className:b("carousel-pagination")}))};export{C as default};
