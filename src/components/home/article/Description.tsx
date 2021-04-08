import React from "react";
import styled from "styled-components";

const StyledDescription = styled.div`
  color: var(--base-color);
  overflow: hidden;
  width: 100%;
`;

const StyledText = styled.p`
  position: relative;
  height: 23rem;
  font-size: 1.6rem;
  margin-top: 1rem;
`;

const Description = (props: { description: string }) => {
  const { description } = props;

  return (
    <StyledDescription>
      <StyledText>{description}</StyledText>
    </StyledDescription>
  );
};

export default Description;
