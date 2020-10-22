import { Config } from "~/config";
import { pathJoin } from "~/func";
import { IArticle } from "~/type";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import ButtonBox from "./ButtonBox";
import Image from "./Image";
import TitleDate from "./TitleDate";

const StyledBox = styled.li`
  --box-height: 80px;
  --box-padding-v: 5px;

  position: relative;
  z-index: 2;
  height: var(--box-height);
  padding: var(--box-padding-v) 5px;
  background-color: white;
  display: flex;
  flex-direction: row;
  border: solid thin lightgray;
  cursor: pointer;
  &:focus,
  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    height: calc(var(--box-height) * 2.5);
  }
`;

interface Props {
  article: IArticle;
  tab: string;
  setFocusedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Box = (props: Props) => {
  const { article, tab, setFocusedArticle, setVerify } = props;

  const image = useMemo(() => {
    return pathJoin(
      Config.fileUrl,
      "images",
      article.imageHash === "" ? Config.defImg : article.imageHash
    );
  }, [article.imageHash]);

  // On focuse listener of article box.
  // Set focues article.
  const onClickArticle = useCallback(() => {
    setFocusedArticle(article);
  }, [article, setFocusedArticle]);

  return (
    <StyledBox onClick={onClickArticle}>
      <Image src={image} alt={article.title} />
      <TitleDate
        title={article.title}
        date={tab === "drafts" ? article.updateDate : article.createDate}
      />
      <ButtonBox tab={tab} article={article} setVerify={setVerify} />
    </StyledBox>
  );
};

export default Box;
