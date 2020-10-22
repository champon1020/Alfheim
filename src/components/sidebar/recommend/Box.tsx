import { Config } from "~/config";
import { pathJoin } from "~/func";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

import Image from "./Image";
import Title from "./Title";

const StyledBox = styled.li`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover > img {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

type Props = {
  article: IArticle;
};

const Box = (props: Props) => {
  const { article } = props;

  const onClickBox = useCallback(() => {
    window.open(
      pathJoin(Config.url, "article", article.sortedId.toString()),
      "_self"
    );
  }, [article]);

  return (
    <StyledBox onClick={onClickBox}>
      <Image imageHash={article.imageHash} />
      <Title title={article.title} />
    </StyledBox>
  );
};

export default Box;
