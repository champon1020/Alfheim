import * as React from "react";
import CreateArticle from "../manage/CreateArticle";
import ToolBar from "../manage/ToolBar";
import { RouteComponentProps } from "react-router-dom";
import Images from "../manage/Images";
import Articles from "../manage/Articles";
import Settings from "../manage/Settings";
import styled from "styled-components";
import { parseQueryParam } from "../services/parser";

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
  const mode = props.match.params.mode;
  let element;
  if(mode === undefined) {
    const qParams = parseQueryParam(window.location.href);
    element = <CreateArticle articleId={qParams["articleId"]} />;
  }
  if(mode === "images") element = <Images />;
  if(mode === "settings") element = <Settings />;
  if(mode === "articles" || mode === "drafts") element = <Articles />;

  return(
    <ManageContainerStyled>
      <ToolBar mode={mode} />
      <ManageWrapperStyled>
        {element}
      </ManageWrapperStyled>
    </ManageContainerStyled>
  );
};

export default ManageView;