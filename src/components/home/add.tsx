import { add } from 'lodash';
import React, { ReactElement } from 'react'
import styled from 'styled-components';

interface Props {
  
}

const Container = styled.main`
  .add-article {
    margin-top: 20px;
    background: white;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);

    .user-name, .place-name{
      background: #F7F9FF;
      color: #A0A4A8;
      border-radius: 7px;
      border: 0;
      min-width: 100px;
      padding: 9px 16px;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
    .place-name{
      margin-left: 24px;
    }
    label, span{
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

function Add({}: Props): ReactElement {
  
  return (
    <Container>
      <article className="add-article">
        <input className="user-name" type="text" name="" placeholder="유저명"/>
        <input className="place-name" type="text" name="" placeholder="온천명"/>
        <label>신청날짜 </label>
        <input type="date" name="" id="" />
        <label>이용시간 </label>
        <input type="time" name="" id="" />
        <span>~</span>
        <input type="time" name="" id="" />
        <button className="add-btn">추가</button>
      </article>
    </Container>
  )
}

export default Add;