import {
  ManagementArticlesMode,
  ManagementDraftsMode,
} from "~/components/management/mode";
import { IArticle } from "~/interfaces";
import { apiHandlerWithToken } from "~/util/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import Menu from "./Menu";
import Preview from "./preview/Preview";
import SideBar from "./sidebar/SideBar";
import TabType from "./tab";

const StyledArticles = styled.div`
  --management-articles-container-height: calc(100vh - 13.5rem);

  background-color: white;
  display: flex;
  height: var(--management-articles-container-height);
`;

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Articles = (props: Props) => {
  const { setVerify } = props;

  const menuRef = useRef<HTMLDivElement>();
  const sidebarRef = useRef<HTMLDivElement>();
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [tab, setTab] = useState<TabType>();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [focusedArticle, setFocusedArticle] = useState(undefined as IArticle);

  // openMenu opens the menu.
  const openMenu = () => {
    setMenuOpened(true);
  };

  // Call api of getting article list
  // and handle got articles.
  const fetchArticles = useCallback(async () => {
    apiHandlerWithToken()
      .apiV3PrivateGetArticlesGet({ p: page })
      .then((res: any) => {
        setArticles(res.articles);
        setNext(res.pagenation.next);
        setPrev(res.pagenation.prev);
      })
      .catch((err: any) => {
        if (err.response.status == 403) {
          setVerify(false);
        }
      });
  }, [page, setVerify]);

  // Call api of getting draft list
  // and handle got articles.
  const fetchDrafts = useCallback(async () => {
    apiHandlerWithToken()
      .apiV3PrivateGetDraftsGet({ p: page })
      .then((res: any) => {
        setArticles(res.articles);
        setNext(res.pagenation.next);
        setPrev(res.pagenation.prev);
      })
      .catch((err: any) => {
        if (err.response.status == 403) {
          setVerify(false);
        }
      });
  }, [page, setVerify]);

  // Fetch articles or drafts.
  // Selected by the state of tab.
  useEffect(() => {
    if (tab === ManagementArticlesMode) {
      fetchArticles();
    }
    if (tab === ManagementDraftsMode) {
      fetchDrafts();
    }
  }, [page, tab]);

  // Set state of tab by url pathname.
  // On resize listener.
  useEffect(() => {
    if (window.location.pathname.endsWith(ManagementArticlesMode)) {
      setTab(ManagementArticlesMode);
    }
    if (window.location.pathname.endsWith(ManagementDraftsMode)) {
      setTab(ManagementDraftsMode);
    }
    if (window.innerWidth <= 600) {
      setShowMenu(true);
    }
    window.onresize = () => {
      window.innerWidth <= 600 ? setShowMenu(true) : setShowMenu(false);
    };
  }, []);

  // On click listener.
  // If isMenuOpened = true, set isMenuOpened false.
  window.onclick = (e: any) => {
    if (
      menuRef != null &&
      e.target !== menuRef.current &&
      e.target.parentNode !== menuRef.current &&
      sidebarRef != null &&
      e.target !== sidebarRef.current &&
      e.target.parentNode !== sidebarRef.current &&
      e.target.parentNode.parentNode !== sidebarRef.current &&
      isMenuOpened
    ) {
      setMenuOpened(false);
    }
  };

  return (
    <StyledArticles>
      <SideBar
        ref={sidebarRef}
        tab={tab}
        showMenu={showMenu}
        isMenuOpened={isMenuOpened}
        page={page}
        next={next}
        prev={prev}
        articles={articles}
        setTab={setTab}
        setVerify={setVerify}
        setPage={setPage}
        setFocusedArticle={setFocusedArticle}
      />
      <Preview focusedArticle={focusedArticle} />
      <Menu showMenu={showMenu} openMenu={openMenu} ref={menuRef} />
    </StyledArticles>
  );
};

export default Articles;
