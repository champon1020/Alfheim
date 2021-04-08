import Pagenation from "~/components/management/Pagenation";
import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";

const StyledPagenation = styled.div`
  height: calc(
    var(--management-articles-sidebar-pagenation-height) - 1.9rem * 2
  );
  background-color: white;
  padding: 1.9rem 0;
`;

type Props = {
  page: number;
  isNext: boolean;
  isPrev: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PagenationBox = (props: Props) => {
  const { page, isNext, isPrev, setPage } = props;

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
    <StyledPagenation>
      <Pagenation
        current={page}
        height="5"
        isNext={isNext}
        isPrev={isPrev}
        nextCallback={nextCallback}
        prevCallback={prevCallback}
      />
    </StyledPagenation>
  );
};

export default PagenationBox;
