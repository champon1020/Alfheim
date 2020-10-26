import {
  IArticle,
  IArticleReq,
  ICategory,
  IDraft,
  IDraftReq,
  IEditorArticle,
  implementsIArticle,
  implementsIDraft,
  implementsIEditorArticle,
} from "./type";

type ParseDist =
  | "IArticle"
  | "IDraft"
  | "IEditorArticle"
  | "IArticleReq"
  | "IDraftReq";

export const parse = (
  obj: IArticle | ICategory | IDraft | IEditorArticle,
  dist: ParseDist
): any => {
  switch (dist) {
    case "IArticle":
      // IDraft => IArticle
      if (implementsIDraft(obj)) {
        return parseIDraftToIArticle(obj);
      }

      break;
    case "IDraft":
      // IEditorArticle => IDraft
      if (implementsIEditorArticle(obj)) {
        parseIEditorArticleToIDraft(obj);
      }
    case "IEditorArticle":
      // IArticle => IEditorArticle
      if (implementsIArticle(obj)) {
        return parseIArticleToIEditorArticle(obj);
      }

      // IDraft => IEditorArticle
      if (implementsIDraft(obj)) {
        return parseIDraftToIEditorArticle(obj);
      }

      break;
    case "IArticleReq":
      // IEditorArticle => IArticleReq
      if (implementsIEditorArticle(obj)) {
        return parseIEditorArticleToIArticleReq(obj);
      }

      break;
    case "IDraftReq":
      // IEditorArticle => IDraftReq
      if (implementsIEditorArticle(obj)) {
        return parseIEditorArticleToIDraftReq(obj);
      }

      break;
  }

  return null;
};

// IDraft => IArticle
const parseIDraftToIArticle = (d: IDraft): IArticle => {
  const categories: ICategory[] = parseCategory(d.categories, "List");

  return {
    id: d.id,
    sortedId: d.sortedId,
    title: d.title,
    categories: categories,
    createDate: undefined,
    updateDate: d.updateDate,
    content: d.content,
    imageHash: d.imageHash,
    isPrivate: true,
  };
};

// IEditorArticle => IDraft
export const parseIEditorArticleToIDraft = (e: IEditorArticle): IDraft => {
  return {
    id: e.id,
    sortedId: -1,
    title: e.title,
    categories: e.categories,
    updateDate: e.updateDate,
    content: e.content,
    imageHash: e.imageHash,
  };
};

// IArticle => IEditorArticle
const parseIArticleToIEditorArticle = (a: IArticle): IEditorArticle => {
  const categories: string = parseCategory(a.categories, "Str");

  return {
    id: a.id,
    title: a.title,
    categories: categories,
    updateDate: a.updateDate,
    content: a.content,
    imageHash: a.imageHash,
    isPrivate: a.isPrivate,
  };
};

// IDraft => IEditorArticle
const parseIDraftToIEditorArticle = (d: IDraft): IEditorArticle => {
  const categories: string = parseCategory(d.categories, "Str");

  return {
    id: d.id,
    title: d.title,
    categories: categories,
    updateDate: d.updateDate,
    content: d.content,
    imageHash: d.imageHash,
    isPrivate: false,
  };
};

// IEditorArticle => IArticleReq
const parseIEditorArticleToIArticleReq = (e: IEditorArticle): IArticleReq => {
  const categories: ICategory[] = parseCategory(e.categories, "List");

  return {
    id: e.id,
    title: e.title,
    categories: categories,
    content: e.content,
    imageHash: e.imageHash,
    isPrivate: e.isPrivate,
  };
};

// EditorArticle => IDraftReq
const parseIEditorArticleToIDraftReq = (e: IEditorArticle): IDraftReq => {
  const categories: string = parseCategory(e.categories, "ReqStr");
  return {
    id: e.id,
    title: e.title,
    categories: categories,
    content: e.content,
    imageHash: e.imageHash,
  };
};

const parseCategory = (
  obj: ICategory[] | string,
  dist: "List" | "Str" | "ReqStr"
): any => {
  switch (dist) {
    case "List":
      // string separated by ',' => ICategory[]
      if (typeof obj === "string") {
        return parseCategoryStrToList(obj);
      }
    case "Str":
      // ICategory[] => string separated by ','
      if (typeof obj === "object") {
        return parseCategoryListToStr(obj);
      }

      // string separated by '&' => string separated by ','
      if (typeof obj === "string") {
        return parseCategoryReqStrToStr(obj);
      }
    case "ReqStr":
      // string separated by ',' => string separated by '&'
      if (typeof obj === "string") {
        return parseCategoryStrToReqStr(obj);
      }
  }

  return null;
};

// Category (string: for draft object) => ICategory[]
const parseCategoryStrToList = (category: string): ICategory[] => {
  const categories = category.split(",");
  if (categories[0] === "") {
    return [];
  }

  const categoryList = [] as ICategory[];
  categories.forEach((v) => {
    categoryList.push({
      id: "",
      name: v,
      articleNum: 0,
    });
  });

  return categoryList;
};

// ICategory[] => Category (string: for draft object)
const parseCategoryListToStr = (categories: ICategory[]): string => {
  if (categories === null) {
    return "";
  }

  let categoryStr = "";
  categories.forEach((v, i) => {
    if (i !== 0) {
      categoryStr += ",";
    }
    categoryStr += v.name;
  });

  return categoryStr;
};

// Category (string: for draft request) => Category (string: for draft object)
const parseCategoryReqStrToStr = (category: string): string => {
  if (category === null) {
    return "";
  }

  return category.replace("&", ",");
};

// Category (string: for draft object) => Category (string: for draft request)
const parseCategoryStrToReqStr = (category: string): string => {
  if (category === null) {
    return "";
  }

  return category.replace(",", "&");
};
