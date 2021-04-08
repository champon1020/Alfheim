import { ErrorStatus, HttpErrorStatus, MyErrorStatus } from "~/error";
import { IArticle } from "~/interfaces";
import { apiHandlerWithToken } from "~/util/api";
import { ConvertITagsToStr, ConvertStrToITags } from "~/util/converters.ts";
import { parseQueryParam } from "~/util/util";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Footer from "./footer/Footer";
import Input from "./Input";
import MarkdownEditor from "./MarkdownEditor";
import RealTimeSave from "./realTimeSave";
import { validateTag, validateTitle } from "./validations";

const StyledForm = styled.div`
  background-color: whitesmoke;
  .CodeMirror {
    height: 71vh;
  }
`;

// Default editor article|draft object.
const defaultEditorArticle: IArticle = {
  id: "",
  title: "",
  tags: [],
  createdAt: "",
  updatedAt: "",
  content: "",
  imageUrl: "default.jpg",
  status: 2,
};

// If true, api will not be called.
const offApi = false;

// Duration of saving article on real time.
const onlineSaveDuration = 3000;

const rts = new RealTimeSave();

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = (props: Props) => {
  const { setVerify } = props;

  let firstMount = true;

  // Some message displayed on the bottom of editor.
  const [msg, setMsg] = useState("");

  // There are some errors or not.
  const [err, setErr] = useState<ErrorStatus>(MyErrorStatus.NONE);

  // Article or draft information.
  const [editorArticle, setEditorArticle] = useState(defaultEditorArticle);

  // Error classification.
  // If status >= 300, return true.
  const handleError = (status: number): boolean => {
    if (status === 400) setErr(HttpErrorStatus.ERROR_400);
    if (status === 403) setVerify(false);
    if (status === 404) setErr(HttpErrorStatus.ERROR_404);
    if (status === 500) setErr(HttpErrorStatus.ERROR_500);
    return status >= 300;
  };

  // Validate title and tags.
  const validation = useCallback(() => {
    return (
      validateTitle(editorArticle.title, setErr) ||
      validateTag(editorArticle.tags, setErr)
    );
  }, [editorArticle.title, editorArticle.tags]);

  // Call api to get article by id.
  const fetchArticle = async (id: string) => {
    apiHandlerWithToken()
      .apiV3PrivateGetArticleIdIdGet({ id: id })
      .then((res: any) => {
        setEditorArticle(res.article);
      })
      .catch((err: any) => {
        handleError(err.response.status);
      });
  };

  // Call api to register article.
  const postArticle = async (article: IArticle) => {
    if (offApi) return;

    const postArticleRequestBody = {
      title: editorArticle.title,
      tags: editorArticle.tags,
      content: editorArticle.content,
      imageUrl: editorArticle.imageUrl,
      status: editorArticle.status,
    };
    apiHandlerWithToken()
      .apiV3PrivatePostArticlePost({ postArticleRequestBody })
      .then((res: any) => {
        editorArticle.id = res.id;
        setEditorArticle(editorArticle);
      })
      .catch((err: any) => {
        handleError(err.response.status);
      });
  };

  // Call api to update article.
  const updateArticle = async (article: IArticle) => {
    if (offApi) {
      setMsg("Updated!");
      return;
    }

    const updateArticleRequestBody = {
      id: editorArticle.id,
      title: editorArticle.title,
      tags: editorArticle.tags,
      content: editorArticle.content,
      imageUrl: editorArticle.imageUrl,
      status: editorArticle.status,
    };
    apiHandlerWithToken()
      .apiV3PrivateUpdateArticlePut({ updateArticleRequestBody })
      .then((res: any) => {
        setMsg("Updated!");
      })
      .catch((err: any) => {
        handleError(err.response.status);
      });
  };

  // Saving on real time.
  const onlineSave = (editorArticle: IArticle) => {
    if (editorArticle.status == 1) return;
    rts.save(() => {
      if (editorArticle != null) {
        updateArticle(editorArticle);
        return;
      }
      postArticle(editorArticle);
    }, onlineSaveDuration);
  };

  const onSubmit = () => {
    if (editorArticle.status == 2) {
      editorArticle.status = 1;
    }
    if (editorArticle.id != null) {
      updateArticle(editorArticle);
      return;
    }
    postArticle(editorArticle);
    window.open("management/articles", "_self");
  };

  const onPreview = () => {
    if (validation()) return;
    if (editorArticle.id == "") {
      setMsg("article is not saved");
      return;
    }
    window.open(`/article/preview/${editorArticle.id}`);
  };

  const onChangeTitle = (value: string) => {
    editorArticle.title = value;
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  const onChangeTags = (value: string) => {
    editorArticle.tags = ConvertStrToITags(value);
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  const onChangeImage = (value: string) => {
    editorArticle.imageUrl = value;
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  const onChangeMarkdown = (value: string) => {
    // When the markdonw editor is mounted, this onchange listener is executed.
    // This statement prevents from the pre-execution.
    if (firstMount) {
      firstMount = false;
      return;
    }
    editorArticle.content = value;
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  useEffect(() => {
    const qParams = parseQueryParam(window.location.href);
    if (qParams["id"] != null) {
      fetchArticle(qParams["id"]);
    }
  }, []);

  return (
    <StyledForm>
      <Input
        onChangeHandler={onChangeTitle}
        initValue={editorArticle.title}
        placeholder="title"
      />
      <Input
        onChangeHandler={onChangeTags}
        initValue={ConvertITagsToStr(editorArticle.tags)}
        placeholder="category"
      />
      <MarkdownEditor
        value={editorArticle.content}
        onChange={onChangeMarkdown}
      />
      <Footer
        imageUrl={editorArticle.imageUrl}
        onSubmit={onSubmit}
        onPreview={onPreview}
        onChangeHandler={onChangeImage}
        msg={msg}
        err={err}
      />
    </StyledForm>
  );
};

export default Form;
