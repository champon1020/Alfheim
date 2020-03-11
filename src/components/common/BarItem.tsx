import React from "react";
import styled from "styled-components";

const SnsLinkListItemStyled = styled.li`
  margin: 0 30px;
  background-color: var(--base-color);
  height: 50px;
  width: 50px;
  cursor: pointer;
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
  transition: border .2s ease-out;
  &:hover {
    border: solid 3px brown;
  }
`;

type Props = {
  icon: string;
  href: string;
  background?: string;
}

const BarItem = (props: Props) => {
  const { icon, href, background } = props;

  return (
    <SnsLinkListItemStyled>
      <a href={href}>
        <ImageStyled 
          src={icon}
          background={background} />
      </a>
    </SnsLinkListItemStyled>
  );
};

export default BarItem;