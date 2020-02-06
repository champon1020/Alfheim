import * as React from "react";
import { useState, useEffect } from "react";
import "../../assets/styles/app.css";
import Header from "../common/Header";
import ImageHeader from "../common/ImageHeader";
import Bar from "../common/Bar";
import Footer from "../common/Footer";
import ArticleList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "../common/Page";

import { store } from "../../stores/store";
import { appActionCreator } from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

type RouteProps = RouteComponentProps<{
  page: string | undefined;
  categoryId: string | undefined;
  year: string | undefined;
  month: string | undefined;
}>;
type Props = RouteProps;
type RootState = ReturnType<typeof store.getState>

const parsePathname = (pathnameParam: string): "article" | "category" | "date" => 
{
  return pathnameParam.startsWith("category") ? "category" 
    : pathnameParam.startsWith("date") ? "date" 
      : "article";
};

const parsePageParam = (pageParam: string | undefined): number => {
  return pageParam === undefined ? 0 : Number.parseInt(pageParam);
};

const HomeView: React.FC<Props> = (props) => {
  const [mode, setMode] = useState(parsePathname(props.location.pathname));
  const [page, setPage] = useState(parsePageParam(props.match.params.page));
  const articles = useSelector((state: RootState) => state.articlesReducer.articles);
  const recomArticles = useSelector((state: RootState) => state.sidebarReducer.recomArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    // call api and update redux
    switch(mode) {
    case "article":
    case "category": 
      //const categoryId = validateCategoryIdParam();
      break;
    case "date":
      //const {year, month} = validateYearMonthParam();
      break;
    }
  });

  const validateCategoryIdParam = (): number => {
    const categoryId = props.match.params.categoryId;
    return categoryId === undefined ? 0 : Number.parseInt(categoryId);
  };

  const validateYearMonthParam = (): {year: number; month: number} => {
    const year = props.match.params.year;
    const month = props.match.params.month;
    return {
      year: year === undefined ? 1 : Number.parseInt(year),
      month: month === undefined ? 1 : Number.parseInt(month)
    };
  };

  return(
    <div id="container">
      <header>
        <Header />
        <ImageHeader />
      </header>
      <main>
        <Bar />
        <div id="home-wrapper">
          <div className="order1">
            <ArticleList articles={articles} />
            <Page />
          </div>
          <div className="order2">
            <SideBar />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeView;
