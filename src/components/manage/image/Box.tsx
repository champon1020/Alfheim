import React from "react";
import styled from "styled-components";

const StyledBox = styled.li`
  width: 23%;
  margin: 0 1%;
  &:hover {
    opacity: 0.6;
  }
  @media (max-width: 1100px) {
    width: 31%;
  }
  @media (max-width: 500px) {
    margin: 0 2%;
    width: 45%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const StyledCheckBox = styled.input`
  cursor: pointer;
  transform: scale(1.5);
  color: white;
`;

type Props = {
  key?: number;
  name: string;
  src: string;
  onClickImage: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const Box = (props: Props) => {
  const { name, src, onClickImage } = props;

  return (
    <StyledBox>
      <StyledCheckBox type="checkbox" name={name} onClick={onClickImage} />
      <a href={src}>
        <StyledImage src={src} />
      </a>
    </StyledBox>
  );
};

export default Box;
