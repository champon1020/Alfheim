import Config from "~/config";
import { IArticle } from "~/interfaces";
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
    window.open(`${Config.origin}/article/${article.id}`, "_self");
  }, [article]);

  return (
    <StyledBox onClick={onClickBox}>
      <Image src={article.imageUrl} />
      <Title title={article.title} />
    </StyledBox>
  );
};

export default Box;
