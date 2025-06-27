import { default as originDayjs } from 'dayjs';
import { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import 'dayjs/locale/pt';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
export declare const ENGLISH_LOCALE_OBJECT: {
    readonly name: "en";
    readonly relativeTime: {
        readonly future: "in %s";
        readonly past: "%s ago";
        readonly s: "1 seconds";
        readonly ss: "%d seconds";
        readonly m: "1 min";
        readonly mm: "%d min";
        readonly h: "1 hour";
        readonly hh: "%d hours";
        readonly d: "1 day";
        readonly dd: "%d days";
        readonly w: "1 week";
        readonly ww: "%d weeks";
        readonly M: "1 month";
        readonly MM: "%d months";
        readonly y: "1 year";
        readonly yy: "%d years";
    };
};
export declare const KOREAN_LOCALE_OBJECT: {
    readonly name: "ko";
    readonly relativeTime: {
        readonly future: "%s 이후";
        readonly past: "%s 전";
        readonly s: "1 초";
        readonly ss: "%d 초";
        readonly m: "1 분";
        readonly mm: "%d 분";
        readonly h: "1 시간";
        readonly hh: "%d 시간";
        readonly d: "1 일";
        readonly dd: "%d 일";
        readonly w: "1 주";
        readonly ww: "%d 주";
        readonly M: "1 달";
        readonly MM: "%d 달";
        readonly y: "1 년";
        readonly yy: "%d 년";
    };
};
export declare const JAPAN_LOCALE_OBJECT: {
    readonly name: "ja";
    readonly relativeTime: {
        readonly future: "%s後";
        readonly past: "%s前";
        readonly s: "1秒";
        readonly ss: "%d秒";
        readonly m: "1分钟";
        readonly mm: "%d分";
        readonly h: "一時間";
        readonly hh: "%d時間";
        readonly d: "一日";
        readonly dd: "%d日";
        readonly w: "一週間";
        readonly ww: "%d週間";
        readonly M: "一か月";
        readonly MM: "%dか月";
        readonly y: "一年";
        readonly yy: "%d年";
    };
};
export declare const PORT_LOCALE_OBJECT: {
    readonly name: "pt";
    readonly relativeTime: {
        readonly future: "%s depois";
        readonly past: "%s atrás";
        readonly s: "1 segundo";
        readonly ss: "%d segundo";
        readonly m: "um minuto";
        readonly mm: "%d minutos";
        readonly h: "uma hora";
        readonly hh: "%d horas";
        readonly d: "um dia";
        readonly dd: "%d dias";
        readonly w: "uma semana";
        readonly ww: "%d semanas";
        readonly M: "há um mês";
        readonly MM: "%d meses";
        readonly y: "um ano";
        readonly yy: "%d anos";
    };
};
export declare const ZH_CN__LOCALE_OBJECT: {
    readonly name: "zh-Hans";
    readonly relativeTime: {
        readonly future: "%s後";
        readonly past: "%s前";
        readonly s: "1秒";
        readonly ss: "%d秒";
        readonly m: "1分鐘";
        readonly mm: "%d分鐘";
        readonly h: "一小時";
        readonly hh: "%d小時";
        readonly d: "一天";
        readonly dd: "%d天";
        readonly w: "一週";
        readonly ww: "%d週";
        readonly M: "一個月";
        readonly MM: "%d個月";
        readonly y: "一年";
        readonly yy: "%d年";
    };
};
export declare const ZH_TW__LOCALE_OBJECT: {
    readonly name: "zh-Hant";
    readonly relativeTime: {
        readonly future: "%s后";
        readonly past: "%s前";
        readonly s: "1秒";
        readonly ss: "%d秒";
        readonly m: "1分钟";
        readonly mm: "%d分钟";
        readonly h: "一小时";
        readonly hh: "%d小时";
        readonly d: "一天";
        readonly dd: "%d天";
        readonly w: "一周";
        readonly ww: "%d周";
        readonly M: "一个月";
        readonly MM: "%d个月";
        readonly y: "一年";
        readonly yy: "%d年";
    };
};
export declare const RELATIVE_TIME_CONFIG: {
    thresholds: ({
        l: string;
        r: number;
        d?: undefined;
    } | {
        l: string;
        r: number;
        d: string;
    } | {
        l: string;
        d: string;
        r?: undefined;
    })[];
    rounding: (x: number) => number;
};
export declare const dayjs: (date?: string | number | Dayjs | Date) => originDayjs.Dayjs;
export type RemainDateType = {
    day: number;
    hms: string;
    h: string;
    m: string;
    s: string;
    days: number;
};
/**
 * 현재시간 및 default Format
 * UTC 시간 기준인지 확인 필요
 */
export declare const defaultFormat = "YYYY-MM-DD";
export declare const getCurrentDate: () => Dayjs;
export declare const getCurrentDateUnix: () => number;
export declare const getDateUnix: (date: string | number) => number;
export declare const getTimestamp: (targetTimeStamp: number) => number;
export declare const getDateFormat: (targetTime: number | string, format?: string, locale?: string) => string;
/**
 * 특정 날짜의 일, 시, 분, 초, 요일 등의 정보 반환
 * date: 일, day: 요일, month: 달, h: 시간, m: 분, s: 초
 */
export declare const getDateDayHms: (targetTimeStamp: number) => {
    date: number;
    day: number;
    month: number;
    h: number;
    m: number;
    s: number;
};
export declare const remainDate: (target: number | string, unitOfTime?: QUnitType | OpUnitType) => number;
/**
 * 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 */
export declare const remainHms: (target: number, maintainHour?: boolean) => string | null;
/**
 * 날짜포함 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 */
export declare const remainDayHms: (target: number | string) => RemainDateType | null;
/**
 * 1일전, 1주전, 1달전 등으로 날짜 파싱처리
 */
export declare const formatRelativeTime: (targetTimeStamp: number, locale?: string) => string;
/**
 * 인자 타임스탬프 값이 현재와 얼마나 차이나는지 구하는 함수
 */
export declare const getGapFromNow: (time: number, unit: QUnitType | OpUnitType) => number;
/**
 * 인자 타임스탬프 값이 현재와 1주 이상 차이가 난다면 날짜를 그대로 보여주고 아닐 경우 1일전, 1주전, 1달전 등으로 파싱처리 하도록 분기하는 함수
 */
export declare const getTimeString: (date: string | number, locale?: string) => string;
/**
 * 인자 타임스탬프 값이 현재와 24시간 이상 차이가 난다면 빈값을 반환하는 함수 (수정된 날짜를 보여줄때 사용)
 */
export declare const getModifyTimeString: ({ createdAt, updatedAt, locale }: {
    createdAt: string | number;
    updatedAt?: string | number;
    locale?: string;
}) => string;
