import { defaultApi } from "~/api/entry";
import MenuIcon from "~/assets/images/icons/menu.svg";
import Page from "~/components/manage/Page";
import { Config } from "~/config";
import { countToMaxPage } from "~/func";
import { parse } from "~/parser";
import { IArticle } from "~/type";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
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

type Tab = "articles" | "drafts";

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Articles = (props: Props) => {
  const { setVerify } = props;

  // Menu is displayed or not.
  const [menu, setMenu] = useState(false);

  // Menu is opened or not.
  const [openMenu, setOpenMenu] = useState(false);

  const [tab, setTab] = useState<Tab>();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [articles, setArticles] = useState([] as IArticle[]);
  const [focusedArticle, setFocusedArticle] = useState({} as IArticle);

  const toggleMenu = useCallback(() => {
    setOpenMenu(!openMenu);
  }, [openMenu]);

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
        setMaxPage(1);
        setArticles([]);
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
        setMaxPage(1);
        setArticles([]);
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
      setMenu(true);
    }

    window.onresize = () => {
      window.innerWidth <= 600 ? setMenu(true) : setMenu(false);
    };
  }, []);

  // On click listener.
  // If openMenu = true, set openMenu false.
  useEffect(() => {
    window.onclick = () => {
      if (openMenu) {
        setOpenMenu(false);
      }
    };
  }, [openMenu]);

  return (
    <StyledArticles>
      <SideBar
        tab={tab}
        menu={menu}
        openMenu={openMenu}
        page={page}
        maxPage={maxPage}
        articles={articles}
        setTab={setTab}
        setVerify={setVerify}
        setPage={setPage}
        setFocusedArticle={setFocusedArticle}
      />
      <Preview tab={tab} focusedArticle={focusedArticle} />
      <Menu menu={menu} toggleMenu={toggleMenu} />
    </StyledArticles>
  );
};

export default Articles;
