import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  padding: 10px;
  background-color: white;
  font-size: 18px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

type Props = {
  Component: FunctionComponent;
};

const Content = (props: Props) => {
  const { Component } = props;

  return (
    <StyledContent>
      <Component />
    </StyledContent>
  );
};

export default Content;
