import { Error } from "~/error";
import Cookie from "js-cookie";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import Box from "./Box";

const StyledList = styled.div`
  margin: 2rem 0;
`;

const StyledImageList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
`;

const StyledEmptyMsg = styled.h3`
  font-size: 2.4rem;
  color: gray;
  margin: 5% auto 15% auto;
`;

type Props = {
  images: string[];
  onClickImage: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const ImageList = (props: Props) => {
  const { images, onClickImage } = props;

  const [selected] = useState([] as string[]);

  const imageList = useMemo(() => {
    if (images == null || images.length === 0) {
      return <StyledEmptyMsg>{"No Images"}</StyledEmptyMsg>;
    }

    const list = [] as JSX.Element[];
    images.forEach((src, i) => {
      list.push(<Box key={i} src={src} onClickImage={onClickImage} />);
    });

    return list;
  }, [images, onClickImage]);

  return (
    <StyledList>
      <StyledImageList>{imageList}</StyledImageList>
    </StyledList>
  );
};

export default ImageList;
