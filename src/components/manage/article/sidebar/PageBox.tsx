import Page from "~/components/manage/Page";
import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";

const StyledPage = styled.div`
  border: solid thin lightgray;
  background-color: white;
  padding: 1.9rem 0;
`;

type Props = {
  page: number;
  maxPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PageBox = (props: Props) => {
  const { page, maxPage, setPage } = props;

  // On click listener of going previous button.
  // Set page-1.
  const prevCallback = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  // On click listener of going next button.
  // Set page+1.
  const nextCallback = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return (
    <StyledPage>
      <Page
        current={page}
        height="5"
        next={page === maxPage}
        prev={page === 1}
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </StyledPage>
  );
};

export default PageBox;
