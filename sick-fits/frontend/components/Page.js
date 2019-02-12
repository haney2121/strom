import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

import Header from "./Header/Header";
import Meta from "./Header/Meta";
import Overview from "./Overview/Overview";

const theme = {
  blue: "#007fcb",
  black: "#323232",
  grey: "#545454",
  blueBackground:
    "linear-gradient(to right, #2638b0, #0060c8, #007fcb, #0099c2, #00b0b7)",
  pinkBackground:
    "linear-gradient(to bottom right, rgba(204, 61, 190, 1) 0%, rgba(119, 42, 219, 1) 100%)",
  lightgrey: "#E1E1E1",
  offWhite: "rgba(255,255,255,0.5)",
  maxWidth: "80%",
  bs: "0 2px 2px rgba(0,0,0,0.1)"
};

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html{
    box-sizing: border-box;
    font-size: 10px; 
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.blue};
  }
`;

const StyledContainer = styled.div``;

const InnerContainer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledContainer>
          <Meta />
          <Header />
          <Overview />
          <InnerContainer>{this.props.children}</InnerContainer>
        </StyledContainer>
      </ThemeProvider>
    );
  }
}

export default Page;
