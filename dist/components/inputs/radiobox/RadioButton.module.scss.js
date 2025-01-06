"use strict";module.exports='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n/* stylelint-disable selector-type-no-unknown */\n/* ChipTab과 같은 UI처럼 보이도록 수정함 */\n.radio-button {\n  position: relative;\n  overflow: hidden;\n  min-height: 32px;\n  padding: 0 0.75rem;\n}\n.radio-button .radio-button-text {\n  position: relative;\n  z-index: 2;\n}\n.radio-button :global jwripple {\n  z-index: 3 !important;\n}\n.radio-button :global .ico-check {\n  display: none;\n}\n.radio-button :global .text {\n  color: var(--wp-semantic-label-alternative);\n  transition: color 0.3s;\n  font-feature-settings: "ss10" on;\n  line-height: 100%;\n  font-size: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.radio-button :global .text::after {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: block;\n  border: 1px solid var(--wp-semantic-label-disable);\n  border-radius: 2.5rem;\n  content: "";\n  pointer-events: none;\n  transition: border 0.3s, background-color 0.3s;\n}\n.radio-button :global input:checked ~ .text {\n  color: var(--wp-semantic-label-inverse-normal);\n  font-feature-settings: "ss10" on;\n  line-height: 100%;\n  font-size: 12px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.radio-button :global input:checked ~ .text::after {\n  border: 1px solid var(--wp-semantic-label-normal);\n  background-color: var(--wp-semantic-label-normal);\n}';
