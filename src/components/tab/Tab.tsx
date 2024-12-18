'use client';

import React, {
  ReactElement,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  MutableRefObject
} from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { makeCxFunc } from '@/utils/forReactUtils';

import Ripple, { RippleOption } from '../ripple/Ripple';

import style from './Tab.module.scss';

type TabItem = {
  /** tab item의 고유키 */
  key: string | number;
  /** tab 버튼에 나오는 버튼 내용 */
  label: ReactElement | string;
  /** tab content영역에 나오는 내용 */
  children?: ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** tab 버튼과 컨텐츠를 숨길지 여부 */
  isHide?: boolean;
};

interface PropsType {
  className?: string;
  /**
   * tab의 버튼 내용과 content영역에 나올 내용, 고유 key값, 비활성화 여부의 내용을 담고 있는 배열 요소
   */
  tabItems: TabItem[];
  /**
   * tabItems 배열 요소중 선택된 tab의 key값
   */
  activeKey?: string | number;
  /**
   * handleChange 두번째 인자에 전달될 name 값
   */
  name?: string;
  /**
   * 선택된 tab 버튼 밑에 나올 slider UI의 노출 여부
   */
  slider?: boolean;
  /**
   * tab의 전체적인 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 선택되지 않은 tab의 children을 지울것인지에 대한 여부
   */
  destroyInactiveTabPanel?: boolean;
  /**
   * tab 버튼들의 좌우 스크롤을 담당하는 element ref 값이 있다면 전달
   */
  tabNavScrollRef?: MutableRefObject<HTMLElement>;
  /**
   * content영역을 swipe UI로 노출 할것인지 여부
   */
  swipeContent?: boolean;
  /**
   * ripple 효과 옵션
   *
   * default: `{ disabled: false }`
   */
  rippleOption?: RippleOption;
  /**
   * CSS 스타일 속성
   */
  style?: CSSProperties;
  /**
   * 선택된 tab이 변경될때 상위 컴포넌트로 선택된 tab의 key값을 전달하는 함수
   * @param key 선택된 tab의 key값
   * @param name  props로 전달받은 name 값
   */
  handleChange?: (key: JSONObject, name: string) => void;
  /**
   * tab 버튼을 클릭할때 호출되는 함수
   * @param key 선택된 tab의 key값
   * @param e  MouseEvent<HTMLButtonElement>
   */
  onClick?: (key: JSONObject, e: MouseEvent<HTMLButtonElement>) => void;
}

const cx = makeCxFunc(style);

/**
 * `Tab` 컴포넌트는 탭 UI를 구성할 때 사용되며, swipe 형식의 UI를 제공할 수도 있습니다.
 *
 * @param {string} [props.className] - 탭 컴포넌트의 최상위 요소에 적용될 클래스 이름
 * @param {TabItem[]} props.tabItems - 탭의 각 항목을 나타내는 객체의 배열. 각 객체는 탭 버튼의 내용, 내용 영역에 표시될 컨텐츠, 고유 key 값, 비활성화 여부를 포함
 * @param {string|number} [props.activeKey] - 현재 활성화된 탭의 key 값. 이 값이 `tabItems` 배열에서 해당하는 요소를 활성화 상태로 표시
 * @param {string} [props.name] - `handleChange` 함수의 두 번째 인자로 전달될 문자열. 탭이 변경될 때 이 이름을 사용하여 어떤 탭이 선택되었는지 식별.
 * @param {boolean} [props.slider] - 선택된 탭 버튼 아래에 슬라이더 UI를 표시할지 여부를 결정.
 * @param {boolean} [props.disabled] - 탭의 전체적인 비활성화 여부를 결정. `true`로 설정하면 모든 탭 항목이 비활성화
 * @param {boolean} [props.destroyInactiveTabPanel] - 선택되지 않은 탭의 `children`을 DOM에서 제거할지 여부를 결정. `true`로 설정하면 비활성화된 탭의 내용이 제거
 * @param {boolean} [props.tabNavScrollRef] - tab 버튼들의 좌우 스크롤을 담당하는 element ref 값이 있다면 전달
 * @param {boolean} [props.swipeContent] - 탭의 내용 영역을 스와이프 UI로 표시할지 여부를 결정. 모바일 환경에서 유용하게 사용 가능
 * @param {RippleOption} [props.rippleOption] - 탭 버튼에 부여할 ripple 효과 옵션. default: `{ disabled: false }`
 * @param {CSSProperties} [props.style] - CSS 스타일 속성
 * @param {Function} [props.handleChange] - 선택된 탭이 변경될 때 호출될 함수. 선택된 탭의 key 값과 `props.name`을 인자로 받음
 * @param {Function} [props.onClick] - 탭 버튼을 클릭할 때 호출될 함수. 선택된 탭의 key 값과 클릭 이벤트를 인자로 받음
 */
const Tab = ({
  className = '',
  tabItems,
  activeKey,
  name,
  slider,
  swipeContent,
  disabled,
  rippleOption = {
    disabled: true
  },
  tabNavScrollRef,
  destroyInactiveTabPanel = true,
  onClick,
  handleChange
}: PropsType) => {
  /** slider ui 요소를 가르키는 ref값 */
  const sliderRef = useRef<HTMLSpanElement>(null);
  /** .tab-nav 선택자 요소를 가르키는 ref값 */
  const tabNavRef = useRef<HTMLDivElement>(null);
  /** .tab-btn 선택자 요소들을 가르키는 ref값 */
  const tabBtnsRef = useRef<HTMLButtonElement[]>([]);
  /** swiper 객체를 가르키는 ref 값 */
  const swiperRef = useRef<SwiperClass>();
  /** 처음 선택된 tab 요소를 세팅할때 transition을 방지하기 위해 존재하는 flag 값 */
  const firstLoaded = useRef(false);

  /** 숨길지 여부가 false인 tabItems 배열 */
  const filterTabItems = useMemo(() => {
    return tabItems?.filter((item) => !item?.isHide) ?? [];
  }, [tabItems]);

  // Tab 컴포넌트 내부에서 관리되는 현재의 activeKey state 값
  const [currentActiveKey, setCurrentActiveKey] = useState<string | number>(
    activeKey ?? filterTabItems[0]?.key
  );

  /**
   * currentActiveKey 값에 맞는 tabItem을 찾아 그에 맞는 index값을 반환한 active index
   */
  const activeIndex = useMemo(() => {
    const index = filterTabItems.findIndex((tab) => tab.key === currentActiveKey);

    return index === -1 ? 0 : index;
  }, [currentActiveKey, filterTabItems]);

  /**
   * tab contents 영역에 랜더링될 랜더링 내용
   */
  const tabContents = useMemo(() => {
    // tabItems가 없을때는 빈배열 반환
    if (!filterTabItems.length) {
      return [];
    }

    // swipeContent가 true라면 content 내용을 Swiper를 활용하여 슬라이드 ui가 가능하도록 반환
    if (swipeContent) {
      const handleChangeTabContent = () => {
        const { swipeDirection } = swiperRef.current;
        const { key, disabled } = filterTabItems[swiperRef.current.activeIndex];
        const { key: prevKey } =
          filterTabItems[swiperRef.current.activeIndex - 1] ?? filterTabItems[0];
        const { key: nextKey } =
          filterTabItems[swiperRef.current.activeIndex + 1] ??
          filterTabItems[swiperRef.current.activeIndex];

        if (!disabled) {
          setCurrentActiveKey(key);

          handleChange && handleChange(key, name);
        } else {
          setCurrentActiveKey(swipeDirection === 'next' ? nextKey : prevKey);

          handleChange && handleChange(swipeDirection === 'next' ? nextKey : prevKey, name);
        }
      };

      return (
        <Swiper
          className={cx('tab-content-holder')}
          autoHeight
          threshold={1}
          slidesPerView={1}
          enabled={!disabled}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          // onBeforeSlideChangeStart={}
          onSlideChange={handleChangeTabContent}
        >
          {filterTabItems.map((item, index) => (
            <SwiperSlide
              key={item.key}
              // .tabs-content 선택자 요소가 active 클래스를 안갖고 있다면 display: none; 속성이 적용되기 때문에
              // swipeContent가 true이면 모든 .tabs-content는 active 클래스를 갖는다.
              className={cx('tabs-content', 'active', {
                // props.disabled가 true면 전체 비활성화이기 때문에 비활성화
                // tabItem.disabled가 true면 tabItem 개별적 비활성화이기 때문에 비활성화
                disabled: disabled || item.disabled
              })}
              // tabItem.disabled가 true면 해당 컨튼체를 숨김 처리
              style={{ visibility: item.disabled ? 'hidden' : 'visible' }}
            >
              {item.children}
            </SwiperSlide>
          ))}
        </Swiper>
      );

      // destroyInactiveTabPanel가 true면 선택된 tabItem의 children만 랜더링한다.
    } else if (destroyInactiveTabPanel) {
      return (
        <div
          key={`contents-${filterTabItems[activeIndex]?.key}`}
          className={cx('tab-content-holder')}
        >
          <div
            className={cx('tabs-content', 'active', {
              // props.disabled가 true면 전체 비활성화이기 때문에 비활성화
              // tabItem.disabled가 true면 tabItem 개별적 비활성화이기 때문에 비활성화
              disabled: disabled || filterTabItems[activeIndex]?.disabled
            })}
          >
            {filterTabItems[activeIndex]?.children}
          </div>
        </div>
      );
    } else {
      return (
        <div className={cx('tab-content-holder')}>
          {filterTabItems.map((item, index) => (
            <div
              key={`contents-${item.key}`}
              className={cx('tabs-content', {
                active: activeIndex === index,
                // props.disabled가 true면 전체 비활성화이기 때문에 비활성화
                // tabItem.disabled가 true면 tabItem 개별적 비활성화이기 때문에 비활성화
                disabled: disabled || item.disabled
              })}
            >
              {item.children}
            </div>
          ))}
        </div>
      );
    }
  }, [
    activeIndex,
    destroyInactiveTabPanel,
    disabled,
    handleChange,
    name,
    swipeContent,
    filterTabItems
  ]);

  /**
   * tab button을 감싸고 있는 scroll를 담당하는 element가
   * 선택된 tab button이 중간에 보일 수 있도록 스크롤을 조정해주는 함수
   */
  const tabScrollSpy = useCallback(() => {
    const tabNavEl = tabNavScrollRef?.current ?? tabNavRef.current;
    // 선택된 tab button 요소
    const targetEl =
      tabBtnsRef.current.find((btnEl) => btnEl && btnEl.classList.contains('active')) ??
      tabBtnsRef.current[0];

    if (targetEl) {
      const { offsetLeft, clientWidth } = targetEl;

      // tab button을 감싸고 있는 scroll영역의 element의 중앙을 계산하는 수식
      const scrollLeft = offsetLeft - tabNavEl.offsetWidth / 2 + clientWidth / 2;

      tabNavEl.scrollTo({
        top: 0,
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [tabNavScrollRef]);

  /**
   * slider ui의 위치를 계산하여 transform에 transLateX 스타일을 조정해주는 함수
   */
  const drawSlider = useCallback(() => {
    const sliderEl = sliderRef.current;

    if (!slider || !sliderEl) {
      return;
    }

    // 선택된 tab button 요소
    const targetEl =
      tabBtnsRef.current.find((btnEl) => btnEl && btnEl.classList.contains('active')) ??
      tabBtnsRef.current[0];

    if (targetEl) {
      const { offsetLeft, clientWidth } = targetEl;
      sliderEl.style.transform = `translateX(${offsetLeft}px)`;
      sliderEl.style.width = `${clientWidth}px`;

      // firstLoaded flag 값이 false이면 style.transition을 none으로 하여 slider ui의 이동 effect가 안보이도록 처리
      if (firstLoaded.current) {
        sliderEl.style.transition = '';
      } else {
        sliderEl.style.transition = 'none';
        firstLoaded.current = true;
      }

      // active 클래스를 갖고 있는 tab button 요소가 없다면 slider ui의 스타일을 reset
    } else {
      sliderEl.style.transform = `translateX(0px)`;
      sliderEl.style.width = '0px';
    }
  }, [slider]);

  /**
   * tab button 요소를 클릭하여 새로운 activeKey를 상위 컴포넌트에게 전달하고
   * 내부 currentActiveKey를 새로운 activeKey로 setState 해주는 함수
   */
  const handleChangeTab = useCallback(
    (key: string | number, e: MouseEvent<HTMLButtonElement>) => {
      // activeKey가 존재한다면 컴포넌트 내부 activeKey인 currentActiveKey를 setState해주지 않음
      if (typeof activeKey === 'undefined') {
        setCurrentActiveKey(key);
      }

      handleChange && handleChange(key, name);
      onClick && onClick(key, e);
    },
    [activeKey, name, handleChange, onClick]
  );

  const observer = useMemo(() => {
    if (typeof window === 'undefined') {
      return;
    }

    return new ResizeObserver(() => {
      drawSlider();
    });
  }, [drawSlider]);

  /**
   * activeKey가 변경될때 currentActiveKey도 동기화
   *
   * activeKey가 존재하는데 currentActiveKey가 activeKey와 맞지 않을때 실행
   * (swipeContent가 true일때 activeKey가 존재한다면 swipe를 하더라도 다시 원래 activeKey를 갖는 content요소로 swipe 이동하도록 하기 위함)
   */
  useEffect(() => {
    if (typeof activeKey !== 'undefined' && activeKey !== currentActiveKey) {
      setCurrentActiveKey(activeKey);
    }
  }, [activeKey, currentActiveKey]);

  /**
   * activeIndex가 변경될때마다
   * 1. slider ui를 다시 그리는 drawSlider함수 실행
   * 2. tab button 요소를 중앙에 보이게 하는 tabScrollSpy 함수 실행
   * 3. activeIndex와 같은 index를 갖는 content 요소로 swiper.slideTo 함수 실행
   *
   * drawSlider와 tabScrollSpy가 컴포넌트가 마운트 될때 실행되게 하는 영역이기도 함!
   */
  useEffect(() => {
    drawSlider();
    tabScrollSpy();

    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex, 250);
    }
  }, [activeIndex, drawSlider, tabScrollSpy]);

  /**
   * 반응형을 위해 화면 사이즈가 조정될때
   * 1. slider ui를 다시 그리는 drawSlider함수 실행
   * 2. tab button 요소를 중앙에 보이게 하는 tabScrollSpy 함수 실행
   */
  useEffect(() => {
    const resizeHandler = () => {
      drawSlider();
      tabScrollSpy();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [drawSlider, tabScrollSpy]);

  /**
   * swipeContent가 true일때 disabled가 변경될때 swiper의 enabled값을 업데이트
   */
  useEffect(() => {
    if (swipeContent && swiperRef.current) {
      if (disabled) {
        swiperRef.current.disable();
      } else {
        swiperRef.current.enable();
      }
    }
  }, [disabled, swipeContent]);

  useEffect(() => {
    if (observer) {
      const tabBtns = tabBtnsRef.current;

      tabBtns.forEach((tabBtn) => {
        if (tabBtn) {
          observer.observe(tabBtn);
        }
      });

      return () => {
        tabBtns.forEach((tabBtn) => {
          if (tabBtn) {
            observer.unobserve(tabBtn);
          }
        });
      };
    }
  }, [observer]);

  return (
    <div className={cx(className, 'tab', { 'swipe-content': swipeContent })}>
      <div className={cx('tab-nav-wrap')}>
        <div ref={tabNavRef} className={cx('tab-nav-scroll')}>
          <div className={cx('tab-nav')}>
            {filterTabItems.map((tab, index) => (
              <Ripple
                key={tab.key}
                {...rippleOption}
                disabled={rippleOption.disabled || tab.disabled || disabled}
              >
                <button
                  ref={(el) => {
                    tabBtnsRef.current[index] = el;
                  }}
                  key={tab.key}
                  role="tab"
                  className={cx('tab-btn', { active: currentActiveKey === tab.key })}
                  disabled={disabled || tab.disabled}
                  onClick={(e) => handleChangeTab(tab.key, e)}
                >
                  {tab.label}
                </button>
              </Ripple>
            ))}
            {slider && <span ref={sliderRef} className={cx('slider')}></span>}
          </div>
        </div>
      </div>
      {tabContents}
    </div>
  );
};

export type { PropsType as TabProps, TabItem };
export default Tab;
