import styled from "styled-components";

const SickButton = styled.button`
  background: ${props => props.theme.blue} !important;
  color: white !important;
  font-weight: 500 !important;
  border: 0 !important;
  border-radius: 0 !important;
  text-transform: uppercase !important;
  font-size: 2rem !important;
  padding: 0.8rem 1.5rem !important;
  transform: skew(-2deg) !important;
  display: inline-block !important;
  transition: all 0.5s !important;
  &[disabled] {
    opacity: 0.5 !important;
  }
  &:before {
    background: none !important;
  }
`;

export default SickButton;
