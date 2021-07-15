import styled from "styled-components";

const Wrapper = styled.footer`
  height: 50px;
  background: var(--secendary);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = () => {
  return (
    <Wrapper>
      <span>© 2021 ITEZ</span>
      <span>👍</span>
    </Wrapper>
  );
};

export default Footer;
