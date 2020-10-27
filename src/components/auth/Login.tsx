import React from "react";
import styled from "styled-components";

import SignInButton from "./SignInButton";

const LoginContainer = styled.div`
  text-align: center;
`;

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = (props: Props) => {
  const { setVerify } = props;

  return (
    <LoginContainer>
      <SignInButton setVerify={setVerify} />
    </LoginContainer>
  );
};

export default Login;
