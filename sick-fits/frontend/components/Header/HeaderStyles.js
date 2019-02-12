import styled from "styled-components";

const AdminBar = styled.div`
  background: ${props => props.theme.black};
  padding: 1rem 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  a {
    color: #fff;
  }
`;

const Logo = styled.h1`
  font-size: 3rem;
  padding: 1rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  margin: 0;
  a {
    color: #fff;
    cursor: pointer;
  }
`;

export { AdminBar, Logo };
