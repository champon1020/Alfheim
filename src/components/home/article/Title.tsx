import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  color: var(--base-color);
  font-size: 2.4rem;
  width: 100%;
  word-break: break-word;
  & h3 {
    display: inline-block;
    text-align: left;
    margin: 0;
    font-weight: bold;
  }
  @media (max-width: 750px) {
    margin-top: 3%;
  }
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const Title = (props: { title: string }) => {
  const { title } = props;

  return (
    <StyledTitle>
      <h3>{title}</h3>
    </StyledTitle>
  );
};

export default Title;
