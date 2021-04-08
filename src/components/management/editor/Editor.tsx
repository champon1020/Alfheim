import Config from "~/config";
import { Error, HttpError } from "~/error";
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
  --management-write-container-height: calc(100vh - 13.5rem);
  --management-write-input-height: 3.5rem;
  --management-write-footer-height: 7rem;
  --management-write-editor-height: calc(
    var(--management-write-container-height) -
      var(--management-write-input-height) * 2 -
      var(--management-write-footer-height)
  );

  height: var(--management-write-container-height);
`;

// Default editor article|draft object.
const defaultEditorArticle: IArticle = {
  id: "",
  title: "",
  tags: [],
  createdAt: "",
  updatedAt: "",
  content: "",
  imageUrl: `${Config.gcsOrigin}/default.jpg`,
  status: 2,
};

// If true, api will not be called.
const offApi = false;

// Duration of saving article on real time.
const onlineSaveDuration = 3000;

const rts = new RealTimeSave();

type Props = {
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const Form = (props: Props) => {
  const { setErr, setVerified } = props;

  let firstMount = true;

  const [msg, setMsg] = useState("");

  // Article or draft information.
  const [editorArticle, setEditorArticle] = useState(defaultEditorArticle);

  // Validate title and tags.
  const validation = useCallback(() => {
    return (
      validateTitle(editorArticle.title, setErr) &&
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
      .catch((err: Response) => {
        if (err.status == 403) {
          setVerified(false);
        } else {
          setErr(new HttpError(err.status, "failed to fetch article"));
        }
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
      .catch((err: Response) => {
        if (err.status == 403) {
          setVerified(false);
        } else {
          setErr(new HttpError(err.status, "failed to post article"));
        }
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
      .catch((err: Response) => {
        if (err.status == 403) {
          setVerified(false);
        } else {
          setErr(new HttpError(err.status, "failed to update article"));
        }
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
    if (!validation()) return;
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
    if (!validation()) return;
    if (editorArticle.id == "") {
      setMsg("article is not saved");
      return;
    }
    window.open(`/article/preview/${editorArticle.id}`);
  };

  const onChangeTitle = (value: string) => {
    editorArticle.title = value;
    setMsg("");
    setErr(null);
    onlineSave(editorArticle);
  };

  const onChangeTags = (value: string) => {
    editorArticle.tags = ConvertStrToITags(value);
    setMsg("");
    setErr(null);
    onlineSave(editorArticle);
  };

  const onChangeImage = (value: string) => {
    editorArticle.imageUrl = value;
    setMsg("");
    setErr(null);
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
    setErr(null);
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
        setVerified={setVerified}
        setErr={setErr}
      />
    </StyledForm>
  );
};

export default Form;
