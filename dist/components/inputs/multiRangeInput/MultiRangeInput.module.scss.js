"use strict";module.exports='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.range-input {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n}\n.range-input.disabled .slider {\n  cursor: not-allowed;\n  opacity: 0.5;\n  pointer-events: none;\n}\n.range-input.disabled .slider .range {\n  left: 0 !important;\n  width: 100% !important;\n}\n.range-input .range-area {\n  position: relative;\n  display: inline-flex;\n  width: 100%;\n  height: var(--mri-thumb-size);\n  align-items: center;\n  justify-content: center;\n}\n.range-input .range-area > div {\n  width: calc(100% - var(--mri-thumb-size));\n  height: var(--mri-slider-height);\n}\n.range-input input[type=range] {\n  position: absolute;\n  z-index: 3;\n  top: 50%;\n  left: 0;\n  width: 100%;\n  height: var(--mri-slider-height);\n  -webkit-appearance: none;\n  appearance: none;\n  background-color: transparent;\n  opacity: 1;\n  pointer-events: none;\n  transform: translateY(-50%);\n}\n.range-input input[type=range]::-webkit-slider-thumb {\n  width: var(--mri-thumb-size); /* 썸의 너비 */\n  height: var(--mri-thumb-size); /* 썸의 높이 */\n  border: 3px solid var(--mri-thumb-border-color, var(--wp-semantic-label-normal));\n  border-radius: 50%;\n  -webkit-appearance: none;\n  background-color: var(--mri-thumb-color, var(--wp-semantic-label-normal));\n  cursor: pointer;\n  pointer-events: auto;\n  transition: box-shadow 0.4s;\n}\n.range-input input[type=range]::-webkit-slider-thumb:active {\n  box-shadow: unset;\n}\n.range-input input[type=range]::-moz-range-thumb {\n  width: var(--mri-thumb-size); /* 썸의 너비 */\n  height: var(--mri-thumb-size); /* 썸의 높이 */\n  border: 3px solid var(--mri-thumb-border-color, var(--wp-semantic-label-normal));\n  border-radius: 50%;\n  -moz-appearance: none;\n  background-color: var(--mri-thumb-color, var(--wp-semantic-label-normal));\n  cursor: pointer;\n  pointer-events: auto;\n  transition: box-shadow 0.4s;\n}\n.range-input input[type=range]::-moz-range-thumb:active {\n  box-shadow: unset;\n}\n.range-input .slider {\n  position: relative;\n  z-index: 2;\n  height: var(--mri-slider-height);\n}\n.range-input .slider .track {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  border-radius: 5px;\n  background-color: var(--mri-track-color, var(--wp-semantic-line-normal-neutral));\n}\n.range-input .slider .range {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 25%;\n  bottom: 0;\n  left: 25%;\n  border-radius: 5px;\n  background-color: var(--mri-range-color, var(--wp-semantic-label-normal));\n}\n.range-input .range-input {\n  display: flex;\n  width: 100%;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n.range-input .range-input .input-box:nth-child(2) {\n  margin-left: auto;\n  text-align: right;\n}\n.range-input .range-input .input-box label {\n  display: block;\n  color: var(--wp-semantic-label-alternative);\n  font-weight: 500;\n  letter-spacing: 0.0145em;\n  font-size: 14px;\n  font-size: 0.875rem;\n  line-height: 20px;\n  line-height: 1.25rem;\n}\n.range-input .range-input .input-box input {\n  width: 60px;\n  min-width: 60px;\n  max-width: 100px;\n  height: 36px;\n  padding: 0 0.5rem;\n  border: 1px solid var(--wp-semantic-label-normal);\n  border-radius: 0.25rem;\n  margin-top: 0.75rem;\n  color: var(--wp-semantic-label-strong);\n  font-feature-settings: "ss10" on;\n  text-align: center;\n  font-weight: 400;\n  letter-spacing: 0.0057em;\n  font-size: 16px;\n  font-size: 1rem;\n  line-height: 24px;\n  line-height: 1.5rem;\n}';
