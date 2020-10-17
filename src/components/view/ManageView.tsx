import { defaultApi } from "~/App";
import Login from "~/components/auth/Login";
import Articles from "~/components/manage/Articles";
import CreateArticle from "~/components/manage/CreateArticle";
import Images from "~/components/manage/Images";
import Settings from "~/components/manage/Settings";
import ToolBar from "~/components/manage/ToolBar";
import { parseQueryParam } from "~/components/services/parser";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

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

type RouteProps = RouteComponentProps<{ mode: string }>;
type Props = RouteProps;

const ManageView: React.FC<Props> = (props) => {
  const { mode } = props.match.params;

  // If the verification is done or not.
  const [doneVerify, setDoneVerify] = useState(false);

  // If the verification is success or not.
  const [isVerify, setVerify] = useState(false);

  const childContainer = useCallback(() => {
    if (mode === "images") {
      return <Images setVerify={setVerify} />;
    }

    if (mode === "settings") {
      return <Settings />;
    }

    if (mode === "articles" || mode === "drafts") {
      return <Articles setVerify={setVerify} />;
    }

    const qParams = parseQueryParam(window.location.href);
    return (
      <CreateArticle
        setVerify={setVerify}
        articleId={qParams["articleId"]}
        draftId={qParams["draftId"]}
      />
    );
  }, [mode]);

  const manageContainerView = useMemo(() => {
    // If verification has been successed.
    if (isVerify) {
      return (
        <>
          <ToolBar mode={mode} />
          <ManageWrapperStyled>{childContainer()}</ManageWrapperStyled>
        </>
      );
    }

    // If the verification has been failed, mount the login page.
    if (doneVerify) {
      Cookie.remove("alfheim_id_token");
      return <Login setVerify={setVerify} />;
    }

    return <div></div>;
  }, [child, mode, isVerify, doneVerify]);

  // Verify token from cookie.
  // If verify is success, update the state of verify to true.
  useEffect(() => {
    defaultApi
      .apiVerifyTokenPost({
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
        },
      })
      .then((res) => {
        setVerify(res.data.verify === undefined ? false : res.data.verify);
      })
      .catch(() => {
        setVerify(false);
      });

    setDoneVerify(true);
  }, []);

  return <ManageContainerStyled>{manageContainerView}</ManageContainerStyled>;
};

export default ManageView;
