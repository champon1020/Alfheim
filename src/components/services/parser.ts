import { Draft, ArticleType } from "src/type";

type Map = { [key: string]: string }

export const parseQueryParam = (url: string): Map => {
  const elem = url.split("?");
  if(elem.length === 1) return {};
  const paramMap: Map = {};
  const paramSection = elem[1];
  paramSection.split("&").forEach(v => {
    const keyValue = v.split("=");
    if(keyValue.length === 2) {
      const key = v.split("=")[0];
      const value = v.split("=")[1];
      paramMap[key] = value;
    }
  });
  return paramMap;
};

// export const parseUrl = (url: string): string[] => {
//   const elem = url.split("?")[0].split("/");
//   return elem;
// };

export const formatDateStr = (d: string) => {
  return d.substr(0, 10);
};

export const parseStringToDate = (s: string) => {
  return new Date(s);
};

export const parseDraftToArticle = (draft: Draft): ArticleType => {
  const today = new Date();
  return {
    id: draft.id,
    title: draft.title,
    categories: [],
    createDate: today.toString(),
    updateDate: today.toString(),
    contentHash: draft.contentHash,
    imageHash: draft.imageHash,
    _private: draft._private === undefined ? false : draft._private
  };
};
