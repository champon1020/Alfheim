import React from "react";
import styled from "styled-components";

const StyledTitleBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;

const StyledTitle = styled.h2`
  position: relative;
  top: 33%;
  width: 93%;
  margin: auto;
  color: white;
  opacity: 1;
  word-break: break-word;
`;

type Props = {
  title: string;
};

const Title = (props: Props) => {
  const { title } = props;

  return (
    <StyledTitleBox>
      <StyledTitle>{title}</StyledTitle>
    </StyledTitleBox>
  );
};

export default Title;
