import React, { useEffect, useState, useCallback } from "react";
import CreateArticle from "../manage/CreateArticle";
import ToolBar from "../manage/ToolBar";
import { RouteComponentProps } from "react-router-dom";
import Images from "../manage/Images";
import Articles from "../manage/Articles";
import Settings from "../manage/Settings";
import styled from "styled-components";
import { parseQueryParam, parseCookie } from "../services/parser";
import Login from "../auth/Login";
import { Config } from "src/App";

const ManageContainerStyled = styled.div`
  min-height: 100vh;
  background-color: var(--manage-base-color);
`;

const ManageWrapperStyled = styled.div`
  width: 80%;
  margin: auto;
`;

type RouteProps = RouteComponentProps<{mode: string}>
type Props = RouteProps;

const ManageView: React.FC<Props> = (props) => {
  const { mode } = props.match.params;

  const child = useCallback(
    () => {
      if(mode === "images") 
        return <Images />;
      if(mode === "settings") 
        return <Settings />;
      if(mode === "articles" || mode === "drafts") 
        return <Articles />;

      const qParams = parseQueryParam(window.location.href);
      return(
        <CreateArticle 
          articleId={qParams["articleId"]}
          draftId={qParams["draftId"]} />
      );
    },
    [mode],
  );

  const verifyToken = useCallback(
    (tok: string): boolean => {
      return true;
    },
    [],
  );

  useEffect(() => {
    const cookie = parseCookie(document.cookie);
    if(!verifyToken(cookie["id_token"])) {
      window.location.href = Config.host + "/login";
    }
  },[]);

  return(
    <ManageContainerStyled>
      <ToolBar mode={mode} />
      <ManageWrapperStyled>
        {child()}
      </ManageWrapperStyled>
    </ManageContainerStyled>
  );
};

export default ManageView;