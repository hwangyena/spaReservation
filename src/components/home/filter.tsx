import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { ICONS } from "src/assets";
import styled from "styled-components";
import { ReserveState, transReserveState } from "./user-info";

const Container = styled.main`
  .filter-article {
    background: white;
    box-shadow: var(--shadow);
    margin: 20px 0;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    .left-content {
      display: flex;
      line-height: 24px;
      .icon {
        margin-left: 22px;
        padding: 0;
        align-self: center;
      }
      .input-user {
        display: flex;
        background: var(--gray);
        border: 0;
        margin-left: 20px;
        color: #000;
        padding: 9px 16px;
        min-width: 240px;
        align-items: center;

        .input-text {
          border: 0;
          background: none;
        }

        .input-text::placeholder {
          color: #a0a4ab;
        }

        .input-button {
          cursor: pointer;
        }
      }

      .input-select {
        background: var(--gray);
        border: 0;
        margin: 0 129px 0 11px;
        padding: 13px 9px;
        min-width: 141px;
        cursor: pointer;
      }
    }

    .right-content {
      display: flex;

      .btn {
        font-size: 16px;
        line-height: 24px;
        margin-left: 20px;
        padding: 9px 10px;
        min-width: 126px;
        border-radius: 7px;
        border: none;
      }
      .cancel {
        background: #fff0f0;
        color: #ff6760;
      }
      .complete {
        background: rgba(22, 208, 144, 0.1);
        color: #16d090;
      }
      .delete {
        background: #ff6760;
        color: #fff;
      }
      .reset {
        box-sizing: border-box;
        width: 103px;
        color: #52575c;
        border: 2px solid #ecf2fc;
        background: inherit;
        padding: 9px 16px 9px 12px;
        i {
          /*icon */
        }
      }
    }
  }
`;

interface Props {
  findUser: (inputName: string, inputSelect: string) => void;
  onResetState: () => void;
  onDelete: () => void;
}

const Filter = ({ findUser, onResetState, onDelete }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [select, setSelect] = useState<string>("");

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target;
    setUserName(v.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    setSelect(v);
    console.log(select);

    findUser(userName, v);
  };

  //
  /* search */
  const onClickSearch = () => {
    findUser(userName, select);
  };
  const onClickEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      findUser(userName, select);
    }
  };

  /* button */
  const onCancel = () => {};
  const onComplete = () => {};
  const onReset = () => {
    setUserName("");
    setSelect("");
    findUser("", "");
    onResetState();
  };
  return (
    <Container>
      <article className="filter-article">
        <span className="left-content">
          <img
            src={ICONS.SEARCH}
            width={24}
            height={24}
            alt=""
            className="icon"
          />
          <div className="input-user">
            <input
              className="input-text"
              type="text"
              placeholder="유저명을 입력하세요"
              name="user"
              value={userName}
              onChange={handleUserName}
              onKeyPress={onClickEnterSearch}
            />
            <img
              src={ICONS.SEARCH}
              width={24}
              height={24}
              alt=""
              className="icon input-button"
              onClick={onClickSearch}
            />
          </div>
          <select
            className="input-select"
            value={select}
            onChange={handleSelect}
          >
            <option value="">전체</option>
            {Object.values(ReserveState).map((v, i) => (
              <option key={i} value={v}>
                {transReserveState(v)}
              </option>
            ))}
          </select>
        </span>

        <span className="right-content">
          <button className="btn cancel" onClick={() => onCancel()}>
            취소
          </button>
          <button className="btn complete" onClick={() => onComplete()}>
            예약완료
          </button>
          <button className="btn delete" onClick={onDelete}>
            선택 삭제
          </button>
          <button className="btn reset" onClick={onReset}>
            초기화<i></i>
          </button>
        </span>
      </article>
    </Container>
  );
};

export default Filter;
