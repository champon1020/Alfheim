import React from "react";
import styled from "styled-components";

const StyledDescription = styled.div`
  color: var(--base-color);
  text-overflow: hidden;
  width: 100%;
`;

const StyledEllipsisText = styled.p`
  position: relative;
  height: 100%;
  overflow: hidden;
  font-size: 1.6rem;
  margin-top: 3%;
  l &:before {
    position: absolute;
    content: "...";
    bottom: 0;
    right: 0;
  }
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
  }
`;

const Description = (props: { description: string }) => {
  const { description } = props;

  return (
    <StyledDescription>
      <StyledEllipsisText>{description}</StyledEllipsisText>
    </StyledDescription>
  );
};

export default Description;
