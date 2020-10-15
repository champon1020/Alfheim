import React, { useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import ImageList from "./image/ImageList";
import styled from "styled-components";
import Page from "./Page";
import { defaultApi } from "~/App";
import ImageForm from "./image/ImageForm";

const ImagesContainerStyled = styled.div`
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
}

const Images = (props: Props) => {
  const { setVerify } = props;

  // Image list.
  const [images, setImages] = useState([] as string[]);

  // Current page.
  const [page, setPage] = useState(1);

  // Next page is exist or not.
  const [next, setNext] = useState(true);

  // Call api of getting image list.
  // The next property of response body updates the state of next.
  const fetchImages = useCallback(
    async (p: number) => {
      const res = await defaultApi.apiPrivateFindImageListGet(p, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;
      setImages(res.data.images);
      setNext(res.data.next);
    },
    [setVerify],
  );

  // On click listener of going next page.
  // Update page to page+1.
  const nextCallback = useCallback(
    () => {
      setPage(page+1);
    },
    [page],
  );

  // On click listener of going previous page.
  // Update page to page+1.
  const prevCallback = useCallback(
    () => {
      setPage(page-1);
    },
    [page],
  );

  // Fetch images.
  // This called as page is updated.
  useEffect(() => {
    fetchImages(page);
    // eslint-disable-next-line
  }, [page]);

  return(
    <ImagesContainerStyled>
      <ImageForm 
        setVerify={setVerify}/>
      <ImageList 
        images={images}
        setVerify={setVerify} />
      <Page
        current={page}
        width={"70"}
        height={"5"}
        next={!next}
        prev={page===1} 
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </ImagesContainerStyled>
  );
};

export default Images;
