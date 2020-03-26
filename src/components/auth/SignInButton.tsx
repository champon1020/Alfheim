import React, { useCallback, useEffect, useState } from "react";
import { Config } from "../../App";

const SignInButton = () => {
  const [auth2, setAuth2] = useState({} as gapi.auth2.GoogleAuth);

  const onSuccess = useCallback(
    (res: gapi.auth2.GoogleUser) => {
      console.log(res);
      // send auth code to server
    },[]
  );

  const onFailure = useCallback(
    () => {
      window.location.href = Config.host;
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
  }, []);
  
  return (
    <>
      <div id="my-signin"></div>
    </>
  );
};

export default SignInButton;