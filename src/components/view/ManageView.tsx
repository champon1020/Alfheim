import * as React from "react";
import CreateArticle from "../manage/CreateArticle";
import ToolBar from "../manage/ToolBar";
import { RouteComponentProps } from "react-router-dom";
import Images from "../manage/Images";
import Articles from "../manage/Articles";
import Settings from "../manage/Settings";
import styled from "styled-components";

const ManageContainerStyled = styled.div`
  min-height: 100vh;
  background-color: rgb(61, 61, 61);
`;

const ManageWrappterStyled = styled.div`
  width: 80%;
  margin: auto;
`;

type RouteProps = RouteComponentProps<{mode: string}>

type Props = RouteProps;

const ManageView: React.FC<Props> = (props) => {
  const mode = props.match.params.mode;
  let element;
  if(mode === undefined) element = <CreateArticle />;
  else if(mode === "images") element = <Images />;
  else if(mode === "articles") element = <Articles />;
  else if(mode === "settings") element = <Settings />;

  return(
    <ManageContainerStyled>
      <ToolBar mode={mode} />
      <ManageWrappterStyled>
        {element}
      </ManageWrappterStyled>
    </ManageContainerStyled>
  );
};

export default ManageView;