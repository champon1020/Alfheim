import { defaultApi } from "~/api/entry";
import MenuIcon from "~/assets/images/icons/menu.svg";
import { Config } from "~/config";
import { countToMaxPage } from "~/func";
import { parse } from "~/parser";
import { ArticleIface, DraftIface } from "~/type";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import List from "./article/List";
import Preview from "./article/Preview";
import Tab from "./article/Tab";
import Page from "./Page";

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const ArticlesContainer = styled.div`
  --articles-container-height: calc(100vh - 8rem);
  background-color: white;
  display: flex;
  height: var(--articles-container-height);
`;

const ArticleListContainer = styled.div<{ hidden: boolean; menu: boolean }>`
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
    animation: ${slideFromLeft} 0.2s ease-out 0s;
    width: 50%;
  }
`;

const PreviewContainer = styled.div`
  order: 2;
  width: 70%;
  background-color: white;
  height: var(--articles-container-height);
  @media (max-width: 800px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const PageContainerStyled = styled.div`
  border: solid thin lightgray;
  background-color: white;
  padding: 1.9rem 0;
`;

const MenuIconStyled = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "")};
  position: absolute;
  left: 2.5rem;
  bottom: 2.5rem;
  width: 6rem;
  height: 6rem;
  border-radius: 5rem;
  cursor: pointer;
  z-index: 999;
  text-align: center;
  background-color: var(--manage-base-color);
  &:hover {
    opacity: 0.6;
  }
`;

const MenuIconImage = styled.img`
  width: 60%;
  margin-top: 1.2rem;
`;

interface Props {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Articles = (props: Props) => {
  const { setVerify } = props;

  // Menu is displayed or not.
  const [menu, setMenu] = useState(false);

  // Menu is opened or not.
  const [openMenu, setOpenMenu] = useState(false);

  const [tab, setTab] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [articles, setArticles] = useState([] as ArticleIface[]);
  const [focusedArticle, setFocusedArticle] = useState({} as ArticleIface);

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
      if (fetchedArticles === null || fetchedArticles == undefined) {
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
      if (fetchedDrafts === null || fetchedDrafts == undefined) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      const fetchedDraftsAsArticles = [] as ArticleIface[];
      fetchedDrafts.forEach((v) => {
        const a: ArticleIface = parse(v, "IArticle");
        fetchedDraftsAsArticles.push(a);
      });

      setMaxPage(countToMaxPage(res.data.count, Config.maxSettingArticleNum));
      setArticles(fetchedDraftsAsArticles);
    } catch (err) {
      // If calling api is failed, set verify false.
      setVerify(false);
    }
  }, [page, setVerify]);

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
    <ArticlesContainer>
      <ArticleListContainer hidden={menu && !openMenu} menu={menu}>
        <Tab tab={tab} setTab={setTab} setPage={setPage} />
        <List
          articles={articles}
          tab={tab}
          setFocusedArticle={setFocusedArticle}
          setVerify={setVerify}
        />
        <PageContainerStyled>
          <Page
            current={page}
            height="5"
            next={page === maxPage}
            prev={page === 1}
            nextCallback={nextCallback}
            prevCallback={prevCallback}
          />
        </PageContainerStyled>
      </ArticleListContainer>
      <PreviewContainer>
        <Preview tab={tab} focusedArticle={focusedArticle} />
      </PreviewContainer>
      <MenuIconStyled hidden={!menu} onClick={toggleMenu}>
        <MenuIconImage src={MenuIcon} alt="menu" />
      </MenuIconStyled>
    </ArticlesContainer>
  );
};

export default Articles;
