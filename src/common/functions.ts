import UAParser from "ua-parser-js";
import { IncomingMessage } from "http";
import cookie from "cookie";
import format from "date-fns/format";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import ko from "date-fns/locale/ko";

export type DeviceType = "MOBILE" | "TABLET" | "DESKTOP";

type ServerSideRequestType =
  | (IncomingMessage & { cookies?: { [key: string]: any } })
  | undefined;

/**
 * SSR중에 디바이스의 타입을 확인하는 함수
 * @param req getServerSideProps의 req
 * @returns 현재 디바이스의 타입
 */
export const getDeviceType = (req?: ServerSideRequestType): DeviceType => {
  let userAgent: UAParser.IResult;

  if (req) {
    userAgent = UAParser(req.headers["user-agent"] || "");
  } else {
    userAgent = new UAParser().getResult();
  }
  const deviceType = userAgent?.device?.type;

  switch (deviceType) {
    case "mobile":
      return "MOBILE";
    case "tablet":
      return "TABLET";
    default:
      return "DESKTOP";
  }
};

/**
 * 서버사이드중에 쿠키를 파싱하는 함수
 * @param req IncomingMessage
 * @returns 쿠키들
 */
export const parseCookies = (req: ServerSideRequestType) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};

/**
 * 돈 바꿔주는 함수
 * @param value 숫자 혹은 숫자로 이루어진 문자
 * @param option prefix: 접두사, suffix: 접미사
 * @returns 콤마가 붙은 숫자
 */
export const formatToMoney = (
  value: string | number,
  option?: { prefix?: string; suffix?: string }
): string => {
  let result = value;

  switch (typeof result) {
    case "string":
      result = Number(result.replace(/[^0-9]/g, "")).toLocaleString();
      break;
    case "number":
      result = result.toLocaleString();
      break;
    default:
      result = "0";
      break;
  }

  return `${option?.prefix ?? ""}${result}${option?.suffix ?? ""}`;
};

/**
 * iso 시간을 포맷화 시켜주는 함수
 * @param date iso 날짜
 * @param dateFormat 포맷형식(선택)
 */
export const formatToUtc = (date = "", dateFormat?: string): string => {
  return format(new Date(date ?? 0), dateFormat ?? "yyyy-MM-dd");
};

/**
 * 현재시간과 비교했을 때 남은 시간을 알려주는 함수
 * @param dateTime ISO날짜
 * @param addSuffix 접두사 여부
 * @returns 남은 시간
 */
export const compareToday = (dateTime: string, addSuffix = true): string => {
  return formatDistanceToNowStrict(new Date(dateTime ?? 0), {
    locale: ko,
    addSuffix: addSuffix,
  });
};

/**
 * iamport 주문번호 생성 함수
 * @param userId 유저ID(선택)
 * @returns 주문번호
 */
export const getMerchantUid = (userId?: number): string => {
  return ((userId ?? "u" + Math.floor(Math.random() * 1000)) + "_" + new Date().toISOString());
};
