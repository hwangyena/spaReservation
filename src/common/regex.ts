interface IPasswordRestriction {
  /** 대문자 필수 여부 */
  requireUppercase?: boolean;
  /** 소문자 필수 여부 */
  requireLowercase?: boolean;
  /** 숫자 필수 여부 */
  requireNumber?: boolean;
  /** 특수문자 필수 여부 */
  requireSpecialCharacter?: boolean;
  /** 허용할 특수문자 집합, 없으면 기본값 "!@#$%^&*()_+\-=~" */
  specialCharacterSet?: string;
  /** 최대 문자 길이, minLength가 없으면 무시됨 */
  minLength?: number;
  /** 최대 문자 길이, minLength가 없으면 무시됨 */
  maxLength?: number;
}

interface IPasswordRestriction {
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialCharacter?: boolean;
  specialCharacterSet?: string;
  minLength?: number;
  maxLength?: number;
}

export const makePasswordRegExp = (rule: IPasswordRestriction) => {
  if (!rule.minLength && rule.maxLength) rule.maxLength = undefined;
  const specialCharSet = rule.specialCharacterSet ? "[" + rule.specialCharacterSet + "]" : "[!@#$%^&*()_+\\-=~]";
  const requireUppercase = rule.requireUppercase ? "(?=.*[A-Z])" : "";
  const requireLowercase = rule.requireLowercase ? "(?=.*[a-z])" : "";
  const requireNumber = rule.requireNumber ? "(?=.*[0-9])" : "";
  const requireSpecialCharacter = rule.requireSpecialCharacter ? "(?=.*" + specialCharSet + ")" : "";
  const lengthRestrict = (!rule.minLength && !rule.maxLength) ? "*" : "{" + (rule.minLength ?? "") + "," + (rule.maxLength ?? "") + "}"
  return new RegExp("^" + requireUppercase + requireLowercase + requireNumber + requireSpecialCharacter + "." + lengthRestrict + "$");
}

export const REG_EXP = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  phone: /^(?:\+?82-?|0)(1(?:0|1|[6-9]))[.-]?(\d{3,4})[.-]?(\d{4})$/
}