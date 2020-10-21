import { ArticleIface, CategoryIface, DraftIface } from "~/type";

type Map = { [key: string]: string };

// Parse query parameters and return the map of them.
export const parseQueryParam = (url: string): Map => {
  const elem = url.split("?");
  if (elem.length === 1) return {};
  const paramMap: Map = {};
  const paramSection = elem[1];
  paramSection.split("&").forEach((v) => {
    const keyValue = v.split("=");
    if (keyValue.length === 2) {
      paramMap[keyValue[0]] = keyValue[1];
    }
  });
  return paramMap;
};

// Get only page parameter from query parameters.
export const parsePage = (href: string): number => {
  const page = parseQueryParam(href)["p"];
  return page === undefined ? 1 : Number.parseInt(page);
};

// Format date string which is RFC3339 to HHHH/MM/DD.
export const formatDateStr = (d?: string) => {
  if (d === undefined) return "";
  return d.substr(0, 10);
};

// Category (string: for draft object) => CategoryIface[]
const parseCategoryDraftToArticle = (category: string): CategoryIface[] => {
  const categories = category.split(",");
  const categoryList = [] as CategoryIface[];
  if (categories[0] === "") return categoryList;
  categories.forEach((v) => {
    categoryList.push({
      id: "id",
      name: v,
      articleNum: 1,
    });
  });
  return categoryList;
};

// DraftIface => ArticleIface
export const parseDraftToArticle = (draft: DraftIface): ArticleIface => {
  const today = new Date();
  return {
    id: draft.id,
    sortedId: draft.sortedId,
    title: draft.title,
    categories: parseCategoryDraftToArticle(draft.categories),
    createDate: today.toISOString(),
    updateDate: "",
    content: draft.content,
    imageHash: draft.imageHash,
    isPrivate: true,
  };
};

// Join uri path.
export const pathJoin = (...el: string[]): string => {
  let res = "";
  el?.forEach((v, i) => {
    if (i !== 0) res += "/";
    res += v;
  });
  return res;
};
