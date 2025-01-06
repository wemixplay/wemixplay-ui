"use strict";module.exports='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.feed-text-content.has-click-event {\n  cursor: pointer;\n}\n.feed-text-content .text {\n  margin: 0;\n  font-family: inherit;\n  white-space: pre-wrap;\n  word-break: break-word;\n  font-feature-settings: "ss10" on;\n  line-height: 148%;\n  font-size: 16px;\n  font-size: 1rem;\n  font-weight: 500;\n}\n@media (min-width: 768px) {\n  .feed-text-content .text {\n    font-feature-settings: "ss10" on;\n    line-height: 148%;\n    font-size: 18px;\n    font-size: 1.125rem;\n    font-weight: 500;\n  }\n}\n@media (hover: hover) and (pointer: fine) {\n  .feed-text-content :global .mention.complete-mention:hover,\n  .feed-text-content :global .hash.complete-hash:hover,\n  .feed-text-content :global a:hover {\n    text-decoration: underline;\n  }\n}\n.feed-text-content :global .btn-ellipsis-trigger {\n  margin-left: auto;\n  background-color: transparent;\n}\n.feed-text-content .modified {\n  display: flex;\n  height: 24px;\n  align-items: center;\n  color: var(--wp-semantic-label-alternative);\n  font-feature-settings: "ss10" on;\n  line-height: 100%;\n  font-size: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n@media (min-width: 768px) {\n  .feed-text-content .modified {\n    font-feature-settings: "ss10" on;\n    line-height: 132%;\n    font-size: 14px;\n    font-size: 0.875rem;\n    font-weight: 500;\n  }\n}\n.feed-text-content .show-more {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 1.25rem;\n  color: var(--wp-semantic-label-neutral);\n  font-feature-settings: "ss10" on;\n  line-height: 100%;\n  font-size: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n@media (min-width: 768px) {\n  .feed-text-content .show-more {\n    font-feature-settings: "ss10" on;\n    line-height: 132%;\n    font-size: 14px;\n    font-size: 0.875rem;\n    font-weight: 500;\n  }\n}\n.feed-text-content .show-more svg path {\n  fill: var(--wp-semantic-label-neutral);\n}';
