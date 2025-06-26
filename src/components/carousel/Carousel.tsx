'use client';

import React from 'react';
import { Children, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper, SwiperProps } from 'swiper/react';
import { Navigation, Pagination, FreeMode, EffectFade } from 'swiper/modules';

import { makeCxFunc } from '@/utils/forReactUtils';

import 'swiper/css';
import 'swiper/css/effect-fade';

import style from './Carousel.module.scss';
import { SvgIconChevronLeft, SvgIconChevronRight } from '@/assets/svgs';

const cx = makeCxFunc(style);

/**
 * 현재 캐러샐의 가장 왼쪽 슬라이드가 전체 슬라이드의 어느 부분을 표현하는지 나타내는 위치에 대한 스트링값의 유니언 타입
 */
type Position = 'first' | 'middle' | 'last';

interface Props extends SwiperProps {
  className?: string;
  /**
   * 외부에서 데이터 페칭을 하고 있는 중인지 여부
   */
  isLoading?: boolean;
  /**
   * 보여줄 스켈레톤의 수
   */
  skeletonCount?: number;
  /**
   * 로딩시간 동안 보여줄 스켈레톤 요소
   */
  skeletonElement?: ReactNode;
  /**
   * 캐러셀 내부에 주입된 자식 요소
   */
  children: ReactNode | ReactNode[];
  /**
   * 현재 캐러샐 컴포넌트에서 주입하고 있는 모듈 외에 캐러샐을 확장하는 컴포넌트에서 사용하고 싶은 모듈을 배열로 주입하여
   * 기능을 추가할 수 있습니다.
   */
  modules?: SwiperProps['modules'];
  /**
   * 현재 캐러셀 컴포넌트에서 사용할 수 있는 기본 슬라이드 이펙트로 slide, fade 모듈을 추가하였고,
   * 사용하고 싶은 슬라이드 이펙트 모듈을 이 컴포넌트를 호출하는 곳에서 prop으로 추가하고
   * 이 effect prop에 그 이름을 명시하여 사용 가능합니다.
   * 사용하는 곳에서 사용하는 모듈의 css파일도 import해야 합니다.
   * ex) modules={[EffectFlip]}, effect="flip"
   */
  effect?: SwiperProps['effect'];
  /**
   * 슬라이드 요소 사이의 간격
   */
  spaceBetween?: SwiperProps['spaceBetween'];
  /**
   * 반응형일 경우 가로 픽셀마다 슬라이드 요소 사이의 간격 지정
   */
  breakpoints?: SwiperProps['breakpoints'];
  /**
   * 하나의 슬라이드 하면에 몇 개의 요소를 보여줄 것인지에 대한 갯수
   */
  slidesPerView?: SwiperProps['slidesPerView'];
  /**
   * 마우스로 얼만큼의 드래그를 하여야 터치슬라이드가 동작할지 결정하는 픽셀값
   */
  threshold?: SwiperProps['threshold'];
  /**
   * 최대 몇 밀리세컨드 단위의 시간 이내에 터치스와이핑을 완료하여야 슬라이드가 작동할 것인지에 대한 값(짧으면 터치감이 매우 안좋습니다.)
   */
  longSwipesMs?: SwiperProps['longSwipesMs'];
  /**
   * 처음에 보여질 슬라이드 요소의 가장 왼쪽 인덱스.
   */
  initialSlide?: SwiperProps['initialSlide'];
  /**
   * 슬라이드 액션의 속도(ms)
   */
  speed?: SwiperProps['speed'];
  /**
   * 슬라이드의 루프 여부
   */
  loop?: SwiperProps['loop'];
  /**
   * 자동 슬라이드 여부
   */
  autoplay?: SwiperProps['autoplay'];
  /**
   * 터치로 캐러샐 요소를 슬라이드 가능 여부를 설정
   */
  allowTouchMove?: SwiperProps['allowTouchMove'];
  /**
   * 네이게이션 설정 truthy값일 시, UI에 좌우 네이게이션 버튼이 생성되어 스타일링 가능.
   */
  navigation?: SwiperProps['navigation'];
  /**
   * 페이지네이션 설정 truthy값일 시, 페이지네이션 버튼이 생성되어 스타일링 가능.
   */
  pagination?: SwiperProps['pagination'];
  /**
   * navigation이 truthy값일 시, 보여줄 슬라이드 이전 버튼 UI
   */
  prevButton?: ReactNode;
  /**
   * navigation이 truthy값일 시, 보여줄 슬라이드 다음 버튼 UI
   */
  nextButton?: ReactNode;
  /**
   * 캐러샐 슬라이딩이 종료된 이후 실행될 함수.
   * (기존에는 onSlideChange를 사용했는데, 아래의 함수가 좀 더 안전하게 실행됩니다.)
   */
  onSlideChangeTransitionEnd?: SwiperProps['onSlideChangeTransitionEnd'];
  /**
   * 캐러샐 슬라이딩 이후, 해당 움직임에 대한 정보를 추가적으로 받아 사용할 수 있는 함수.
   * @param realIndex: 현재 보여지는 슬라이드 중 가장 왼쪽 요소의 인덱스.
   * @param position: 현재 보여지는 슬라이드 중 가장 왼쪽 요소를 기준으로 현재 화면에 보여지는 슬라이드 요소들의 화면상 위치.
   * @param direction: 현재 보여지는 슬라이드 중 가장 왼쪽 요소가 움직인 방향.
   */
  handleOnSlideChangeTransitionEnd?: ({
    realIndex,
    position
  }: {
    realIndex: number;
    position: Position;
    direction: 'prev' | 'next';
  }) => void;
  /**
   * 캐러샐 슬라이딩 도중에 실행될 함수.
   * (allowTouchMove가 true라면 이 함수는 터치슬라이드 과정 도중 여러번 실행되기 때문에, 꼭 슬라이딩 과정 중에 필요한 함수일 경우만 사용을 권장합니다.)
   */
  onSlideChange?: SwiperProps['onSlideChange'];
  /**
   * 이 컴포넌트의 외부에서 Swiper 객체를 참조할 수 있도록 setSwiper 등의 함수의 prop전달을 통해
   * swiper를 변수화하고 외부에서 이 변수를 참조해 메소드를 사용 가능.
   */
  onSwiper?: SwiperProps['onSwiper'];
  /**
   * Swiper 객체의 update 메소드 호출 이후 실행되는 함수.
   */
  onUpdate?: SwiperProps['onUpdate'];
  /**
   * 내비게이션 버튼이 존재할 때, 이전 버튼을 클릭할 시 실행할 수 있는 함수.
   */
  onPrevButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 내비게이션 버튼이 존재할 때, 다음 버튼을 클릭할 시 실행할 수 있는 함수.
   */
  onNextButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * `Carousel` 캐러샐 컴포넌트는 이 컴포넌트를 확장 또는 그대로 사용하여 UI 요소들을 슬라이드 효과 처리할 수 있는 컴포넌트입니다.
 * @param {SwiperProps} [rest] - 캐러샐 컴포넌트는 react swiper의 확장 컴포넌트이기때문에, react swiper의 기능을 사용하기 위해 주입하는 props들을 모두 사용가능합니다.
 * @param {string} [props.className] - 캐러샐 컴포넌트의 스타일을 위한 클래스 이름
 * @param {boolean} [props.isLoading] - 상위에서 넣어주는 children 요소에 대한 데이터를 받아오는 중인지에 대한 여부
 * @param {ReactNode} [props.skeletonCount] - isLoading이 true일 때, 기본으로 보여줄 스켈레톤 요소의 갯수
 * @param {ReactNode} [props.skeletonElement] - isLoading이 true일 때, 화면에 표현할 UI 요소
 * @param {ReactNode|ReactNode[]} [props.children] - 캐러샐 슬라이드에 표현할 리액트 자식 요소
 * @param {SwiperModule[]} [props.modules] - 스와이퍼 라이브러리에서 제공하는 기능의 모듈 (추가로 주입하여 캐러샐 컴포넌트를 확장 가능)
 * @param {string} [props.effect] - 캐러샐 요소가 슬라이드될 때 보여질 이펙트
 * @param {string|number} [props.spaceBetween] - 캐러샐 자식 요소 사이의 간격
 * @param {object} [props.breakpoints] - 반응형일 경우 가로 픽셀마다 슬라이드 요소 사이의 간격 지정을 할 수 있는 객체
 * @param {string|number} [props.slidesPerView] - 하나의 슬라이드 하면에 몇 개의 요소를 보여줄 것인지에 대한 갯수
 * @param {number} [props.threshold] - 마우스로 얼만큼의 드래그를 하여야 터치슬라이드가 동작할지 결정하는 픽셀값
 * @param {number} [props.longSwipesMs] - 최대 몇 밀리세컨드 단위의 시간 이내에 터치스와이핑을 완료하여야 슬라이드가 작동할 것인지에 대한 값(짧으면 터치감이 매우 안좋습니다.)
 * @param {number} [props.initialSlide] - 처음에 보여질 슬라이드 요소의 가장 왼쪽 인덱스
 * @param {number} [props.speed] - 슬라이드 액션의 속도(ms)
 * @param {boolean} [props.loop] - 슬라이드의 루프 여부
 * @param {boolean|AutoplayOptions} [props.autoplay] - 자동 슬라이드 여부
 * @param {boolean} [props.allowTouchMove] - 터치로 캐러샐 요소를 슬라이드 가능 여부를 설정
 * @param {boolean|NavigationOptions} [props.navigation] - 네이게이션 설정 truthy값일 시, UI에 좌우 네이게이션 버튼이 생성되어 스타일링 가능
 * @param {boolean|PaginationOptions} [props.pagination] - 페이지네이션 설정 truthy값일 시, 페이지네이션 버튼이 생성되어 스타일링 가능
 * @param {ReactNode} [props.prevButton] - navigation이 truthy값일 시, 보여줄 슬라이드 이전 버튼 UI
 * @param {ReactNode} [props.nextButton] - navigation이 truthy값일 시, 보여줄 슬라이드 다음 버튼 UI
 * @param {function} [props.onSlideChangeTransitionEnd] - 캐러샐 슬라이딩이 종료된 이후 실행될 함수. (기존에는 onSlideChange를 사용했는데, 아래의 함수가 좀 더 안전하게 실행됩니다.)
 * @param {function} [props.handleOnSlideChangeTransitionEnd] - 캐러샐 슬라이딩 이후, 해당 움직임에 대한 정보를 추가적으로 받아 사용할 수 있는 함수
 * @param {function} [props.onSlideChange] - 캐러샐 슬라이딩 도중에 실행될 함수. (allowTouchMove가 true라면 이 함수는 터치슬라이드 과정 도중 여러번 실행되기 때문에, 꼭 슬라이딩 과정 중에 필요한 함수일 경우만 사용을 권장합니다.)
 * @param {function} [props.onSwiper] - 이 컴포넌트의 외부에서 Swiper 객체를 참조할 수 있도록 setSwiper 등의 함수의 prop전달을 통해 swiper를 변수화하고 외부에서 이 변수를 참조해 메소드를 사용 가능
 * @param {function} [props.onUpdate] - Swiper 객체의 update 메소드 호출 이후 실행되는 함수
 * @param {function} [props.onPrevButtonClick] - 내비게이션 버튼이 존재할 때, 이전 버튼을 클릭할 시 실행할 수 있는 함수
 * @param {function} [props.onNextButtonClick] - 내비게이션 버튼이 존재할 때, 다음 버튼을 클릭할 시 실행할 수 있는 함수
 * @param {function} [props.onPaginationBulletClick] - 페이지네이션 불릿 버튼이 존재할 때, 해당 불릿버튼을 클릭 시 실행할 수 있고 인자로 클릭 이벤트 객체를 받는 함수
 * @param {function} [props.handleOnPaginationBulletClick] - 페이지네이션 불릿 버튼이 존재할 때, 해당 불릿버튼을 클릭 시 실행할 수 있고 인자로 캐러샐의 몇 번째 슬라이드인지 index 숫자값을 받는 함수
 */
const Carousel = ({
  className,
  isLoading = false,
  skeletonCount = 3,
  skeletonElement = null,
  children,
  modules = [],
  effect = 'slide',
  spaceBetween = 10,
  breakpoints,
  slidesPerView = 1,
  threshold = 5,
  longSwipesMs = 1000,
  initialSlide = 0,
  speed = 1000,
  loop = true,
  autoplay = false,
  allowTouchMove = true,
  navigation = false,
  pagination = false,
  prevButton = <SvgIconChevronLeft />,
  nextButton = <SvgIconChevronRight />,
  onSlideChangeTransitionEnd,
  handleOnSlideChangeTransitionEnd,
  onSlideChange,
  onSwiper,
  onUpdate,
  onPrevButtonClick,
  onNextButtonClick,
  ...rest
}: Props) => {
  const swiperRef = useRef<SwiperCore>();
  const paginationRef = useRef<HTMLDivElement>(null);

  const [prevButtonEl, setPrevButtonEl] = useState<HTMLButtonElement>();
  const [nextButtonEl, setNextButtonEl] = useState<HTMLButtonElement>();

  /**
   * 외부에서 주입된 리스트를 SwiperSlide로 래핑한 슬라이드 리스트 UI
   */
  const slideItems = useMemo(
    () =>
      isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
            <SwiperSlide key={`slide-item-${index}`}>{skeletonElement}</SwiperSlide>
          ))
        : Children.map(children, (child) => child).map((child, index) => (
            <SwiperSlide key={`slide-item-${index}`}>{child}</SwiperSlide>
          )),
    [isLoading, children, skeletonCount, skeletonElement]
  );

  /**
   * 스와이퍼 컴포넌트와 페이지네이션 요소를 연결하기 위한 랜덤 id
   */
  const randomId = useMemo(() => String(Math.random()).replace('.', ''), []);

  /**
   * 가장 왼쪽의 슬라이드 인덱스를 통해 현재 UI가 슬라이드 요소의 첫번째, 마지막, 중간
   * 셋 중 어느 부분을 보여주고 있는지 반환하는 함수.
   */
  const getSlidePosition = useCallback(
    (realIndex: number): Position => {
      const offset = (slidesPerView === 'auto' ? 1 : slidesPerView) - 1;

      const position =
        realIndex === 0
          ? 'first'
          : realIndex === slideItems.length - 1 - offset
            ? 'last'
            : 'middle';

      return position;
    },
    [slidesPerView, slideItems]
  );

  const onSwiperInit: SwiperProps['onSwiper'] = useCallback(
    (swiper) => {
      swiperRef.current = swiper;

      onSwiper && onSwiper(swiper);
    },
    [onSwiper]
  );

  useEffect(() => {
    if (swiperRef.current && navigation) {
      swiperRef.current.navigation.prevEl = prevButtonEl;
      swiperRef.current.navigation.nextEl = nextButtonEl;
    }
  }, [navigation, nextButtonEl, prevButtonEl]);

  return (
    <div className={cx('carousel-wrapper', className)}>
      <div className={cx('carousel-swiper')}>
        <Swiper
          modules={[Navigation, Pagination, FreeMode, EffectFade, ...modules]}
          effect={effect}
          slidesPerView={slidesPerView}
          initialSlide={initialSlide}
          speed={speed}
          threshold={threshold}
          longSwipesMs={longSwipesMs}
          loop={loop}
          autoplay={autoplay}
          allowTouchMove={allowTouchMove}
          breakpoints={breakpoints}
          spaceBetween={spaceBetween}
          onSlideChangeTransitionEnd={(swiper) => {
            onSlideChangeTransitionEnd?.(swiper);

            const { realIndex, activeIndex, previousIndex } = swiper;

            const position = getSlidePosition(realIndex);

            handleOnSlideChangeTransitionEnd?.({
              realIndex,
              position,
              direction: activeIndex - previousIndex > 0 ? 'next' : 'prev'
            });
          }}
          onSlideChange={onSlideChange}
          onSwiper={onSwiperInit}
          onUpdate={onUpdate}
          navigation={
            navigation
              ? {
                  prevEl: prevButtonEl,
                  nextEl: nextButtonEl,
                  ...(typeof navigation === 'boolean' ? {} : navigation)
                }
              : false
          }
          pagination={
            pagination
              ? {
                  clickable: true,
                  el: `#pagination-${randomId}`,
                  ...(typeof pagination === 'boolean' ? {} : pagination)
                }
              : false
          }
          /**
           * react swiper가 제공하는 이외의 props들은 rest props를 통해 주입
           */
          {...rest}
          style={{ ...rest.style, width: slidesPerView === 'auto' ? 'auto' : '' }}
        >
          {slideItems}
        </Swiper>
      </div>
      {navigation && (
        <div className={cx('carousel-navigation')}>
          <button ref={setPrevButtonEl} className={cx('nav-prev-btn')} onClick={onPrevButtonClick}>
            {prevButton}
          </button>
          <button ref={setNextButtonEl} className={cx('nav-next-btn')} onClick={onNextButtonClick}>
            {nextButton}
          </button>
        </div>
      )}
      {pagination && (
        <div
          ref={paginationRef}
          id={`pagination-${randomId}`}
          className={cx('carousel-pagination')}
        />
      )}
    </div>
  );
};

export default Carousel;
export type { Props as CarouselProps };
