import Cookie from "js-cookie";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import Box from "./Box";
import Footer from "./Footer";

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
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageList = (props: Props) => {
  const { images, setVerify } = props;

  const [selected] = useState([] as string[]);

  const onClickImage = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        selected.push(e.currentTarget.name);
      } else {
        selected.filter((v) => v !== e.currentTarget.name);
      }
    },
    [selected]
  );

  const imageList = useMemo(() => {
    if (images == null || images.length === 0) {
      return <StyledEmptyMsg>{"No Images"}</StyledEmptyMsg>;
    }

    const list = [] as JSX.Element[];
    images.forEach((src, i) => {
      const name = src.split("/")[-1];
      list.push(
        <Box key={i} name={name} src={src} onClickImage={onClickImage} />
      );
    });

    return list;
  }, [images, onClickImage]);

  return (
    <StyledList>
      <StyledImageList>{imageList}</StyledImageList>
      <Footer selected={selected} setVerify={setVerify} />
    </StyledList>
  );
};

export default ImageList;
