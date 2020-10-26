import { defaultApi } from "~/api/entry";
import Page from "~/components/manage/Page";
import { Config } from "~/config";
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

  // Image list.
  const [images, setImages] = useState([] as string[]);

  // Current page.
  const [page, setPage] = useState(1);

  // Next page is exist or not.
  const [next, setNext] = useState(true);

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
    const fetchImages = async () => {
      try {
        const res = await defaultApi.apiPrivateFindImageListGet(
          page,
          Config.maxSettingImageNum,
          {
            headers: {
              Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
            },
          }
        );

        setImages(res.data.images);
        setNext(res.data.next);
      } catch (err) {
        setVerify(false);
      }
    };

    fetchImages();
  }, [page]);

  return (
    <StyledImages>
      <Header setVerify={setVerify} />
      <List images={images} setVerify={setVerify} />
      <Page
        current={page}
        width={"70"}
        height={"5"}
        next={!next}
        prev={page === 1}
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </StyledImages>
  );
};

export default Images;