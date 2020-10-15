import React, { useEffect, useState, useCallback } from "react";
import Cookie from "js-cookie";
import ArticleList from "./article/ArticleList";
import styled, { keyframes } from "styled-components";
import { ArticleType, DraftType } from "~/type";
import { defaultApi } from "~/App";
import { parseDraftToArticle } from "~/components/services/parser";
import Preview from "./article/Preview";
import Page from "./Page";
import Tab from "./article/Tab";
import MenuIcon from "~/assets/images/icons/menu.svg";

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

const ArticleListContainer = styled.div<{hidden: boolean; menu: boolean}>`
  position: ${({menu}) => menu ? "absolute" : ""};
  display: ${({hidden}) => hidden ? "none" : ""};
  order: 1;
  width: 30%;
  height: calc(var(--articles-container-height));
  @media (max-width: 800px) {
    width: 40%;
  }
  @media (max-width: 600px) {
    z-index: 1000;
    animation: ${slideFromLeft} .2s ease-out 0s;
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

const MenuIconStyled = styled.div<{hidden: boolean}>`
  display: ${({hidden}) => hidden ? "none" : ""};
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

type Props = {
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
  const [articles, setArticles] = useState([] as ArticleType[]);
  const [focusedArticle, setFocusedArticle] = useState({} as ArticleType);

  const toggleMenu = useCallback(() => { setOpenMenu(!openMenu); },[openMenu]);

  // Call api of getting article list
  // and handle got articles.
  const fetchArticles = useCallback(
    async () => {
      // Call api.
      const res = await defaultApi.apiPrivateFindArticleListAllGet(page, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;

      const articleList = [] as ArticleType[];
      const fetchedArticles = res.data.articles;
      
      // null check.
      if(fetchedArticles === null) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      // Repeat each articles and push them to articleList.
      // This statement means type of fetchedArticles
      // whose type is Article (swagger declared automatically)
      // are changed to ArticleType.
      fetchedArticles.forEach(v => {
        articleList.push(v);
      });
      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page, setVerify]);


  // Call api of getting draft list
  // and handle got articles.
  const fetchDrafts = useCallback(
    async () => {
      // Call api.
      const res = await defaultApi.apiPrivateFindDraftListGet(page, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).catch(() => {
        setVerify(false);
      });
      if(typeof res === "undefined") return;

      const articleList = [] as ArticleType[];
      const fetchedDrafts = res.data.drafts;

      // null check.
      if(fetchedDrafts === null) {
        setMaxPage(1);
        setArticles([]);
        return;
      }

      // Repeat each articles and push them to articleList.
      // This statement means type of fetchedArticles
      // whose type is Article (swagger declared automatically)
      // are changed to ArticleType.
      fetchedDrafts.forEach(v => {
        const a = parseDraftToArticle(v as DraftType);
        articleList.push(a);
      });
      setMaxPage(res.data.maxPage);
      setArticles(articleList);
    }, [page, setVerify]);


  // On click listener of going previous button.
  // Set page-1.
  const prevCallback = useCallback(
    () => {
      setPage(page-1);
    },[page]);

  // On click listener of going next button.
  // Set page+1.
  const nextCallback = useCallback(
    () => {
      setPage(page+1);
    },[page]);

  // Fetch articles or drafts.
  // Selected by the state of tab.
  useEffect(() => {
    if(tab === "articles") fetchArticles();
    if(tab === "drafts") fetchDrafts();
    // eslint-disable-next-line
  }, [page, tab]);

  // Set state of tab by url pathname.
  // On resize listener.
  useEffect(() => {
    if(window.location.pathname.endsWith("articles")) setTab("articles");
    if(window.location.pathname.endsWith("drafts")) setTab("drafts");
    if(window.innerWidth <= 600) setMenu(true);
    window.onresize = () => {
      window.innerWidth <= 600 ? setMenu(true) : setMenu(false);
    };
  }, []);

  // On click listener.
  // If openMenu = true, set openMenu false.
  useEffect(() => {
    window.onclick = () => {
      if(openMenu) setOpenMenu(false);
    };
  },[openMenu]);

  return(
    <ArticlesContainer>
      <ArticleListContainer 
        hidden={menu && !openMenu}
        menu={menu}>
        <Tab 
          tab={tab}
          setTab={setTab}
          setPage={setPage} />
        <ArticleList
          tab={tab} 
          articles={articles}
          setFocusedArticle={setFocusedArticle}
          setVerify={setVerify} />
        <PageContainerStyled>
          <Page 
            current={page}
            height="5"
            next={page===maxPage}
            prev={page===1}
            nextCallback={nextCallback}
            prevCallback={prevCallback}
          />
        </PageContainerStyled>
      </ArticleListContainer>
      <PreviewContainer>
        <Preview 
          tab={tab}
          focusedArticle={focusedArticle} />
      </PreviewContainer>
      <MenuIconStyled 
        hidden={!menu}
        onClick={toggleMenu}>
        <MenuIconImage src={MenuIcon} alt="menu" />
      </MenuIconStyled>
    </ArticlesContainer>
  );
};

export default Articles;
