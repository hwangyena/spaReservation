import add from "date-fns/add";
import format from "date-fns/format";
import { VARIABLES } from ".";

/**
 * pg사 종류
 */
export enum IamportPg {
  /**
   * 이니시스웹표준
   */
  Inicis = 'html5_inicis',
  /**
   * 카카오페이
   */
  Kakaopay = 'kakaopay',
  /**
   * 페이코
   */
  Payco = 'payco',
  /**
   * 페이팔
   */
  Paypal = 'paypal',
}

/**
 * 결제수단
 */
export enum IamportPayMethod {
  /**
   * 신용카드
   */
  Card = 'card',
  /**
   * 실시간계좌이체
   */
  Trans = 'trans',
  /**
   * 가상계좌
   */
  Vbank = 'vbank',
  /**
   * 휴대폰소액결제
   */
  Phone = 'phone',
  /**
   * 삼성페이 / 이니시스, KCP 전용
   */
  Samsung = 'samsung',
  /**
   * 카카오페이 직접호출 / 이니시스, KCP, 나이스페이먼츠 전용
   */
  Kakaopay = 'kakaopay',
  /**
   * 페이코 직접호출 / 이니시스, KCP 전용
   */
  Payco = 'payco',
  /**
   * 토스간편결제 직접호출 / 이니시스 전용
   */
  Tosspay = 'tosspay',
}

/**
 * 결제정보
 */
export type IamportData = {
  /**
   * pg사 종류
   */
  pg?: IamportPg
  /**
   * 결제수단
   */
  payMethod: IamportPayMethod
  /**
   * 주문번호
   */
  merchantUid: string
  /**
   * 상품명
   */
  productName: string
  /**
   * 가격
   */
  amount: number
  /**
   * 이메일
   */
  email: string
  /**
   * 이름
   */
  name: string
  /**
   * 연락처
   */
  tel: string
  /**
   * 주소
   */
  address: string
  /**
   * 우편번호
   */
  postcode: string
  /**
   * 가상계좌입금기한
   */
  vbankDueHour?: number
  /**
   * 모바일결제시 리다이렉트 url
   */
  mobileRedirectUrl: string
}

export interface IamportType {
  /**
   * 결제정보
   */
  data: IamportData
  /**
   * 스크롤 업 여부
   */
  isScrollToTop?: boolean
  /**
   * 성공시 실행 함수
   */
  onSuccess: () => void
  /**
   * 실패시 실행 함수
   */
  onFailure: () => void
}

export const onIamport = (p: IamportType) => {
  if (p.isScrollToTop) {
    window.scrollTo(0, 0);
  }

  const { IMP } = window as any;

  IMP.init(VARIABLES.IAMPORT);

  const value = {
    pg: p.data.pg ?? IamportPg.Inicis,
    pay_method: p.data.payMethod,
    merchant_uid: p.data.merchantUid,
    name: p.data.productName,
    amount: p.data.amount,
    buyer_email: p.data.email,
    buyer_name: p.data.name,
    buyer_tel: p.data.tel,
    buyer_addr: p.data.address,
    buyer_postcode: p.data.postcode,
    vbank_due: format(add(new Date(), { hours: p.data.vbankDueHour ?? 24 }), "yyyyMMddHHmm"),
    m_redirect_url: p.data.mobileRedirectUrl,
  }

  const callback = (response: any) => {
    if (response.success) {
      p.onSuccess();
    } else {
      p.onFailure();
    }
  };

  IMP.request_pay(value, callback);
}