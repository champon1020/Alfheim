import React from "react";
import styled from "styled-components";
import { Config } from "../../App";

const ArticleShareBoxStyled = styled.div`
  margin-bottom: 50px;
`;

const ShareListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 86%;
  margin: 0 auto;
`;

const ShareListItemStyled = styled.li`
  margin-right: 2rem;
`;

const ShareButton = styled.a`
  position: relative;
  &:hover {
    opacity: 0.6;
  }
`;

const ShareBox = () => {
  return (
    <ArticleShareBoxStyled>
      <ShareListStyled>
        <ShareListItemStyled>
          <script async src="https://platform.twitter.com/widgets.js"></script>
          <ShareButton
            className="twitter-share-button"
            data-text="sample tweet"
            data-url={`${Config.host}/article/1`}
            data-lang="ja"
            href="https://twitter.com/intent/tweet">
          </ShareButton>
        </ShareListItemStyled>
        <ShareListItemStyled>
          <div 
            className="fb-share-button" 
            data-href="https://developers.facebook.com/docs/plugins/" 
            data-layout="button" 
            data-size="small">
            <a 
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" 
              className="fb-xfbml-parse-ignore">
            シェア
            </a>
          </div>
        </ShareListItemStyled>
      </ShareListStyled>
    </ArticleShareBoxStyled>
  );
};

export default ShareBox;