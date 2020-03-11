import * as React from "react";
import styled from "styled-components";

const SettingContainerStyled = styled.div`
  margin-top: 40px; 
`;

const SettingFormStyled = styled.div`
  width: 70%;
  margin: auto;
  padding: 30px 50px;
  background-color: white;
`;

const SettingElementStyled = styled.div`
  margin-bottom: 70px;
  & h3 {
    margin: 0 0 20px 0;
    font-size: 30px;
    border-bottom: solid thin black;
  }
  & input {
    font-size: 24px;
    height: 20px;
    width: 70%;
  }
`;

const Settings = () => {
  return(
    <SettingContainerStyled>
      <SettingFormStyled>
        <SettingElementStyled>
          <h3>header image</h3>
          <input />
        </SettingElementStyled>
        <SettingElementStyled>
          <h3>number of viewing articles</h3>
          <input />
        </SettingElementStyled>
      </SettingFormStyled>
    </SettingContainerStyled>
  );
};

export default Settings;