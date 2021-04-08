import Button from "~/components/management/article/Button";
import { IArticle } from "~/interfaces";
import { apiHandlerWithToken } from "~/util/api";
import React, { useCallback } from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(var(--management-articles-preview-footer-height) - 3rem);
  border-top: solid thin var(--border-color);
  padding: 1.3rem 2rem;
`;

type Props = {
  focusedArticle: IArticle;
};

const Footer = (props: Props) => {
  const { focusedArticle } = props;

  if (focusedArticle == null) {
    return <StyledFooter />;
  }

  const jumpToArticle = useCallback(() => {
    window.open(`/article/${focusedArticle.id}`, "_self");
  }, [focusedArticle]);

  const updateArticleStatus = useCallback(() => {
    const updateArticleStatusRequestBody = {
      id: focusedArticle.id,
      status: focusedArticle.status == 0 ? 1 : 0,
    };
    apiHandlerWithToken()
      .apiV3PrivateUpdateArticleStatusPut({ updateArticleStatusRequestBody })
      .catch((err: Response) => {
        //handle error
      });
  }, [focusedArticle]);

  const deleteArticle = useCallback(() => {
    const deleteArticleRequestBody = { id: focusedArticle.id };
    apiHandlerWithToken()
      .apiV3PrivateDeleteArticleDelete({ deleteArticleRequestBody })
      .catch((err: Response) => {
        if (err.status == 403) {
          // handle error
        }
      });
  }, [focusedArticle]);

  if (focusedArticle.status === 2) {
    return (
      <StyledFooter>
        <Button
          backgroundColor={"#FF5733"}
          color="white"
          text={"Delete"}
          width="30"
          height="100"
          handleOnClick={deleteArticle}
        />
      </StyledFooter>
    );
  }

  return (
    <StyledFooter>
      <Button
        backgroundColor={"yellowgreen"}
        color="white"
        text={"Goto"}
        width="30"
        height="100"
        handleOnClick={jumpToArticle}
      />
      {focusedArticle.status === 1 ? (
        <Button
          backgroundColor={"#14A2F3"}
          color="white"
          text={"Public"}
          width="30"
          height="100"
          handleOnClick={updateArticleStatus}
        />
      ) : (
        <Button
          backgroundColor={"#FF5733"}
          color="white"
          text={"Private"}
          width="30"
          height="100"
          handleOnClick={updateArticleStatus}
        />
      )}
      <Button
        backgroundColor={"#FF5733"}
        color="white"
        text={"Delete"}
        width="30"
        height="100"
        handleOnClick={deleteArticle}
      />
    </StyledFooter>
  );
};

export default Footer;
