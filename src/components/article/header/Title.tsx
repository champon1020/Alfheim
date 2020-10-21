import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  text-align: center;
  font-size: 2.4rem;
  width: 80%;
  margin: 0 auto 4% auto;
  & h2 {
    margin-bottom: 0;
    border-bottom: solid thin gray;
    display: inline-block;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Title = (props: { title: string }) => {
  const { title } = props;

  return (
    <StyledTitle>
      <h2>{title}</h2>
    </StyledTitle>
  );
};

export default Title;
