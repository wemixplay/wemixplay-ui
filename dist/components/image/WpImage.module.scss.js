"use strict";module.exports='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.lazy-img-wrapper {\n  position: relative;\n  display: inline-block;\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.lazy-img-wrapper.blur .target-image,\n.lazy-img-wrapper.blur .target-background {\n  filter: blur(5px);\n}\n.lazy-img-wrapper.blur.loaded .target-image,\n.lazy-img-wrapper.blur.loaded .target-background, .lazy-img-wrapper.blur.error-loaded .target-image,\n.lazy-img-wrapper.blur.error-loaded .target-background {\n  filter: blur(0);\n}\n.lazy-img-wrapper.waiting {\n  background: var(--wp-semantic-background-elevated-alternative);\n  animation: skeleton-blank linear 5s infinite;\n}\n.lazy-img-wrapper.waiting .target-image,\n.lazy-img-wrapper.waiting .target-background {\n  opacity: 0;\n}\n.lazy-img-wrapper.loaded .target-image,\n.lazy-img-wrapper.loaded .target-background, .lazy-img-wrapper.error-loaded .target-image,\n.lazy-img-wrapper.error-loaded .target-background {\n  opacity: 1;\n}\n.lazy-img-wrapper.error .target-image,\n.lazy-img-wrapper.error .target-background {\n  opacity: 0;\n}\n\n.target-image {\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  vertical-align: middle;\n}\n\n.target-background {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.target-image,\n.target-background {\n  transition: opacity, filter ease-in-out;\n  transition-duration: 0.3s;\n}';
