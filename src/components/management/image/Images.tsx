import { apiHandlerPrivate } from "~/App";
import Pagenation from "~/components/management/Pagenation";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Header from "./Header";
import List from "./List";

const StyledImages = styled.div`
  --images-container-height: calc(100vh - 7rem);
  margin: 0 8%;
  padding: 0 0.2%;
  background-color: white;
  @media (max-width: 1100px) {
    margin: 0 5%;
  }
  @media (max-width: 800px) {
    margin: 0;
  }
`;

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Images = (props: Props) => {
  const { setVerify } = props;

  const [images, setImages] = useState([] as string[]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(true);
  const [prev, setPrev] = useState(true);

  // On click listener of going next page.
  // Update page to page+1.
  const nextCallback = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  // On click listener of going previous page.
  // Update page to page+1.
  const prevCallback = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  // Fetch images.
  // This called as page is updated.
  useEffect(() => {
    apiHandlerPrivate
      .apiV3PrivateGetImagesGet({ p: page })
      .then((res) => {
        setImages(res.imageUrls);
        setNext(res.pagenation.next);
        setPrev(res.pagenation.prev);
      })
      .catch((err: any) => {
        if (err.response.status == 403) {
          setVerify(false);
        }
      });
  }, [page]);

  return (
    <StyledImages>
      <Header setVerify={setVerify} />
      <List images={images} setVerify={setVerify} />
      <Pagenation
        current={page}
        width={"70"}
        height={"5"}
        isNext={next}
        isPrev={prev}
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </StyledImages>
  );
};

export default Images;
