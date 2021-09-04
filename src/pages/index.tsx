import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Filter from "src/components/home/filter";
import Table from "src/components/home/table";
import Add from "src/components/home/add";
import { ReserveState, staticUsers, UserType } from "src/components/home";

const GlobalStyle = createGlobalStyle`
  body{
    padding: 20px;
    background: #f7f9ff;
  }
`;

const Container = styled.main`
  --black: #25282b;
  --gray: #f7f9ff;
  --shadow: 0px 4px 14px rgba(65, 115, 234, 0.15);

  width: 100%;
  height: 100%;

  .title {
    padding-left: 10px;
    color: var(--black);
    font-weight: 900;
    font-size: 36px;
  }

  .count-article {
    font-size: 18px;
    color: var(--black);
    margin-bottom: 20px;
    span {
      font-size: 24px;
    }
  }
`;

const Home = () => {
  const [usersDefault, setUsersDefault] = useState(staticUsers); //delete, add 거친 전체 값
  const [usersInfo, setUsersInfo] = useState(usersDefault); //search한 결과값
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]); //check한 유저 id

  /**
   *  check 선택박스 초기화
   */
  const resetSelect = () => {
    setCheckedUsers([]);
  };

  /**
   * 리스트 초기화
   */
  const onResetState = (result?: UserType[]) => {
    setUsersInfo(result ?? usersDefault);
    resetSelect();
  };

  /**
   * 필터 | 유저 찾기
   * @param inputName 찾고자 하는 유저 이름
   * @param inputSelect 찾고자 하는 유저 상태
   */
  const findUser = (inputName: string, inputSelect: string) => {
    inputSelect || "";
    setUsersInfo(() => {
      const findName = usersDefault.filter(v =>
        v.name.includes(inputName.toLowerCase())
      );
      //이거 전체 항목 찾으려면 filter안하려고 연산자 쓰는 방법 말고는 없는지..?!???!?!
      return inputSelect
        ? findName.filter(v => v.reserveState === (inputSelect as ReserveState))
        : findName;
    });
    resetSelect();
  };

  /**
   * 체크한 유저 업데이트(toggle)
   * @param checkUser 체크한 유저
   */
  const onChecked = (checkUser: string) => {
    setCheckedUsers(p =>
      p.includes(checkUser) ? p.filter(v => v != checkUser) : [...p, checkUser]
    );
  };

  /**
   * 전체 항목 체크 | 체크 해제
   */
  const onCheckedAll = () => {
    checkedUsers.length === 0
      ? setCheckedUsers(usersDefault.map(v => v.id))
      : setCheckedUsers([]);
  };
  ////button event////
  /**
   * 선택한것들 삭제
   */
  const onDelete = () => {
    if (checkedUsers.length !== 0) {
      const result = usersDefault.filter(v => !checkedUsers.includes(v.id));
      setUsersDefault(result);
      onResetState(result);
    } else {
      alert("사용자를 선택해주세요.");
    }
  };

  const onComplete = () => {};

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1 className="title">온천예약관리</h1>
        <Filter
          findUser={findUser}
          onResetState={onResetState}
          onDelete={onDelete}
        />
        <article className="count-article">
          총 <span>{usersDefault.length}</span> 건 중{" "}
          <span>{checkedUsers.length}</span> 건 선택
        </article>
        <Table
          usersDefault={usersDefault}
          usersInfo={usersInfo}
          onChecked={onChecked}
          checkedUsers={checkedUsers}
          onCheckedAll={onCheckedAll}
        />
        <Add />
      </Container>
    </>
  );
};

export default Home;
