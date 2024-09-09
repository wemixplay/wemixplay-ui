'use client';
import React, {
  CSSProperties,
  MouseEvent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import style from './Ellipsis.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import { SvgIcoEllipsisChevron } from '@/assets/svgs';

if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

const cx = makeCxFunc(style);

interface Props {
  className?: string;
  /**
   * 컴포넌트 내부에 표시할 내용
   */
  content: ReactNode;
  /**
   * 내용 펼치기 버튼에 표시될 내용
   */
  triggerMore?: ReactNode;
  /**
   * 내용 숨기기 버튼에 표시될 내용
   */
  triggerLess?: ReactNode;
  /**
   * 줄임처리된 이후의 컨텐츠 문장의 수
   */
  lineClamp: number;
  /**
   * 기본으로 말줄임 처리를 할것인지에 대한 여부
   */
  defaultShortened?: boolean;
  /**
   * 관측하는 디바이스의 환경 boolean 배열
   */
  observingEnvs?: boolean[];
  onShowMoreLessClick?: () => void;
}

/**
 * `Ellipsis` 컴포넌트는 텍스트의 양이 많은 리액트 요소를 래핑하여 말줄임 처리를 쉽게 처리할 수 있도록 돕는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 엘립시스 컴포넌트의 스타일을 위한 클래스 이름
 * @param {ReactNode} [props.content] - 표시할 텍스트 값인 string 또는 ReactElement 요소
 * @param {ReactNode} [props.triggerMore] - 펼치기 버튼에 나타낼 값인 string 또는 ReactElement 요소
 * @param {ReactNode} [props.triggerLess] - 접기 버튼에 나타낼 값인 string 또는 ReactElement 요소
 * @param {number} [props.lineClamp] - 텍스트 요소를 접었을 때 나타낼 문장의 수
 * @param {boolean} [props.defaultShortened] - 기본적으로 컨텐츠 영역이 말줄임 처리가 될 것인지에 대한 여부 boolean 값
 * @param {boolean[]} [props.observingEnvs] - 관측하는 디바이스의 환경 boolean 배열
 */
const Ellipsis = ({
  className,
  content = '',
  triggerMore = 'more',
  triggerLess = 'less',
  lineClamp = 2,
  defaultShortened = false,
  observingEnvs = [],
  onShowMoreLessClick
}: Props) => {
  /**
   * 컨텐츠 영역의 높이와 컨텐츠 자체의 높이를 비교하기 위한 div DOM 요소 참조변수
   */
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * content가 변경되어 shortened를 true로 변경할 때, 해당 변경이 애니메이션을 위한 height값 측정임을 나타내는 flag 참조값
   */
  const isMeasuringRef = useRef(false);

  /**
   * 각 디바이스 환경에 대한 boolean 여부를 저장하는 참조변수
   */
  const prevObservingEnvs = useRef([...observingEnvs]);

  /**
   * 말줄임 처리 여부에 대한 UI 상태
   */
  const [shortened, setShortened] = useState(defaultShortened);

  /**
   * 펼치기 버튼의 가시성 여부에 대한 UI 상태
   */
  const [triggerVisibile, setTriggerVisible] = useState(true);

  /**
   * content prop의 타입에 따른 컨텐츠 요소
   */
  const contentElement = useMemo(() => {
    const contentStyle: CSSProperties = shortened
      ? {
          lineClamp,
          WebkitLineClamp: lineClamp,
          height: contentRef.current?.style.minHeight
        }
      : {
          lineClamp: 'unset',
          WebkitLineClamp: 'unset',
          height: contentRef.current?.style.maxHeight
        };

    return typeof content === 'string' ? (
      <div
        ref={contentRef}
        className={cx('ellipsis-content')}
        style={contentStyle}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    ) : (
      <div ref={contentRef} className={cx('ellipsis-content')} style={contentStyle}>
        {content}
      </div>
    );
  }, [content, lineClamp, shortened]);

  /**
   * 말줄임 on, off시 transition 애니메이션을 위해 inline으로 height 스타일 값을 부여합니다.
   * null일 때는, content가 변경되어 다시 height 값을 측정하는 경우입니다.
   */
  const allocateContentElementStyle = useCallback(
    (style: { openHeight: number; closeHeight: number } | null) => {
      const { current: contentEl } = contentRef;

      if (contentEl) {
        const { style: contentStyle } = contentEl;

        if (style) {
          const { openHeight, closeHeight } = style;

          contentStyle.maxHeight = `${openHeight}px`;
          contentStyle.minHeight = `${closeHeight}px`;
          contentStyle.height = `${closeHeight}px`;
        } else {
          contentStyle.maxHeight = ``;
          contentStyle.minHeight = ``;
          contentStyle.height = ``;
        }
      }
    },
    []
  );

  /**
   * content 요소나 기기환경이 변경되었다면, 해당 상태에서 말줄임이 필요한 것인지 여부를 판별하기 위해 content의 inline 스타일을 모두 제거하고 shortened를 true로 변경합니다.
   */
  const initializeContentElement = useCallback(() => {
    allocateContentElementStyle(null);
    setShortened(true);

    // 아래의 ref를 true로 변경하여 shortened를 true로 변경하는 것이 말줄임이 필요한 것인지 판별하는 것임을 알려줍니다.
    isMeasuringRef.current = true;
  }, [allocateContentElementStyle]);

  /**
   * 말줄임 처리가 필요하여 shortened가 true로 변경되었을 경우 호출되는 함수입니다.
   * 컨텐츠의 보이는 높이가 실제 높이(스크롤 포함)보다 작은지 판별하고 그 여부로 트리거 버튼의 가시성 여부를 결정합니다.
   */
  const resetContentElementAfterMeasuring = useCallback(
    ({ openHeight, closeHeight }: { openHeight: number; closeHeight: number }) => {
      allocateContentElementStyle({
        openHeight,
        closeHeight
      });

      setTriggerVisible(closeHeight + 10 < openHeight);
      setShortened(defaultShortened);

      isMeasuringRef.current = false;
    },
    [defaultShortened, allocateContentElementStyle]
  );

  const handleToggleShortEnd = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShortened((shortened) => !shortened);
  }, []);

  useLayoutEffect(() => {
    // 이 effect는 content가 변경되었을 때 발동합니다. 말줄임 처리를 true로 변환하고 말줄임 처리가 필요한지 판별합니다.
    const { current: contentEl } = contentRef;

    if (contentEl) {
      initializeContentElement();
    }
  }, [initializeContentElement]);

  useLayoutEffect(() => {
    // 이 effect는 관측하는 디바이스 환경이 변경되었을 때 발동합니다.
    const { current: contentEl } = contentRef;

    if (contentEl) {
      // observingEnvs 배열 중 boolean이 변경되었다면, 기기가 변경되었다는 뜻이므로 initializeContentElement 함수를 호출해 말줄임 처리를 true로 변환하고 말줄임 처리가 필요한지 판별합니다.
      const isEnvChanged = observingEnvs.length
        ? observingEnvs.some((env, index) => env !== prevObservingEnvs.current[index])
        : false;

      if (isEnvChanged) {
        prevObservingEnvs.current = [...observingEnvs];

        initializeContentElement();
      }
    }
  }, [observingEnvs, initializeContentElement, resetContentElementAfterMeasuring]);

  useLayoutEffect(() => {
    const { current: contentEl } = contentRef;

    // shortened가 true이고 isMeasuringRef.current가 true일 때는 아래의 함수호출을 통해 말줄임 상태가 필요한지 판별하고, defaultShortened prop의 값으로 말줄임 상태를 초기화합니다.
    if (shortened && isMeasuringRef.current && contentEl) {
      resetContentElementAfterMeasuring({
        openHeight: contentEl.scrollHeight,
        closeHeight: contentEl.offsetHeight
      });
    }
  }, [shortened, content, observingEnvs, resetContentElementAfterMeasuring]);

  return (
    <div
      className={cx('ellipsis-wrap', className, {
        shortened,
        'enable-show-more': onShowMoreLessClick
      })}
    >
      {contentElement}

      {triggerVisibile && (
        <button
          onClick={onShowMoreLessClick ? onShowMoreLessClick : handleToggleShortEnd}
          className={cx('btn-ellipsis-trigger')}
        >
          {shortened ? triggerMore : triggerLess}
          <SvgIcoEllipsisChevron width={14} height={14} />
        </button>
      )}
    </div>
  );
};

export default Ellipsis;
export type { Props as EllipsisProps };
