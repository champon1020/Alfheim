import React from "react";
import styled from "styled-components";

const SnsLinkListItemStyled = styled.li`
  margin: 0 30px;
  background-color: var(--base-color);
  height: 50px;
  width: 50px;
  cursor: pointer;
  box-sizing: border-box;
  object-fit: cover;
`;

const ImageStyled = styled.img<{background?: string}>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({background}) => (background === undefined ? "white" : background)};
`;

type Props = {
  icon: string;
  background?: string;
}

const BarItem = (props: Props) => {
  const { icon, background } = props;

  return (
    <SnsLinkListItemStyled>
      <ImageStyled 
        src={icon}
        background={background} />
    </SnsLinkListItemStyled>
  );
};

export default BarItem;