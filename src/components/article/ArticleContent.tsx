import * as React from "react";
import ax from "axios";

interface State {
  content: string;
}

const BASE_URL = "https://blog.champon.xyz/articles/";

class ArticleContent extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this.parseArticleContent();
  }

  parseArticleContent() {
    const axios = ax.create();
    const url = BASE_URL + "/article1.html";
    axios.get(url)
      .then(res => {
        this.setState({content: res.data });
      });
  }

  render() {
    const par = document.querySelector("#article-content");
    par?.insertAdjacentHTML("afterbegin", this.state.content);
    return(
      <article id="article-content"></article>
    );
  }
}

export default ArticleContent;