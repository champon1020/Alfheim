import { TTab } from "~/components/manage/article/Articles";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";

import List from "./list/List";
import PageBox from "./PageBox";
import Tab from "./Tab";

const AnimSlideR2L = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledSideBar = styled.div<{ hidden: boolean; menu: boolean }>`
  position: ${({ menu }) => (menu ? "absolute" : "")};
  display: ${({ hidden }) => (hidden ? "none" : "")};
  order: 1;
  width: 30%;
  height: calc(var(--articles-container-height));
  @media (max-width: 800px) {
    width: 40%;
  }
  @media (max-width: 600px) {
    z-index: 1000;
    animation: ${AnimSlideR2L} 0.2s ease-out 0s;
    width: 50%;
  }
`;

type Props = {
  tab: TTab;
  menu: boolean;
  openMenu: boolean;
  page: number;
  maxPage: number;
  articles: IArticle[];
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFocusedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
};

const SideBar = (props: Props) => {
  const {
    tab,
    menu,
    openMenu,
    page,
    maxPage,
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
    <StyledSideBar hidden={menu && !openMenu} menu={menu}>
      <Tab tab={tab} setTab={setTab} setPage={setPage} />
      <List
        articles={articles}
        tab={tab}
        setFocusedArticle={setFocusedArticle}
        setVerify={setVerify}
      />
      <PageBox page={page} maxPage={maxPage} setPage={setPage} />
    </StyledSideBar>
  );
};

export default SideBar;
