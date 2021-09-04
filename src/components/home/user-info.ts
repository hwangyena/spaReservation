export interface UserType {
  id: string;
  name: string;
  place: string;
  date: string;
  startHour: string;
  endHour: string;
  reserveState: ReserveState;
}

export const transTime = (s: string, e: string) => {
  return s + "~" + e;
};

export enum ReserveState {
  Wait = "WAIT",
  Cancel = "CANCEL",
  Complete = "COMPLETE",
}

export const transReserveState = (v: ReserveState) => {
  switch (v) {
    case ReserveState.Wait:
      return "대기중";
    case ReserveState.Cancel:
      return "취소";
    case ReserveState.Complete:
      return "예약완료";
    default:
      return "-";
  }
};

export type colorType = (v: ReserveState) => {
  color: string;
  background: string;
};

export const transReserveColor: colorType = (v: ReserveState) => {
  switch (v) {
    case ReserveState.Wait:
      return {
        color: "#EFAD0A",
        background: "rgba(250, 192, 50, 0.1)",
      };
    case ReserveState.Cancel:
      return {
        color: "#FF6760",
        background: "rgba(255, 103, 96, 0.1)",
      };
    case ReserveState.Complete:
      return {
        color: "#16D090",
        background: "rgba(22, 208, 144, 0.1)",
      };
    default:
      return {
        color: "red",
        background: "red",
      };
  }
};

const { Wait, Cancel, Complete } = ReserveState;

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const staticUsers: UserType[] = [
  {
    id: uuidv4(),
    name: "Wilson",
    place: "쿠사츠 온천",
    date: "2021/05/05",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Wait,
  },
  {
    id: uuidv4(),
    name: "karen",
    place: "이카호 온천",
    date: "2021/06/02",
    startHour: "05:00",
    endHour: "22:00",
    reserveState: Cancel,
  },
  {
    id: uuidv4(),
    name: "Marion James",
    place: "긴잔 온천",
    date: "2021/06/11",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Cancel,
  },
  {
    id: uuidv4(),
    name: "Jane Willson",
    place: "벳푸 온천",
    date: "2021/05/05",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Complete,
  },
  {
    id: uuidv4(),
    name: "Robert",
    place: "하코네 온천",
    date: "2021/05/05",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Complete,
  },
  {
    id: uuidv4(),
    name: "Jenny",
    place: "게로 온천",
    date: "2021/05/05",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Wait,
  },
  {
    id: uuidv4(),
    name: "Zarchary Marshall",
    place: "이카호 온천",
    date: "2021/06/02",
    startHour: "05:00",
    endHour: "22:00",
    reserveState: Wait,
  },
  {
    id: uuidv4(),
    name: "Stephanie Cook",
    place: "노보리베츠 온천",
    date: "2021/06/11",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Cancel,
  },
  {
    id: uuidv4(),
    name: "Risa Kim",
    place: "뉴토 온천",
    date: "2021/05/05",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Complete,
  },
  {
    id: uuidv4(),
    name: "Zachary Marshall",
    place: "하코네 온천",
    date: "2021/05/05",
    startHour: "07:00",
    endHour: "22:00",
    reserveState: Complete,
  },
];
