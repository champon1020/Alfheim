import { defaultApi } from "~/api/entry";
import { Config } from "~/config";
import { countToMaxPage } from "~/func";
import { parse } from "~/parser";
import { IArticle } from "~/type";
import Cookie from "js-cookie";
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
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [tab, setTab] = useState<TTab>();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [focusedArticle, setFocusedArticle] = useState({} as IArticle);

  // openMenu opens the menu.
  const openMenu = () => {
    setMenuOpened(true);
  };

  // Call api of getting article list
  // and handle got articles.
  const fetchArticles = useCallback(async () => {
    try {
      const res = await defaultApi.apiPrivateFindArticleListGet(
        page,
        Config.maxSettingArticleNum,
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
          },
        }
      );

      const fetchedArticles = res.data.articles;

      // null and undefined check.
      if (fetchedArticles == null) {
        return;
      }

      setMaxPage(countToMaxPage(res.data.count, Config.maxSettingArticleNum));
      setArticles(fetchedArticles);
    } catch (err) {
      // If calling api is failed, set verify false.
      setVerify(false);
    }
  }, [page, setVerify]);

  // Call api of getting draft list
  // and handle got articles.
  const fetchDrafts = useCallback(async () => {
    try {
      const res = await defaultApi.apiPrivateFindDraftListGet(
        page,
        Config.maxSettingArticleNum,
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
          },
        }
      );

      const fetchedDrafts = res.data.drafts;

      // null and undefined check.
      if (fetchedDrafts == null) {
        return;
      }

      const fetchedDraftsAsArticles = [] as IArticle[];
      fetchedDrafts.forEach((v) => {
        const a: IArticle = parse(v, "IArticle");
        fetchedDraftsAsArticles.push(a);
      });

      setMaxPage(countToMaxPage(res.data.count, Config.maxSettingArticleNum));
      setArticles(fetchedDraftsAsArticles);
    } catch (err) {
      // If calling api is failed, set verify false.
      setVerify(false);
    }
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
      isMenuOpened
    ) {
      setMenuOpened(false);
    }
  };

  return (
    <StyledArticles>
      <SideBar
        tab={tab}
        showMenu={showMenu}
        isMenuOpened={isMenuOpened}
        page={page}
        maxPage={maxPage}
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
