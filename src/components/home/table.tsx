import React from "react";
import styled from "styled-components";
import {
  transReserveState,
  UserType,
  transReserveColor,
  colorType,
} from "./user-info";
import { ICONS } from "src/assets";

const Container = styled.main`
  table {
    width: 100%;
    background: white;
    line-height: 24px;
    border-collapse: collapse;
    box-shadow: var(--shadow);

    tr,
    td {
      padding: 20px 0 20px 19px;
      border-bottom: 1px solid #dee7f4;
      color: #52575c;
      font-size: 14px;
      font-style: normal;
      font-weight: normal;
      font-family: Roboto;
    }
    thead {
      td {
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        border-bottom: 2px solid #dee7f4;
        color: #000;
      }
    }
    tbody {
      tr:hover {
        td {
          background: #dfe5eb;
        }
      }
    }
    tr:last-child,
    td {
      border-bottom: 0;
    }
  }
`;

const UnCheckedBox = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid #c9d2db;
  border-radius: 4px;
  background: #fff;
`;

const CheckedBox = styled.div`
  width: 16px;
  height: 16px;

  /* margin: 19px 127px 19px 21px; */
  display: flex;

  border-radius: 4px;
  background: #4173ea;
  background-image: url(${ICONS.CHECK});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center center;
`;

const ReservationButton = styled.div<{ color: string; background: string }>`
  width: 79px;
  height: 22px;
  font-size: 12px;
  border: 0;
  border-radius: 100px;
  text-align: center;

  color: ${props => props.color};
  background: ${props => props.background};
`;

interface Props {
  usersDefault: UserType[];
  usersInfo: UserType[];
  onChecked: (v: string) => void;
  checkedUsers: string[];
  onCheckedAll: () => void;
}

const Table = ({
  usersDefault,
  usersInfo,
  onChecked,
  checkedUsers,
  onCheckedAll,
}: Props) => {
  return (
    <Container>
      <table>
        <colgroup>
          <col width={"8%"} />
          <col width={"15%"} />
          <col width={"15%"} />
          <col width={"15%"} />
          <col width={"15%"} />
          <col width={"15%"} />
        </colgroup>
        <thead>
          <tr>
            <td>
              {checkedUsers.length === usersDefault.length ? (
                <CheckedBox onClick={onCheckedAll} />
              ) : (
                <UnCheckedBox onClick={onCheckedAll} />
              )}
            </td>
            <td>유저명</td>
            <td>온천명</td>
            <td>신청날짜</td>
            <td>이용시간</td>
            <td>예약상태</td>
          </tr>
        </thead>
        <tbody>
          {usersInfo.map((v, i) => (
            ////call-back 따로 적용하려니까.. return 값때문에 어캐하는지 모르겟움 ㅜ
            <tr key={i} onClick={() => onChecked(v.id)}>
              <td>
                {/* 전체 값 */}
                {checkedUsers.includes(v.id) ? (
                  <CheckedBox />
                ) : (
                  <UnCheckedBox />
                )}
              </td>
              <td>{v.name}</td>
              <td>{v.place}</td>
              <td>{v.date}</td>
              <td>{v.useHour}</td>
              <td>
                <ReservationButton
                  color={transReserveColor(v.reserveState).color}
                  background={transReserveColor(v.reserveState).background}
                >
                  {transReserveState(v.reserveState)}
                </ReservationButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
