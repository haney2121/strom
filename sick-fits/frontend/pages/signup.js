import Signup from "../components/Auth/Signup";
import Signin from "../components/Auth/Signin";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signin />
  </Columns>
);

export default SignupPage;
