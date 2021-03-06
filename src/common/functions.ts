import UAParser from "ua-parser-js";
import { IncomingMessage } from "http";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import cookie from "cookie";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { VARIABLES } from ".";

export type DeviceType = "MOBILE" | "TABLET" | "DESKTOP";

type ServerSideRequestType =
  | (IncomingMessage & { cookies?: { [key: string]: any } })
  | undefined;

/**
 * 서버사이드중에 쿠키를 파싱하는 함수
 * @param req IncomingMessage
 * @returns 쿠키들
 */
export const parseCookies = (req: ServerSideRequestType) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};

/**
 * SSR중에 디바이스의 타입을 확인하는 함수(Next.js에서만 사용)
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
 * 토큰 검사 고차함수
 * getServerSideProps 의 고차함수로 사용
 */
export const withAuth = (
  getServerSideProps: (
    ctx: GetServerSidePropsContext<ParsedUrlQuery>
  ) => Promise<GetServerSidePropsResult<{ [key: string]: any }>>
): GetServerSideProps => {
  return async ctx => {
    const cookies = parseCookies(ctx.req);
    if (!isTokenHasAdminId(cookies[VARIABLES.ACCESS_TOKEN])) {
      return {
        redirect: {
          destination: "/sign",
          permanent: false,
        },
      };
    }
    return getServerSideProps(ctx);
  };
};

/**
 * 해당 토큰이 어드민 토큰인지 확인하는 함수
 */
export const isTokenHasAdminId = (
  token: string | undefined,
  id = "adminId"
) => {
  if (!token) return false;
  return decodeToken(token)[id] !== undefined;
};

/**
 * JWT 토큰 분해하는 함수
 */
export const decodeToken = (token: string | null | undefined) =>
  token
    ? JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("utf8"))
    : "";

/**
 * 돈 바꿔주는 함수
 * @param value 숫자 혹은 숫자로 이루어진 문자
 * @param option prefix: 접두사, suffix: 접미사
 * @returns 콤마가 붙은 숫자
 */
export const formatToComma = (
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
 * 시간 포맷 함수
 * @param date iso 날짜
 * @param dateFormat 포맷형식(선택)
 */
export const formatToUtc = (
  date: Date | string,
  dateFormat?: string
): string => {
  return format(new Date(date ?? 0), dateFormat ?? "yyyy-MM-dd", {
    locale: ko,
  });
};

/**
 * iamport 주문번호 생성 함수
 * @param userId 유저ID(선택)
 * @returns 주문번호
 */
export const getMerchantUid = (userId?: number): string => {
  return (
    (userId ?? "u" + Math.floor(Math.random() * 1000)) +
    "_" +
    new Date().toISOString()
  );
};
