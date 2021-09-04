export interface UserType {
  id: string;
  name: string;
  place: string;
  date: string;
  useHour: string;
  reserveState: ReserveState;
}

export enum ReserveState {
  Wait = "WAIT",
  Cancel = "CANCEL",
  Complete = "COMPLETE",
}

export const transReserveState = (v: ReserveState) => {
  switch (v) {
    case ReserveState.Cancel:
      return "취소";
    case ReserveState.Wait:
      return "대기중";
    case ReserveState.Complete:
      return "예약완료";
    default:
      return "-";
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
    useHour: "07:00~22:00",
    reserveState: Wait,
  },
  {
    id: uuidv4(),
    name: "karen",
    place: "이카호 온천",
    date: "2021/06/02",
    useHour: "05:00~22:00",
    reserveState: Cancel,
  },
  {
    id: uuidv4(),
    name: "Marion James",
    place: "긴잔 온천",
    date: "2021/06/11",
    useHour: "07:00~22:00",
    reserveState: Cancel,
  },
  {
    id: uuidv4(),
    name: "Jane Willson",
    place: "벳푸 온천",
    date: "2021/05/05",
    useHour: "07:00~22:00",
    reserveState: Complete,
  },
  {
    id: uuidv4(),
    name: "Robert",
    place: "하코네 온천",
    date: "2021/05/05",
    useHour: "07:00~22:00",
    reserveState: Complete,
  },
  {
    id: uuidv4(),
    name: "Jenny",
    place: "게로 온천",
    date: "2021/05/05",
    useHour: "07:00~22:00",
    reserveState: Wait,
  },
  {
    id: uuidv4(),
    name: "Zarchary Marshall",
    place: "이카호 온천",
    date: "2021/06/02",
    useHour: "05:00~22:00",
    reserveState: Wait,
  },
  {
    id: uuidv4(),
    name: "Stephanie Cook",
    place: "노보리베츠 온천",
    date: "2021/06/11",
    useHour: "07:00~22:00",
    reserveState: Cancel,
  },
  {
    id: uuidv4(),
    name: "Risa Kim",
    place: "뉴토 온천",
    date: "2021/05/05",
    useHour: "07:00~22:00",
    reserveState: Complete,
  },
  {
    id: uuidv4(),
    name: "Zachary Marshall",
    place: "하코네 온천",
    date: "2021/05/05",
    useHour: "07:00~22:00",
    reserveState: Complete,
  },
];
