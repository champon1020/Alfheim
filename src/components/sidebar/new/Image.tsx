import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 20rem;
`;

type Props = {
  src: string;
};

const Image = (props: Props) => {
  const { src } = props;
  return <StyledImage src={src} />;
};

export default Image;
