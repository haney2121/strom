import styled from "styled-components";

const OverviewContainer = styled.div`
  background: ${props => props.theme.offWhite};
  text-align: center;
  box-shadow: ${props => props.theme.bs};
  padding: 5vh 0;
  color: ${props => props.theme.grey};
`;

export { OverviewContainer };
