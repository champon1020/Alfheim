import React from "react";
import styled from "styled-components";

const ImageBoxStyled = styled.div`
  order: 1;
  width: 35%;
  text-align: left;
  & img {
    height: var(--management-articles-sidebar-box-height);
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 100%;
    & img {
      height: calc(var(--management-articles-sidebar-box-height) * 1.6);
    }
  }
`;

type Props = {
  src: string;
  alt: string;
};

const Image = (props: Props) => {
  const { src, alt } = props;

  return (
    <ImageBoxStyled>
      <img src={src} alt={alt} />
    </ImageBoxStyled>
  );
};

export default Image;
