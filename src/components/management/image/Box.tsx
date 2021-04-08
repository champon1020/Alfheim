import React from "react";
import styled from "styled-components";

const StyledBox = styled.li`
  width: 23%;
  margin: 0 1%;
  &:hover {
    opacity: var(--hoverred-opacity);
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
  src: string;
  onClickImage: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const Box = (props: Props) => {
  const { src, onClickImage } = props;

  return (
    <StyledBox>
      <StyledCheckBox type="checkbox" onClick={onClickImage} />
      <a href={src} target="_blank">
        <StyledImage src={src} />
      </a>
    </StyledBox>
  );
};

export default Box;
