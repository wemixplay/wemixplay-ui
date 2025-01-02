import{__rest as e}from"../../_virtual/_tslib.js";import n,{useRef as t,useState as o,useMemo as a,Children as i,useCallback as s,useEffect as l}from"react";import{SwiperSlide as r,Swiper as c}from'./../../ext/swiper/swiper-react.js';import{makeCxFunc as d}from"../../utils/forReactUtils.js";import p from"./Carousel.module.scss.js";import m from"../../assets/svgs/ico-carousel-next.svg.js";import u from"../../assets/svgs/ico-carousel-prev.svg.js";import g from'./../../ext/swiper/modules/navigation.js';import v from'./../../ext/swiper/modules/pagination.js';import f from'./../../ext/swiper/modules/free-mode.js';import h from'./../../ext/swiper/modules/effect-fade.js';const w=d(p);var E=d=>{var{className:p,isLoading:E=!1,skeletonCount:S=3,skeletonElement:C=null,children:b,modules:k=[],effect:j="slide",spaceBetween:x=10,breakpoints:B,slidesPerView:y=1,threshold:N=5,longSwipesMs:T=1e3,initialSlide:M=0,speed:O=1e3,loop:_=!0,autoplay:P=!1,allowTouchMove:I=!0,navigation:U=!1,pagination:V=!1,prevButton:L=n.createElement(u,null),nextButton:A=n.createElement(m,null),onSlideChangeTransitionEnd:R,handleOnSlideChangeTransitionEnd:q,onSlideChange:z,onSwiper:D,onUpdate:F,onPrevButtonClick:G,onNextButtonClick:H}=d,J=e(d,["className","isLoading","skeletonCount","skeletonElement","children","modules","effect","spaceBetween","breakpoints","slidesPerView","threshold","longSwipesMs","initialSlide","speed","loop","autoplay","allowTouchMove","navigation","pagination","prevButton","nextButton","onSlideChangeTransitionEnd","handleOnSlideChangeTransitionEnd","onSlideChange","onSwiper","onUpdate","onPrevButtonClick","onNextButtonClick"]);const K=t(),Q=t(null),[W,X]=o(),[Y,Z]=o(),$=a((()=>E?Array.from({length:S},((e,t)=>n.createElement(r,{key:"slide-item-".concat(t)},C))):i.map(b,(e=>e)).map(((e,t)=>n.createElement(r,{key:"slide-item-".concat(t)},e)))),[E,b,S,C]),ee=a((()=>String(Math.random()).replace(".","")),[]),ne=s((e=>{const n=("auto"===y?1:y)-1;return 0===e?"first":e===$.length-1-n?"last":"middle"}),[y,$]),te=s((e=>{K.current=e,D&&D(e)}),[D]);return l((()=>{K.current&&U&&(K.current.navigation.prevEl=W,K.current.navigation.nextEl=Y)}),[U,Y,W]),n.createElement("div",{className:w("carousel-wrapper",p)},n.createElement("div",{className:w("carousel-swiper")},n.createElement(c,Object.assign({modules:[g,v,f,h,...k],effect:j,slidesPerView:y,initialSlide:M,speed:O,threshold:N,longSwipesMs:T,loop:_,autoplay:P,allowTouchMove:I,breakpoints:B,spaceBetween:x,onSlideChangeTransitionEnd:e=>{null==R||R(e);const{realIndex:n,activeIndex:t,previousIndex:o}=e,a=ne(n);null==q||q({realIndex:n,position:a,direction:t-o>0?"next":"prev"})},onSlideChange:z,onSwiper:te,onUpdate:F,navigation:!!U&&Object.assign({prevEl:W,nextEl:Y},"boolean"==typeof U?{}:U),pagination:!!V&&Object.assign({clickable:!0,el:"#pagination-".concat(ee)},"boolean"==typeof V?{}:V)},J,{style:Object.assign(Object.assign({},J.style),{width:"auto"===y?"auto":""})}),$)),U&&n.createElement("div",{className:w("carousel-navigation")},n.createElement("button",{ref:X,className:w("nav-prev-btn"),onClick:G},L),n.createElement("button",{ref:Z,className:w("nav-next-btn"),onClick:H},A)),V&&n.createElement("div",{ref:Q,id:"pagination-".concat(ee),className:w("carousel-pagination")}))};export{E as default};
