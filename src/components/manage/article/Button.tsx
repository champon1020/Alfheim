import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button<{
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
}>`
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  width: ${({ width }) => width + "%"};
  height: ${({ height }) => height + "%"};
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  text: string;
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  handleOnClick: () => void;
};

const Button = (props: Props) => {
  const { text, width, height, backgroundColor, color, handleOnClick } = props;

  return (
    <ButtonStyled
      onClick={handleOnClick}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
    >
      {text}
    </ButtonStyled>
  );
};

export default Button;
