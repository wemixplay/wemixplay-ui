'use client';

import React, { ErrorInfo, ReactElement, ReactNode, createElement } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import Spinner from '../loadings/Spinner';

import style from './ErrorBoundary.module.scss';

interface PropsType {
  /**
   * 에러가 발생하지 않았으시 랜더링할 자식 컴포넌트
   */
  children: ReactNode;
  /**
   * 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
   */
  fallback?: ReactNode | ReactElement | string;
  /**
   * 에러를 커스텀하게 따로 처리하고 싶을 경우 호출하는 함수
   * @param {Error} [params.error] 에러 정보
   * @param {ErrorInfo} [params.reactError] react 에러 정보
   */
  handleError?: ({
    error,
    reactError
  }: {
    error: Error;
    reactError: ErrorInfo;
  }) => void | Promise<void>;
}

interface StateType {
  /**
   * 에러가 발생했는지 여부
   */
  hasError: boolean;
  /**
   * 에러 정보
   */
  error?: Error;
  /**
   * 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
   */
  fallback?: ReactNode | ReactElement | string;
}

const cx = makeCxFunc(style);

/**
 * ErrorBoundary 컴포넌트는 자식 컴포넌트 트리에서 발생하는 JavaScript 에러를 캐치하여
 * 전체 애플리케이션이 충돌하는 것을 방지합니다. 대신, 에러가 발생했을 때 대체 UI를 렌더링할 수 있습니다.
 * @component
 * @param {ReactNode} props.children - 에러가 발생하지 않았으시 랜더링할 자식 컴포넌트
 * @param {ReactNode | ReactElement | string} [props.fallback] - 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
 * @example
 * <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component<PropsType, StateType> {
  /**
   * 생성자 함수는 컴포넌트의 초기 상태를 설정합니다.
   * @param {PropsType} props - 컴포넌트에 전달된 props
   */
  constructor(props: PropsType) {
    super(props);

    /**
     * 에러가 발생했을 때 호출되는 생명주기 메서드입니다. 이 메서드는 에러가 발생하면
     * 컴포넌트 상태를 업데이트하여 대체 UI를 렌더링할 수 있게 합니다.
     * @param {Error} error - 발생한 에러
     * @returns {StateType} 업데이트될 상태 객체
     */
    this.state = {
      hasError: false,
      fallback: props.fallback ?? (
        <div className={cx('error-boundary')}>
          <Spinner />
        </div>
      )
    };
  }

  static getDerivedStateFromError(error: Error): StateType {
    return { hasError: true, error };
  }

  /**
   * 에러 정보를 캐치하고 로그를 남길 수 있는 메서드입니다.
   * @param {Error} error - 발생한 에러
   * @param {React.ErrorInfo} reactError - 에러에 대한 추가 정보
   */
  componentDidCatch(error: Error, reactError: ErrorInfo) {}

  render() {
    if (this.state.hasError) {
      // 에러 발생시 fallback 렌더링
      return this.state.fallback;
    }

    // 에러가 없을 때 자식 컴포넌트 렌더링
    return this.props.children;
  }
}

export type { PropsType as ErrorBoundaryProps, StateType as ErrorBoundaryState };
export default ErrorBoundary;
