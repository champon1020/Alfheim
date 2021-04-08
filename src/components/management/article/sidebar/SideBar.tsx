import TabType from "~/components/management/article/tab";
import { IArticle } from "~/interfaces";
import React, { forwardRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";

import List from "./list/List";
import PagenationBox from "./PagenationBox";
import Tab from "./Tab";

const AnimSlideR2L = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledSideBar = styled.div<{ hidden: boolean; showMenu: boolean }>`
  --management-articles-sidebar-tab-height: 4rem;
  --management-articles-sidebar-pagenation-height: 7rem;
  --management-articles-sidebar-list-height: calc(
    var(--management-articles-container-height) -
      var(--management-articles-sidebar-tab-height) -
      var(--management-articles-sidebar-pagenation-height)
  );

  position: ${({ showMenu }) => (showMenu ? "absolute" : "")};
  display: ${({ hidden }) => (hidden ? "none" : "")};
  order: 1;
  width: 30%;
  height: var(--management-articles-container-height);
  border: solid thin var(--border-color);
  @media (max-width: 750px) {
    width: 40%;
  }
  @media (max-width: 600px) {
    z-index: 1000;
    animation: ${AnimSlideR2L} 0.2s ease-out 0s;
    width: 50%;
  }
`;

type Props = {
  tab: TabType;
  showMenu: boolean;
  isMenuOpened: boolean;
  page: number;
  next: boolean;
  prev: boolean;
  articles: IArticle[];
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFocusedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
};

const SideBar = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    tab,
    showMenu,
    isMenuOpened,
    page,
    next,
    prev,
    articles,
    setTab,
    setVerify,
    setPage,
    setFocusedArticle,
  } = props;

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
    <StyledSideBar
      hidden={showMenu && !isMenuOpened}
      showMenu={showMenu}
      ref={ref}
    >
      <Tab tab={tab} setTab={setTab} setPage={setPage} />
      <List
        articles={articles}
        tab={tab}
        setFocusedArticle={setFocusedArticle}
        setVerify={setVerify}
      />
      <PagenationBox
        page={page}
        isNext={next}
        isPrev={prev}
        setPage={setPage}
      />
    </StyledSideBar>
  );
});

export default SideBar;
