import React, { useCallback, useState, MouseEvent } from "react";
import styled from "styled-components";
import { Config, defaultApi } from "src/App";

const ImageListContainer = styled.div`
  height: calc(var(--images-container-height) - 15rem);
`;

const ImageListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
`;

const ImageListItemStyled = styled.li`
  width: 23%;
  margin: 0 1%;
  &:hover { 
    opacity: 0.6;
  }
`;

const ImageStyled = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const CheckBox = styled.input`
  cursor: pointer;
  transform: scale(1.5);
  color: white;
`;

const DeleteButtonBox = styled.div`
  text-align: right;
  padding: 1% 1%;
`;

const DeleteButton = styled.button`
  font-size: 1.4rem;
  color: white;
  background-color: red;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  images: string[];
}

const ImageList = (props: Props) => {
  const { images } = props;
  const [selected] = useState([] as string[]);

  const handleOnSelect = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      if(e.currentTarget.checked) selected.push(e.currentTarget.name);
      else selected.filter(v => v !== e.currentTarget.name);
    },[selected]
  );

  const deleteImages = useCallback(
    async (names: string[]) => {
      await defaultApi.apiPrivateDeleteImageDelete(names);
    },[]
  );

  const handleOnDelete = useCallback(
    () => {
      deleteImages(selected);
      window.location.reload();
    },[selected, deleteImages]
  );

  const imageList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      images.forEach((v, i) => {
        const path = Config.srcHost + "/images/" + v;
        list.push(
          <ImageListItemStyled key={i}>
            <CheckBox
              type="checkbox"
              name={v}
              onClick={handleOnSelect} />
            <a href={path}>
              <ImageStyled src={path} />
            </a>
          </ImageListItemStyled>
        );
      });
      return list;
    },
    [images, handleOnSelect],
  );

  return(
    <ImageListContainer>
      <ImageListStyled>
        {imageList()}
      </ImageListStyled>
      <DeleteButtonBox>
        <DeleteButton
          onClick={handleOnDelete}>
          {"Delete"}
        </DeleteButton>
      </DeleteButtonBox>
    </ImageListContainer>
  );
};

export default ImageList;