import { ArgumentArray } from 'classnames';
/**
 * classNames/bind 모듈을 같이 활용하여 컴포넌트별 uniq한 className과 global className을 같이 반환하는 함수
 *
 * 사용법은 classNames.bind 함수와 동일합니다.
 *
 * @param {{ readonly [key: string]: string }} style - *.module.scss를 import한 객체
 * @returns CSS className 결과물
 */
export declare const makeCxFunc: (style: {
    readonly [key: string]: string;
}) => (...args: ArgumentArray) => string;
export declare const cn: (...args: Array<string | number | boolean | undefined | Record<string, JSONObject>>) => string;
