import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";

const ItemSlideAnim = keyframes`
  from {
    transform: translateX(70vw);
  }
  to {
    transform: transalteX(0rem);
  }
`;

const StyledSnsLink = styled.li<{ num: number }>`
  margin: 0 30px;
  background-color: var(--base-color);
  height: 50px;
  width: 50px;
  cursor: pointer;
  animation: ${ItemSlideAnim}
    ${({ num }) => `${Math.exp(num * 0.1)}s ease-in-out 0s`};
  @media (max-width: 800px) {
    margin: 0 2%;
  }
`;

const StyledImage = styled.img<{ background?: string }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ background }) =>
    background === undefined ? "white" : background};
  box-sizing: border-box;
  object-fit: cover;
  transition: border 0.1s ease-out;
  &:hover {
    border: solid 5px brown;
  }
`;

type Props = {
  icon: string;
  href: string;
  background?: string;
  num: number;
};

const BarItem = (props: Props) => {
  const { icon, href, background, num } = props;

  const onClickIcon = useCallback(() => {
    window.open(href);
  }, [href]);

  return (
    <StyledSnsLink num={num} onClick={onClickIcon}>
      <StyledImage src={icon} background={background} />
    </StyledSnsLink>
  );
};

export default BarItem;
