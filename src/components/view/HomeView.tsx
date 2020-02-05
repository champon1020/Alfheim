import * as React from "react";
import "../../assets/styles/app.css";
import Header from "../common/Header";
import ImageHeader from "../common/ImageHeader";
import Bar from "../common/Bar";
import Footer from "../common/Footer";
import ArticleList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { store } from "../../stores/store";
import { ArticleType } from "../../types/types";
import { Dispatch, Action } from "redux";
import { appActionCreator } from "../../actions/actions";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

interface StateToProps {
  articles: ArticleType[];
  recomArticles: Array<{id: number; title: string}>;
}

interface DispatchToProps {
  updateArticles: (articles: ArticleType[]) => void;
  updateRecommendArticles: (recomArticles: Array<{id: number; title: string}>) => void;
}

type RouteProps = RouteComponentProps<{
  page: string | undefined;
  categoryId: string | undefined;
  year: string | undefined;
  month: string | undefined;
}>;

type Props = StateToProps & DispatchToProps & RouteProps;

interface State {
  mode: "article" | "category" | "date";
  page: number;
}

class HomeView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mode: this.validatePathname(),
      page: this.validatePageParam()
    };
  }

  componendDidMount() {
    // call api and update redux
    switch(this.state.mode) {
    case "article":
    case "category": 
      //const categoryId = this.validateCategoryIdParam();
      break;
    case "date":
      //const {year, month} = this.validateYearMonthParam();
      break;
    }
  }

  validatePathname(): "article" | "category" | "date" {
    const pathname = this.props.location.pathname;
    return pathname.startsWith("category") ? "category" 
      : pathname.startsWith("date") ? "date" 
        : "article";
  }

  validatePageParam(): number {
    const page = this.props.match.params.page;
    return page === undefined ? 0 : Number.parseInt(page);
  }

  validateCategoryIdParam(): number {
    const categoryId = this.props.match.params.categoryId;
    return categoryId === undefined ? 0 : Number.parseInt(categoryId);
  }

  validateYearMonthParam(): {year: number; month: number} {
    const year = this.props.match.params.year;
    const month = this.props.match.params.month;
    return {
      year: year === undefined ? 1 : Number.parseInt(year),
      month: month === undefined ? 1 : Number.parseInt(month)
    };
  }

  render() {
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
              <ArticleList articles={this.props.articles} />
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
  }
}

export type RootState = ReturnType<typeof store.getState>

const mapStateToProps = (state: RootState): StateToProps => {
  return {
    articles: state.articlesReducer.articles,
    recomArticles: state.sidebarReducer.recomArticles
  };
};

const mapDispatchToState = (dispatch: Dispatch<Action>): DispatchToProps => {
  return {
    updateArticles(articles: ArticleType[]) {
      dispatch(appActionCreator.updateArticles(articles));
    },
    updateRecommendArticles(recomArticles: Array<{id: number; title: string}>) {
      dispatch(appActionCreator.updateRecommendArticles(recomArticles));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToState)(HomeView);
