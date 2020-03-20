import React, { useState, useEffect, useCallback } from "react";
import ImageList from "./image/ImageList";
import styled from "styled-components";
import Page from "./Page";
import { defaultApi } from "src/App";
import ImageForm from "./image/ImageForm";

const ImagesContainerStyled = styled.div`
  --images-container-height: calc(100vh - 7rem);
  margin: 0 15%;
  padding: 0 0.2%;
  height: calc(var(--images-container-height) - 1rem);
  background-color: white;
`;

const Images = () => {
  const [images, setImages] = useState([] as string[]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(true);

  const fetchImages = React.useCallback(
    async (p: number) => {
      const res = await defaultApi.apiPrivateFindImageListGet(p);
      setImages(res.data.images);
      setNext(res.data.next);
    },
    [],
  );

  const nextCallback = useCallback(
    () => {
      setPage(page+1);
    },
    [page],
  );

  const prevCallback = useCallback(
    () => {
      setPage(page-1);
    },
    [page],
  );

  useEffect(() => {
    fetchImages(page);
    // eslint-disable-next-line
  }, [page]);

  return(
    <ImagesContainerStyled>
      <ImageForm />
      <ImageList 
        images={images} />
      <Page
        current={page}
        width={"70"}
        height={"5"}
        next={next}
        prev={page===1} 
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </ImagesContainerStyled>
  );
};

export default Images;