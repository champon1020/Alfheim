import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button<{width: string; height: string}>`
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: lightgray;
  width: ${({width}) => width+"%"};
  height: ${({height}) => height+"%"};
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  text: string;
  width: string;
  height: string;
  handleOnClick: () => void;
}

const Button = (props: Props) => {
  const { text, width, height, handleOnClick } = props;
  return (
    <ButtonStyled
      onClick={handleOnClick}
      width={width}
      height={height}>
      {text}
    </ButtonStyled>
  );
};

export default Button;