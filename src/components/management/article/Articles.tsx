import { IArticle } from "~/interfaces";
import { apiHandlerWithToken } from "~/util/api";
import { bearerAuthHeader } from "~/util/auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import Menu from "./Menu";
import Preview from "./preview/Preview";
import SideBar from "./sidebar/SideBar";

const StyledArticles = styled.div`
  --articles-container-height: calc(100vh - 8rem);
  background-color: white;
  display: flex;
  height: var(--articles-container-height);
`;

export type TTab = "articles" | "drafts";

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Articles = (props: Props) => {
  const { setVerify } = props;

  const menuRef = useRef<HTMLDivElement>();
  const sidebarRef = useRef<HTMLDivElement>();
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [tab, setTab] = useState<TTab>();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [focusedArticle, setFocusedArticle] = useState({} as IArticle);

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
    if (tab === "articles") {
      fetchArticles();
    }
    if (tab === "drafts") {
      fetchDrafts();
    }
  }, [page, tab]);

  // Set state of tab by url pathname.
  // On resize listener.
  useEffect(() => {
    if (window.location.pathname.endsWith("articles")) {
      setTab("articles");
    }
    if (window.location.pathname.endsWith("drafts")) {
      setTab("drafts");
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
      <Preview tab={tab} focusedArticle={focusedArticle} />
      <Menu showMenu={showMenu} openMenu={openMenu} ref={menuRef} />
    </StyledArticles>
  );
};

export default Articles;
