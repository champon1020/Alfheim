import React, { useEffect, useCallback, useState, useMemo } from "react";
import Cookie from "js-cookie";
import CreateArticle from "~/components/manage/CreateArticle";
import ToolBar from "~/components/manage/ToolBar";
import { RouteComponentProps } from "react-router-dom";
import Images from "~/components/manage/Images";
import Articles from "~/components/manage/Articles";
import Settings from "~/components/manage/Settings";
import styled from "styled-components";
import { parseQueryParam } from "~/components/services/parser";
import { defaultApi } from "~/App";
import Login from "~/components/auth/Login";

const ManageContainerStyled = styled.div`
  min-height: 100vh;
  background-color: var(--manage-base-color);
`;

const ManageWrapperStyled = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 1100px) {
    width: 98%;
  }
`;

type RouteProps = RouteComponentProps<{mode: string}>
type Props = RouteProps;

const ManageView: React.FC<Props> = (props) => {
  const { mode } = props.match.params;
  const [doneVerify, setDoneVerify] = useState(false);
  const [isVerify, setVerify] = useState(false);

  const child = useCallback(
    () => {
      if(mode === "images") 
        return <Images setVerify={setVerify}/>;
      if(mode === "settings") 
        return <Settings />;
      if(mode === "articles" || mode === "drafts") 
        return <Articles setVerify={setVerify}/>;

      const qParams = parseQueryParam(window.location.href);
      return(
        <CreateArticle
          setVerify={setVerify}
          articleId={qParams["articleId"]}
          draftId={qParams["draftId"]} />
      );
    },
    [mode],
  );

  const verify = useCallback(
    async () => {
      await defaultApi.apiVerifyTokenPost({
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).then(res => {
        setVerify(res.data.verify === undefined ? false : res.data.verify);
      }).catch(() => {
        setVerify(false);
      });
      setDoneVerify(true);
    },[]
  );

  const view = useMemo(
    () => {
      if(isVerify){
        return(
          <>
            <ToolBar mode={mode} />
            <ManageWrapperStyled>
              {child()}
            </ManageWrapperStyled>
          </>
        );
      }
      if(doneVerify) {
        Cookie.remove("alfheim_id_token");
        return <Login setVerify={setVerify} />;
      }
      return <div></div>;
    },[child, mode, isVerify, doneVerify]
  );

  useEffect(() => {
    verify();
  },[verify]);

  return(
    <ManageContainerStyled>
      {view}
    </ManageContainerStyled>
  );
};

export default ManageView;
