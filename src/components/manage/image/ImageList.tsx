import { defaultApi } from "~/api/entry";
import { Config } from "~/config";
import Cookie from "js-cookie";
import React, { MouseEvent, useCallback, useState } from "react";
import styled from "styled-components";

const ImageListContainer = styled.div`
  margin: 2rem 0;
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
  @media (max-width: 1100px) {
    width: 31%;
  }
  @media (max-width: 500px) {
    margin: 0 2%;
    width: 45%;
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

const EmptyMessage = styled.h3`
  font-size: 2.4rem;
  color: gray;
  margin: 5% auto 15% auto;
`;

type Props = {
  images: string[];
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageList = (props: Props) => {
  const { images, setVerify } = props;

  // Selected images.
  // Checked images will be deleted as the delete button is clicked.
  const [selected] = useState([] as string[]);

  // Call api of deleting image.
  const deleteImages = (names: string[]) => {
    defaultApi
      .apiPrivateDeleteImageDelete(names, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
        },
      })
      .catch(() => {
        setVerify(false);
      });
  };

  // On focus listener of selecting image.
  // If focused, push to selected array.
  const handleOnSelect = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        selected.push(e.currentTarget.name);
      } else {
        selected.filter((v) => v !== e.currentTarget.name);
      }
    },
    [selected]
  );

  // On click listener of deleting image.
  // Call api with the array of selected images.
  // Reload this window.
  const handleOnDelete = useCallback(() => {
    deleteImages(selected);
    window.location.reload();
  }, [selected, deleteImages]);

  // Create image list.
  // If images is null or undefined or empty,
  // return message which tells about empty.
  // Or return image list component.
  const imageList = useCallback(() => {
    const list = [] as JSX.Element[];
    if (images === null || images === undefined || images.length === 0) {
      return <EmptyMessage>{"No Images"}</EmptyMessage>;
    }

    images.forEach((v, i) => {
      const path = `${Config.srcHost}/images/${v}`;
      list.push(
        <ImageListItemStyled key={i}>
          <CheckBox type="checkbox" name={v} onClick={handleOnSelect} />
          <a href={path}>
            <ImageStyled src={path} />
          </a>
        </ImageListItemStyled>
      );
    });

    return list;
  }, [images, handleOnSelect]);

  return (
    <ImageListContainer>
      <ImageListStyled>{imageList()}</ImageListStyled>
      <DeleteButtonBox>
        <DeleteButton onClick={handleOnDelete}>{"Delete"}</DeleteButton>
      </DeleteButtonBox>
    </ImageListContainer>
  );
};

export default ImageList;
