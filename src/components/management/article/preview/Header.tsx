import Button from "~/components/management/article/Button";
import Config from "~/config";
import { IArticle } from "~/interfaces";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

const StyledHeader = styled.div<{ selected: boolean }>`
  display: flex;
  height: calc(var(--management-articles-preview-header-height) - 2rem);
  margin-top: 2rem;
  padding: 0 2%;
  border-bottom: solid thin var(--border-color);
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
  focusedArticle: IArticle;
};

const Header = (props: Props) => {
  const { focusedArticle } = props;

  if (focusedArticle == null) {
    return (
      <StyledHeader selected={false}>
        <h2>{"SelectArticle"}</h2>
      </StyledHeader>
    );
  }

  const onClickEdit = useCallback(() => {
    if (focusedArticle.id == null) {
      return;
    }
    window.open(
      `${Config.origin}/management/write?id=${focusedArticle.id}`,
      "_self"
    );
  }, [focusedArticle.id]);

  return (
    <StyledHeader selected={true}>
      <h2>{focusedArticle.title}</h2>
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
