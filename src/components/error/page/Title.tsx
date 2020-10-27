import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  margin-top: -5%;
  font-size: 4rem;
  @media (max-width: 1400px) {
    margin-top: -10%;
    font-size: 4rem;
  }
  @media (max-width: 650px) {
    font-size: 3rem;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

type Props = {
  title: string;
};

const Title = (props: Props) => {
  const { title } = props;

  return <StyledTitle>{title}</StyledTitle>;
};

export default Title;
