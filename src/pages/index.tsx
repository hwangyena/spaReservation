import styled from "styled-components";

const Wrapper = styled.article`
  background-image: url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: var(--content-height);
`;

const Home = () => {
  return <Wrapper></Wrapper>;
};
export default Home;
