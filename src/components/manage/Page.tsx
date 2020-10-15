import BackIcon from "~/assets/images/icons/back.svg";
import NextIcon from "~/assets/images/icons/next.svg";
import React from "react";
import styled from "styled-components";

const PageContainer = styled.div<{ height: number; width: string | undefined }>`
  width: ${({ width }) => (width === undefined ? "" : width + "%")};
  height: ${({ height }) => height * 0.8 + "rem"};
  padding: ${({ height }) => height * 0.1 + "rem"} 2rem;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const IconBox = styled.div`
  width: 40%;
  text-align: center;
  &:hover {
    opacity: 0.6;
  }
`;

const IconStyled = styled.img<{ hidden: boolean }>`
  visibility: ${({ hidden }) => `${hidden ? "hidden" : ""}`};
  height: 98%;
  cursor: pointer;
`;

const CurrentStyled = styled.h3`
  text-align: center;
  font-size: 2.4rem;
  width: 20%;
`;

type Props = {
  current: number;
  width?: string;
  height: string;
  next: boolean;
  prev: boolean;
  nextCallback: () => void;
  prevCallback: () => void;
};

const Page = (props: Props) => {
  const {
    current,
    width,
    height,
    next,
    prev,
    nextCallback,
    prevCallback,
  } = props;

  return (
    <PageContainer height={Number.parseInt(height)} width={width}>
      <IconBox>
        <IconStyled
          onClick={prevCallback}
          hidden={prev}
          src={BackIcon}
          alt="back"
        />
      </IconBox>
      <CurrentStyled>{current}</CurrentStyled>
      <IconBox>
        <IconStyled
          onClick={nextCallback}
          hidden={next}
          src={NextIcon}
          alt="next"
        />
      </IconBox>
    </PageContainer>
  );
};

export default Page;
