/** 배송비를 한글로 파싱 */
export const transShippingFeeType = (value: string): string => {
  switch (value) {
    case "FREE":
      return "무료";
    case "PREPAID":
      return "선불";
    case "COD":
      return "착불";
    case "COND_FREE":
      return "조건부 무료";
    default:
      return "";
  }
};