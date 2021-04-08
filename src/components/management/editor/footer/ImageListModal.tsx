import Header from "~/components/management/image/Header";
import Pagenation from "~/components/management/Pagenation";
import { Error, HttpError } from "~/error";
import { apiHandlerWithToken } from "~/util/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const StyledModal = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "")};
  position: absolute;
  margin: auto;
  left: 2rem;
  bottom: 5rem;
  max-height: 50vh;
  border: solid thin var(--border-color);
  background-color: white;
  z-index: 200;
`;

const StyledImageList = styled.ul`
  display: flex;
  justify-content: center;
`;

const StyledImageItem = styled.div`
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: var(--hoverred-opacity);
  }
`;

const StyledImage = styled.img`
  max-width: calc(100vw / 3.5);
`;

type Props = {
  hidden: boolean;
  setValue: (value: string) => void;
  setModal: (value: boolean) => void;
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const ImageListModal = (props: Props) => {
  const { hidden, setValue, setModal, setErr, setVerified } = props;

  const [images, setImages] = useState([] as string[]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const nextCallback = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const prevCallback = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const onClickImage = (e: React.MouseEvent<HTMLDivElement>) => {
    const imageElement = e.currentTarget.children[0] as HTMLImageElement;
    setValue(imageElement.src);
    setModal(false);
  };

  const imageList = useMemo(() => {
    if (images == null || images.length == 0) {
      return;
    }
    const list = [] as JSX.Element[];
    images.forEach((src, i) => {
      const imageFileName = src.split("/")[-1];
      list.push(
        <StyledImageItem key={i} onClick={onClickImage}>
          <StyledImage src={src} alt={imageFileName} />
        </StyledImageItem>
      );
    });
    return list;
  }, [images]);

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
          setErr(new HttpError(err.status, "failed to fetch images"));
        }
      });
  }, [page]);

  return (
    <StyledModal hidden={hidden}>
      <Header setErr={setErr} setVerified={setVerified} />
      <StyledImageList>{imageList}</StyledImageList>
      <Pagenation
        current={page}
        width={"70"}
        height={"5"}
        isNext={next}
        isPrev={prev}
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </StyledModal>
  );
};

export default ImageListModal;
