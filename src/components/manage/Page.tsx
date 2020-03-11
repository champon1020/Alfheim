import React from "react";
import styled from "styled-components";
import NextIcon from "../../assets/images/next.svg";
import BackIcon from "../../assets/images/back.svg";

const PageContainer = styled.div<{height: number; width: string | undefined}>`
  width: ${({width}) => width===undefined ? "" : width+"%"};
  height: ${({height}) => (height*0.8)+"rem"};
  padding: ${({height}) => (height*0.1)+"rem"} 2rem;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const IconStyled = styled.img<{visible: boolean}>`
  visibility: ${({visible}) => `${visible ? "visible" : "hidden"}`};
  height: 98%;
`;

type Props = {
  width?: string;
  height: string;
  next: boolean;
  back: boolean;
}

const Page = (props: Props) => {
  const { width, height, next, back } = props;

  return (
    <PageContainer 
      height={Number.parseInt(height)}
      width={width}>
      <IconStyled 
        visible={back}
        src={BackIcon} 
        alt="back" />
      {"1 2 3"}
      <IconStyled 
        visible={next}
        src={NextIcon} 
        alt="next" />
    </PageContainer>
  );
};

export default Page;