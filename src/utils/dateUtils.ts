import { pad } from './valueParserUtils';
import { default as originDayjs } from 'dayjs';
import { Dayjs, OpUnitType, QUnitType } from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import 'dayjs/locale/pt';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';

export const ENGLISH_LOCALE_OBJECT = {
  name: 'en',
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1 seconds',
    ss: '%d seconds',
    m: '1 min',
    mm: '%d min',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    w: '1 week',
    ww: '%d weeks',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
} as const;

export const KOREAN_LOCALE_OBJECT = {
  name: 'ko',
  relativeTime: {
    future: '%s 이후',
    past: '%s 전',
    s: '1 초',
    ss: '%d 초',
    m: '1 분',
    mm: '%d 분',
    h: '1 시간',
    hh: '%d 시간',
    d: '1 일',
    dd: '%d 일',
    w: '1 주',
    ww: '%d 주',
    M: '1 달',
    MM: '%d 달',
    y: '1 년',
    yy: '%d 년'
  }
} as const;

export const JAPAN_LOCALE_OBJECT = {
  name: 'ja',
  relativeTime: {
    future: '%s後',
    past: '%s前',
    s: '1秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分',
    h: '一時間',
    hh: '%d時間',
    d: '一日',
    dd: '%d日',
    w: '一週間',
    ww: '%d週間',
    M: '一か月',
    MM: '%dか月',
    y: '一年',
    yy: '%d年'
  }
} as const;

export const PORT_LOCALE_OBJECT = {
  name: 'pt',
  relativeTime: {
    future: '%s depois',
    past: '%s atrás',
    s: '1 segundo',
    ss: '%d segundo',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    w: 'uma semana',
    ww: '%d semanas',
    M: 'há um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
} as const;

export const ZH_CN__LOCALE_OBJECT = {
  name: 'zh-Hans',
  relativeTime: {
    future: '%s後',
    past: '%s前',
    s: '1秒',
    ss: '%d秒',
    m: '1分鐘',
    mm: '%d分鐘',
    h: '一小時',
    hh: '%d小時',
    d: '一天',
    dd: '%d天',
    w: '一週',
    ww: '%d週',
    M: '一個月',
    MM: '%d個月',
    y: '一年',
    yy: '%d年'
  }
} as const;

export const ZH_TW__LOCALE_OBJECT = {
  name: 'zh-Hant',
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '1秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '一小时',
    hh: '%d小时',
    d: '一天',
    dd: '%d天',
    w: '一周',
    ww: '%d周',
    M: '一个月',
    MM: '%d个月',
    y: '一年',
    yy: '%d年'
  }
} as const;

export const RELATIVE_TIME_CONFIG = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'ss', r: 59, d: 'second' },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 6, d: 'day' },
    { l: 'w', r: 1 },
    { l: 'ww', r: 3, d: 'week' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 1 },
    { l: 'yy', d: 'year' }
  ],
  rounding: Math.floor
};

originDayjs.extend(utc);
originDayjs.extend(timezone);
originDayjs.extend(isBetween);
originDayjs.extend(advancedFormat);

originDayjs.extend(relativeTime, RELATIVE_TIME_CONFIG);
originDayjs.extend(updateLocale);

originDayjs.updateLocale('en', ENGLISH_LOCALE_OBJECT);
originDayjs.updateLocale('ko', KOREAN_LOCALE_OBJECT);
originDayjs.updateLocale('pt', PORT_LOCALE_OBJECT);
originDayjs.updateLocale('zh-cn', ZH_CN__LOCALE_OBJECT);
originDayjs.updateLocale('zh-tw', ZH_TW__LOCALE_OBJECT);
originDayjs.updateLocale('ja', JAPAN_LOCALE_OBJECT);

export const dayjs = (date?: string | number | Dayjs | Date) =>
  originDayjs(date)?.isUTC ? originDayjs(date) : originDayjs(date)?.utc();

export type RemainDateType = {
  day: number;
  hms: string;
  h: string;
  m: string;
  s: string;
  days: number;
};

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const DAYS_IN_A_YEAR = 365;
const DAYS_IN_A_WEEK = 7;

const pareLocale = (locale: string) => {
  switch (locale) {
    case 'zh-Hant':
      return 'zh-cn';

    case 'zh-Hans':
      return 'zh-tw';

    default:
      return locale;
  }
};

/**
 * 현재시간 및 default Format
 * UTC 시간 기준인지 확인 필요
 */
export const defaultFormat = 'YYYY-MM-DD';

export const getCurrentDate = (): Dayjs => {
  return dayjs(dayjs().format(defaultFormat));
};

export const getCurrentDateUnix = (): number => {
  return +dayjs().unix();
};
export const getDateUnix = (date: string | number): number => {
  return +dayjs(date).unix();
};

export const getTimestamp = (targetTimeStamp: number) => {
  return +dayjs(String(targetTimeStamp).length === 13 ? targetTimeStamp : targetTimeStamp * 1000);
};

export const getDateFormat = (
  targetTime: number | string,
  format = defaultFormat,
  locale = 'en'
) => {
  locale = pareLocale(locale);

  return dayjs(typeof targetTime === 'string' ? targetTime : getTimestamp(targetTime))
    .locale(locale)
    .format(format);
};

/**
 * 특정 날짜의 일, 시, 분, 초, 요일 등의 정보 반환
 * date: 일, day: 요일, month: 달, h: 시간, m: 분, s: 초
 */
export const getDateDayHms = (targetTimeStamp: number) => {
  const result = dayjs(getTimestamp(targetTimeStamp));

  return {
    date: result.get('date'),
    day: result.get('day'),
    month: result.get('month') + 1,
    h: result.get('h'),
    m: result.get('m'),
    s: result.get('s')
  };
};

const renderHms = (sec: number, maintainHour: boolean) => {
  let s = Math.floor(sec);
  const h = Math.floor(s / HOUR);
  s -= h * HOUR;
  const m = Math.floor(s / MINUTE);
  s -= m * MINUTE;
  const hh = maintainHour ? `${pad(h, '0', 2)}:` : '';
  return `${hh}${pad(m, '0', 2)}:${pad(s, '0', 2)}`;
};

export const remainDate = (target: number | string, unitOfTime: QUnitType | OpUnitType = 'day') => {
  const timeDiff = 0;
  const v = dayjs(target).diff(dayjs(+new Date() + timeDiff), unitOfTime);
  if (v < 0) return 0;
  return v;
};

/**
 * 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 */
export const remainHms = (target: number, maintainHour = true): string | null => {
  target = getTimestamp(target);

  const v = remainDate(target, 'second');
  if (v <= 0) return null;
  return renderHms(v, maintainHour);
};

/**
 * 날짜포함 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 */
export const remainDayHms = (target: number | string): RemainDateType | null => {
  if (typeof target === 'number') target = getTimestamp(target);

  const now = dayjs(Date.now());
  const then = dayjs(+target);
  let s = then.diff(now, 'second');
  if (s < 0) return null;
  const day = Math.floor(s / DAY);
  s -= day * DAY;
  const hms = renderHms(s, true);
  const days =
    Math.floor(then.toDate().getTime() / DAY / 1000) -
    Math.floor(now.toDate().getTime() / DAY / 1000);
  return { day, days, hms, h: hms.slice(0, 2), m: hms.slice(3, 5), s: hms.slice(6, 8) };
};

/**
 * 1일전, 1주전, 1달전 등으로 날짜 파싱처리
 */
export const formatRelativeTime = (targetTimeStamp: number, locale = 'en') => {
  locale = pareLocale(locale);
  targetTimeStamp = getTimestamp(targetTimeStamp);
  return dayjs(targetTimeStamp).locale(locale).fromNow();
};

/**
 * 인자 타임스탬프 값이 현재와 얼마나 차이나는지 구하는 함수
 */
export const getGapFromNow = (time: number, unit: QUnitType | OpUnitType) => {
  time = getTimestamp(time);

  const now = dayjs();
  const txnTime = dayjs(time);
  return Math.floor(txnTime.diff(now, unit, true));
};

/**
 * 인자 타임스탬프 값이 현재와 1주 이상 차이가 난다면 날짜를 그대로 보여주고 아닐 경우 1일전, 1주전, 1달전 등으로 파싱처리 하도록 분기하는 함수
 */
export const getTimeString = (date: string | number, locale = 'en') => {
  locale = pareLocale(locale);
  const targetTimeStamp = typeof date === 'string' ? getDateUnix(date) : date;

  const daysGap = Math.abs(getGapFromNow(targetTimeStamp, 'day'));
  const currentYear = new Date().getFullYear();
  const targetYear = dayjs(getTimestamp(targetTimeStamp)).format('YYYY');

  const isOneWeekAgo = daysGap >= DAYS_IN_A_WEEK;

  let dateFormat = locale === 'ko' ? 'YYYY년 MM월 DD일' : 'MMM D, YYYY';

  if (Number(currentYear) === Number(targetYear)) {
    dateFormat = locale === 'ko' ? 'MM월 DD일' : 'MMM D';
  }

  return isOneWeekAgo
    ? dayjs(getTimestamp(targetTimeStamp)).format(dateFormat)
    : formatRelativeTime(targetTimeStamp, locale);
};

/**
 * 인자 타임스탬프 값이 현재와 24시간 이상 차이가 난다면 빈값을 반환하는 함수 (수정된 날짜를 보여줄때 사용)
 */
export const getModifyTimeString = ({
  createdAt,
  updatedAt,
  locale = 'en'
}: {
  createdAt: string | number;
  updatedAt?: string | number;
  locale?: string;
}) => {
  if (!updatedAt || createdAt === updatedAt) {
    return getTimeString(createdAt, locale);
  }

  locale = pareLocale(locale);
  const targetTimeStamp = typeof updatedAt === 'string' ? getDateUnix(updatedAt) : updatedAt;

  const hoursGap = Math.abs(getGapFromNow(targetTimeStamp, 'hour'));

  if (hoursGap < 24) {
    const timeStr = formatRelativeTime(targetTimeStamp, locale);

    switch (locale) {
      case 'ko':
        return `${timeStr}에 수정됨`;
      case 'ja':
        return `${timeStr}修正`;
      case 'pt':
        return `Editado há ${timeStr}`;
      case 'zh-Hans':
        return `${timeStr}编辑`;
      case 'zh-Hant':
        return `${timeStr}編輯`;
      default:
        return `Modified ${timeStr}`;
    }
  }

  return getTimeString(createdAt, locale);
};
