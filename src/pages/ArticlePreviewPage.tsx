import Login from "~/components/auth/Login";
import { Error } from "~/error";
import { apiHandlerWithToken } from "~/util/api";
import Cookie from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";

import PublicPage, { IRouteProps } from "./PublicPage";

type Props = IRouteProps;

const ArticlePreviewPage = (props: Props) => {
  const [err, setErr] = useState<Error>(null);
  const [doneVerify, setDoneVerify] = useState(false);
  const [isVerified, setVerified] = useState(false);

  const view = useMemo(() => {
    if (isVerified) {
      return <PublicPage {...props} />;
    }
    if (doneVerify) {
      Cookie.remove("alfheim_id_token");
      return <Login err={err} setErr={setErr} setVerified={setVerified} />;
    }
    return <div></div>;
  }, [isVerified, doneVerify]);

  useEffect(() => {
    apiHandlerWithToken()
      .apiV3PrivateVerifyPost()
      .then((res: any) => {
        setVerified(true);
      })
      .catch((err: Response) => {
        setDoneVerify(true);
      });
  }, []);

  return <>{view}</>;
};

export default ArticlePreviewPage;
