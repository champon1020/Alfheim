import Pagenation from "~/components/management/Pagenation";
import { Error, HttpError } from "~/error";
import { apiHandlerWithToken } from "~/util/api";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Footer from "./Footer";
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
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const Images = (props: Props) => {
  const { setErr, setVerified } = props;

  const [selectedImages] = useState([] as string[]);
  const [images, setImages] = useState([] as string[]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const onClickImage = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const imageElement = (e.currentTarget.nextSibling as HTMLElement)
        .children[0] as HTMLImageElement;

      if (e.currentTarget.checked) {
        selectedImages.push(imageElement.src);
      } else {
        selectedImages.filter((v) => v !== imageElement.src);
      }
    },
    [selectedImages]
  );

  const nextCallback = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const prevCallback = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  useEffect(() => {
    apiHandlerWithToken()
      .apiV3PrivateGetImagesGet({ p: page })
      .then((res: any) => {
        setImages(res.imageUrls);
        setNext(res.pagenation.next);
        setPrev(res.pagenation.prev);
      })
      .catch((err: Response) => {
        if (err.status == 403) {
          setVerified(false);
        } else {
          setErr(new HttpError(err.status, "failed to fetch image"));
        }
      });
  }, [page]);

  return (
    <StyledImages>
      <Header setVerified={setVerified} setErr={setErr} />
      <List images={images} onClickImage={onClickImage} />
      <Footer
        selectedImages={selectedImages}
        setVerified={setVerified}
        setErr={setErr}
      />
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
