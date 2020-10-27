import { defaultApi } from "~/api/entry";
import Login from "~/components/auth/Login";
import ErrorBoundary from "~/components/error/ErrorBoundary";
import Articles from "~/components/manage/article/Articles";
import Editor from "~/components/manage/editor/Editor";
import Images from "~/components/manage/image/Images";
import Settings from "~/components/manage/Settings";
import ToolBar from "~/components/manage/ToolBar";
import { bearerAuthHeader } from "~/misc/auth";
import { parseQueryParam } from "~/misc/param";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  min-height: 100vh;
  background-color: var(--manage-base-color);
`;

const StyledWrapper = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 1100px) {
    width: 98%;
  }
`;

type Props = RouteComponentProps<{ mode: string }>;

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

    return <Editor setVerify={setVerify} />;
  }, [mode]);

  const manageContainerView = useMemo(() => {
    // If verification has been successed.
    if (isVerify) {
      return (
        <>
          <ToolBar mode={mode} />
          <StyledWrapper>{childContainer()}</StyledWrapper>
        </>
      );
    }

    // If the verification has been failed, mount the login page.
    if (doneVerify) {
      Cookie.remove("alfheim_id_token");
      return <Login setVerify={setVerify} />;
    }

    return <div></div>;
  }, [childContainer, mode, isVerify, doneVerify]);

  // Verify token from cookie.
  // If verify is success, update the state of verify to true.
  useEffect(() => {
    const verify = async () => {
      try {
        await defaultApi.apiVerifyTokenPost({
          headers: bearerAuthHeader(),
          validateStatus: (status: number) => {
            return 200 <= status && status < 400;
          },
        });

        setVerify(true);
      } catch (err) {
        setVerify(false);
      }

      setDoneVerify(true);
    };

    verify();
  }, []);

  return (
    <ErrorBoundary>
      <StyledContainer>{manageContainerView}</StyledContainer>
    </ErrorBoundary>
  );
};

export default ManageView;
