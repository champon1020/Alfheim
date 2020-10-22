import { Config } from "~/config";
import { pathJoin } from "~/func";
import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-out;
`;

type Props = {
  imageHash: string;
};

const Image = (props: Props) => {
  const { imageHash } = props;

  return <StyledImage src={pathJoin(Config.fileUrl, "images", imageHash)} />;
};

export default Image;
