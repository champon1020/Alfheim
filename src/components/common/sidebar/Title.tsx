import React from "react";
import styled from "styled-components";

const StyledTitile = styled.div`
  background-color: var(--base-color);
  color: white;
  & h3 {
    margin: 0;
    padding: 10px;
    font-size: 20px;
  }
`;

type Props = {
  title: string;
};

const Title = (props: Props) => {
  const { title } = props;

  return (
    <StyledTitile>
      <h3>{title}</h3>
    </StyledTitile>
  );
};

export default Title;
