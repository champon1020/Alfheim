import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Cookie from "js-cookie";
import { Config, defaultApi } from "../../App";

const ButtonElement = styled.div`
  display: inline-block;
`;

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const goHome = () => {
  window.location.href = Config.host;
};

const SignInButton = (props: Props) => {
  const { setVerify } = props;
  const [doneVerify, setDoneVerify] = useState(false);
  const [auth2, setAuth2] = useState({} as gapi.auth2.GoogleAuth);

  const verify = useCallback(
    async (user: gapi.auth2.GoogleUser) => {
      setDoneVerify(true);
      return await defaultApi.apiVerifyTokenPost({
        headers: {
          Authorization: `Bearer ${user.getAuthResponse().id_token}`
        }
      });
    },[]
  );

  const onSuccess = useCallback(
    (user: gapi.auth2.GoogleUser) => {
      verify(user)
        .then(res => {
          if(res.data.verify){
            Cookie.set("alfheim_id_token", user.getAuthResponse().id_token);
            setVerify(true);
            return;
          }
          goHome();
        })
        .catch(() => {
          if(doneVerify) {
            goHome();
            return;
          }
        });
    },[setVerify, doneVerify]
  );

  const onFailure = useCallback(
    () => {
      goHome();
    },[]
  );

  useEffect(() => {
    gapi.load("auth2", function() {
      const auth = gapi.auth2.init({
        client_id: Config.clientId,
      });
      setAuth2(auth);
    });

    gapi.signin2.render("my-signin", {
      "scope": "profile email",
      "width": 240,
      "height": 50,
      "longtitle": true,
      "theme": "dark",
      "onsuccess": onSuccess,
      "onfailure": onFailure
    });
  }, [onSuccess, onFailure]);
  
  return (
    <>
      <ButtonElement 
        id="my-signin" />
    </>
  );
};

export default SignInButton;