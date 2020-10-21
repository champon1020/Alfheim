import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  margin-top: 3%;
  color: var(--base-color);
  font-size: 2.4rem;
  width: 100%;
  word-break: break-word;
  & h3 {
    display: inline-block;
    text-align: left;
    margin: 0 3%;
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
