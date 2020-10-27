import React from "react";
import styled from "styled-components";

const StyledDescription = styled.h2<{ top: number; fontSize: number }>`
  margin-top: ${({ top }) => top + "%"};
  font-size: ${({ fontSize }) => fontSize + "rem"};
  @media (max-width: 800px) {
    font-size: 3rem;
  }
  @media (max-width: 650px) {
    font-size: 2rem;
  }
`;

type Props = {
  desc: string;
};

const Description = (props: Props) => {
  const { desc } = props;

  return (
    <StyledDescription top={2} fontSize={3.5}>
      {desc}
    </StyledDescription>
  );
};

export default Description;
