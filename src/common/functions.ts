import Parser from "ua-parser-js";
import { IncomingMessage } from "http";
import cookie from "cookie";

type ServerSideRequestType = IncomingMessage & {
  cookies?: {
    [key: string]: any;
  };
};

export type DeviceType = "MOBILE" | "TABLET" | "DESKTOP";

/**
 * SSR중에 디바이스의 타입을 확인하는 함수
 * @param req getServerSideProps의 req
 * @returns 현재 디바이스의 타입
 */
export const getDeviceType = (req?: ServerSideRequestType): DeviceType => {
  let userAgent;
  if (req) {
    userAgent = Parser(req.headers["user-agent"] || "");
  } else {
    userAgent = new Parser().getResult();
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
 * 돈 바꿔주는 함수
 * @param value 숫자 혹은 숫자로 이루어진 문자
 * @param option prefix: 접두사, suffix: 접미사
 * @returns 콤마가 붙은 숫자
 */
export const transMoneyFormat = (
  value: string | number,
  option?: { prefix?: string; suffix?: string }
): string => {
  let result = value;
  if (typeof result === "string") {
    result = Number(result.replace(/[^0-9]/g, "")).toLocaleString();
  } else if (typeof result === "number") {
    result = result.toLocaleString();
  }
  result ?? "0";

  return `${option?.prefix ?? ""}${result}${option?.suffix ?? ""}`;
};

/**
 * iamport 결제용 merchantId
 */
export const getMerchantUid = (userId?: number): string =>
  (userId ?? "u" + Math.floor(Math.random() * 1000)) +
  "_" +
  new Date().toISOString();

/**
 * 서버사이드중에 쿠키 파싱
 * @param req
 * @returns 쿠키
 */
export const parseCookies = (req: ServerSideRequestType) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};

/**
 * uuid 생성 함수
 * @returns uuid
 */
export const createUuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
