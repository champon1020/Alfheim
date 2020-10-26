import appActionCreator from "~/actions/actions";
import { defaultApi } from "~/api/entry";
import { ErrorStatus, HttpErrorStatus, MyErrorStatus } from "~/error";
import { bearerAuthHeader, parseQueryParam } from "~/func";
import { parse } from "~/parser";
import { IArticleReq, IDraft, IDraftReq, IEditorArticle } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Footer from "./footer/Footer";
import Input from "./Input";
import MarkdownEditor from "./MarkdownEditor";
import RealTimeSave from "./realTimeSave";
import { validateCategory, validateTitle } from "./validations";

const StyledForm = styled.div`
  background-color: whitesmoke;
  .CodeMirror {
    height: 71vh;
  }
`;

// Default editor article|draft object.
const defaultEditorDraft: IEditorArticle = {
  id: "",
  title: "",
  categories: "",
  updateDate: "",
  content: "",
  imageHash: "default.jpg",
  isPrivate: false,
};

// If true, api will not be called.
const apiOff = false;

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
  const [editorArticle, setEditorArticle] = useState(defaultEditorDraft);

  // Draft id which is appended to query parameter.
  const [draftId, setDraftId] = useState<string>();

  // Updating article or not.
  const [isUpdating, setUpdating] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Error classification.
  // If status >= 300, return true.
  const handleError = (status: number): boolean => {
    if (status === 400) setErr(HttpErrorStatus.ERROR_400);
    if (status === 403) setVerify(false);
    if (status === 404) setErr(HttpErrorStatus.ERROR_404);
    if (status === 500) setErr(HttpErrorStatus.ERROR_500);
    return status >= 300;
  };

  // Validate title and categories.
  const validation = useCallback(() => {
    return (
      validateTitle(editorArticle.title, setErr) ||
      validateCategory(editorArticle.categories, setErr)
    );
  }, [editorArticle.title, editorArticle.categories]);

  // Call api to get article by id.
  const fetchArticle = async (id: string) => {
    try {
      const res = await defaultApi.apiPrivateFindArticleIdGet(id, {
        headers: bearerAuthHeader(),
      });

      const editorArticle: IEditorArticle = parse(
        res.data.article,
        "IEditorArticle"
      );

      setEditorArticle(editorArticle);
    } catch (err) {
      handleError(err.response.status);
    }
  };

  // Call api to get draft by id.
  const fetchDraft = async (id: string) => {
    try {
      const res = await defaultApi.apiPrivateFindDraftIdGet(id, {
        headers: bearerAuthHeader(),
      });

      const editorArticle: IEditorArticle = parse(
        res.data.draft,
        "IEditorArticle"
      );

      setEditorArticle(editorArticle);
    } catch (err) {
      handleError(err.response.status);
    }
  };

  // Call api to register article.
  const registerArticle = async (a: IArticleReq, draftId?: string) => {
    if (apiOff) return;

    const req = {
      article: a,
      draftId: draftId,
    };

    try {
      const res = await defaultApi.apiPrivateRegisterArticlePost(req, {
        headers: bearerAuthHeader(),
        validateStatus: (status: number) => {
          return 200 <= status && status < 400;
        },
      });

      window.open("/manage/articles", "_self");
    } catch (err) {
      handleError(err.response.status);
    }
  };

  // Call api to register draft.
  const registerDraft = async (d: IDraftReq) => {
    if (apiOff) {
      setMsg("Saved!");
      return;
    }

    const req = { draft: d };

    try {
      const res = await defaultApi.apiPrivateRegisterDraftPost(req, {
        headers: bearerAuthHeader(),
        validateStatus: (status: number) => {
          return 200 <= status && status < 400;
        },
      });

      setMsg("Saved!");

      // Update editor draft id and reload.
      editorArticle.id = res.data.id;
      window.history.pushState(null, "", "?draftId=" + res.data.id);
    } catch (err) {
      handleError(err.response.status);
    }
  };

  // Call api to update article.
  const updateArticle = async (a: IArticleReq) => {
    if (apiOff) {
      setMsg("Updated!");
      return;
    }

    const req = { article: a };

    try {
      const res = await defaultApi.apiPrivateUpdateArticlePut(req, {
        headers: bearerAuthHeader(),
        validateStatus: (status: number) => {
          return 200 <= status && status < 400;
        },
      });

      setMsg("Updated!");
    } catch (err) {
      handleError(err.response.status);
    }
  };

  // Call api to update draft.
  const updateDraft = async (d: IDraftReq) => {
    if (apiOff || validation()) {
      setMsg("Updated!");
      return;
    }

    const req = { draft: d };

    try {
      const res = await defaultApi.apiPrivateUpdateDraftPut(req, {
        headers: bearerAuthHeader(),
        validateStatus: (status: number) => {
          return 200 <= status && status < 400;
        },
      });

      setMsg("Updated!");
    } catch (err) {
      handleError(err.response.status);
    }
  };

  // Saving on real time.
  const onlineSave = (editorArticle: IEditorArticle) => {
    // Update the state of editor draft.
    const draft: IDraft = parse(editorArticle, "IDraft");
    dispatch(appActionCreator.updateDraft(draft, editorArticle.content));

    if (isUpdating) return;
    const reqDraft: IDraftReq = parse(editorArticle, "IDraftReq");

    // Call updating function after onlineSaveDuration.
    rts.save(() => {
      if (draftId != null) {
        console.log("update");
        updateDraft(reqDraft);
        return;
      }

      console.log("save");
      registerDraft(reqDraft);
    }, onlineSaveDuration);
  };

  // On click listener of submit button.
  // - Validate title and categories.
  // - Get editor content.
  // - Parse editor article|draft object to request type.
  // - Call api.
  const onSubmit = () => {
    if (validation()) return;
    const reqArticle: IArticleReq = parse(editorArticle, "IArticleReq");

    if (isUpdating) {
      updateArticle(reqArticle);
      return;
    }

    registerArticle(reqArticle, draftId);
  };

  // On click listener of preview button.
  // - Validate title and categories.
  // - Open the window of preview.
  const onPreview = () => {
    if (validation()) return;
    window.open("/article-draft/");
  };

  // On change listener of title form.
  // Update editor article|draft object and call function of saving on real time.
  const onChangeTitle = (value: string) => {
    editorArticle.title = value;
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  // On change listener of categories form.
  // Update editor article|draft object and call function of saving on real time.
  const onChangeCategories = (value: string) => {
    editorArticle.categories = value;
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  // On change listener of image form.
  // Update editor article|draft object and call function of saving on real time.
  const onChangeImage = (value: string) => {
    editorArticle.imageHash = value;
    setMsg("");
    setErr(MyErrorStatus.NONE);
    onlineSave(editorArticle);
  };

  // On change listener of markdown editor.
  const onChangeMarkdown = (value: string) => {
    // When the markdonw editor is mounted, this onchange listener is executed.
    // So this if statement prevents from the pre-execution.
    if (firstMount) {
      firstMount = false;
      return;
    }

    editorArticle.content = value;
    setErr(MyErrorStatus.NONE);
    setMsg("");
    onlineSave(editorArticle);
  };

  // Fetch article or draft by whether articleId or draftId is undefined or not.
  useEffect(() => {
    const qParams = parseQueryParam(window.location.href);

    if (qParams["articleId"] != null) {
      fetchArticle(qParams["articleId"]);
      setUpdating(true);
    }

    if (qParams["draftId"] != null) {
      fetchDraft(qParams["draftId"]);
      setDraftId(qParams["draftId"]);
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
        onChangeHandler={onChangeCategories}
        initValue={editorArticle.categories}
        placeholder="category"
      />
      <MarkdownEditor
        value={editorArticle.content}
        onChange={onChangeMarkdown}
      />
      <Footer
        imageHash={editorArticle.imageHash}
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
