import React from "react";
import styled from "styled-components";

import Content from "./Content";
import Title from "./Title";

const StyledBox = styled.li`
  border: solid 1px var(--base-color);
  margin-bottom: 30px;
`;

type Props = {
  title: string;
  ContentComponent: React.FunctionComponent;
};

const Box = (props: Props) => {
  const { title, ContentComponent } = props;

  return (
    <StyledBox>
      <Title title={title} />
      <Content Component={ContentComponent} />
    </StyledBox>
  );
};

export default Box;
