import Button from "~/components/manage/article/Button";
import { Config } from "~/config";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

const StyledHeader = styled.div<{ selected: boolean }>`
  display: flex;
  height: var(--header-height);
  border-bottom: solid 3px lightgray;
  margin-top: 2rem;
  padding: 0 2%;
  & h2 {
    width: 80%;
    font-size: 2rem;
    color: ${({ selected }) => `${selected ? "black" : "gray"}`};
  }
  & button {
    width: 20%;
    font-size: 1.5rem;
  }
`;

type Props = {
  tab: string;
  focusedArticle: IArticle;
};

const Header = (props: Props) => {
  const { tab, focusedArticle } = props;

  // On click listener of 'Edit' button.
  // Jump to edit page with article|draft id.
  const onClickEdit = useCallback(() => {
    if (focusedArticle.id === undefined) {
      return;
    }

    const pName = tab === "articles" ? "articleId" : "draftId";
    window.open(`${Config.url}/manage?${pName}=${focusedArticle.id}`, "_self");
  }, [focusedArticle.id, tab]);

  return (
    <StyledHeader selected={focusedArticle.title !== undefined}>
      <h2>
        {focusedArticle.title === undefined
          ? "Select Article"
          : focusedArticle.title}
      </h2>
      <Button
        backgroundColor="yellowgreen"
        color="white"
        handleOnClick={onClickEdit}
        text="Edit"
        width="80"
        height="70"
      />
    </StyledHeader>
  );
};

export default Header;
