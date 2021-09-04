import React, { ChangeEvent, ReactElement, useState } from "react";
import styled from "styled-components";
import { UserType, ReserveState, uuidv4, transTime } from "src/components/home";

const Container = styled.main`
  .add-article {
    margin-top: 20px;
    background: white;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);

    .user-name,
    .place-name {
      background: #f7f9ff;
      color: #a0a4a8;
      border-radius: 7px;
      border: 0;
      min-width: 100px;
      padding: 9px 16px;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
    .place-name {
      margin-left: 24px;
    }
    label,
    span {
      font-weight: bold;
      font-size: 16px;
      align-items: center;
      text-align: center;
      margin: 0 20px;
    }

    .add-btn {
      width: 107px;
      height: 42px;
      border: 2px solid #2e4b7d;
      border-radius: 7px;
      background: inherit;
      color: black;
      font-size: 20px;
      font-weight: 700;
      margin-left: 50px;
    }
  }
`;

interface Props {
  onAddUser: (newUser: UserType) => void;
}
function Add({ onAddUser }: Props): ReactElement {
  const [addData, setAddData] = useState<UserType>({
    id: uuidv4(),
    name: "",
    place: "",
    date: "",
    startHour: "",
    endHour: "",
    reserveState: ReserveState.Wait,
  });

  const handleAddData = (e: ChangeEvent<HTMLInputElement>) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const onAdd = () => {
    const result = Object.values(addData).includes(""); //없는데이터 있는지
    if (!result) {
      onAddUser(addData);
      resetAddData();
    } else {
      alert("모든 값을 입력해주세요!");
    }
  };

  const resetAddData = () => {
    setAddData({
      id: uuidv4(),
      name: "",
      place: "",
      date: "",
      startHour: "",
      endHour: "",
      reserveState: ReserveState.Wait,
    });
  };
  return (
    <Container>
      <article className="add-article">
        <input
          className="user-name"
          type="text"
          name="name"
          placeholder="유저명"
          onChange={handleAddData}
          value={addData.name}
        />
        <input
          className="place-name"
          type="text"
          name="place"
          placeholder="온천명"
          onChange={handleAddData}
          value={addData.place}
        />
        <label>신청날짜 </label>
        <input
          type="date"
          onChange={handleAddData}
          value={addData.date}
          name="date"
        />
        <label>이용시간 </label>
        <input
          type="time"
          onChange={handleAddData}
          value={addData.startHour}
          name="startHour"
        />
        <span>~</span>
        <input
          type="time"
          onChange={handleAddData}
          value={addData.endHour}
          name="endHour"
        />
        <button className="add-btn" onClick={onAdd}>
          추가
        </button>
      </article>
    </Container>
  );
}

export default Add;
