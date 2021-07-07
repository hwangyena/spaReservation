import styled from 'styled-components';
import Router from 'next/router';

const Wrapper = styled.nav`
  overflow-x: auto; 
  overflow-y: hidden;
  height: 50px;
  display: flex;
  align-items: center;
  ul {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    margin: 0;
    padding: 0;
    gap: 10px;
    li {
      display: inline-block;
      cursor: pointer;
      padding: 0 10px;
      word-break: keep-all;
      white-space: nowrap;
      :hover {
        text-decoration: underline;
        color: red;
      }
    }
  }
`;

const paths = [
  {
  'text': '리덕스 예시',
  'path': '/example/counter'
  },
  {
  'text': '동적라우팅 예시',
  'path': '/example/d-route'
  },
  {
  'text': '반응형 컴포넌트 예시',
  'path': '/example/responsive'
  },
  {
  'text': '이미지 임포트 예시',
  'path': '/example/img-import'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
  {
  'text': '추가예정',
  'path': '/'
  },
]

const Nav = () => {
  return (
    <Wrapper>
      <ul>
        {paths.map((v, i) => <li key={i} onClick={() => Router.push(v.path)}>{v.text}</li>)}
      </ul>
    </Wrapper>
  )
}

export default Nav
