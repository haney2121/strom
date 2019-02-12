import styled from "styled-components";

const Center = styled.div`
  text-align: center;
`;

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const SingleItemStyles = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export { Center, ProjectsList, SingleItemStyles };
