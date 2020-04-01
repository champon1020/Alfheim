import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";

const itemSlideAnim = keyframes`
  from {
    transform: translateX(70vw);
  }
  to {
    transform: transalteX(0rem);
  }
`;

const SnsLinkListItemStyled = styled.li<{num: number}>`
  margin: 0 30px;
  background-color: var(--base-color);
  height: 50px;
  width: 50px;
  cursor: pointer;
  animation: ${itemSlideAnim} ${({num}) => `${Math.exp(num*0.1)}s ease-in-out 0s`};
  @media (max-width: 800px) {
    margin: 0 2%;
  }
`;

const ImageStyled = styled.img<{background?: string}>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({background}) => (background === undefined ? "white" : background)};
  box-sizing: border-box;
  object-fit: cover;
  transition: border .1s ease-out;
  &:hover {
    border: solid 5px brown;
  }
`;

type Props = {
  icon: string;
  href: string;
  background?: string;
  num: number;
}

const BarItem = (props: Props) => {
  const { icon, href, background, num } = props;

  const handleOnClick = useCallback(
    () => { window.open(href); }, [href]);

  return (
    <SnsLinkListItemStyled num={num}>
      <div onClick={handleOnClick}>
        <ImageStyled 
          src={icon}
          background={background} />
      </div>
    </SnsLinkListItemStyled>
  );
};

export default BarItem;