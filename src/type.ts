export interface IArticle {
  id: string;
  title: string;
  categories: ICategory[];
  createdDate: string;
  updatedDate: string;
  content: string;
  imageName: string;
  _private: boolean;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
export const implementsIArticle = (arg: any): arg is IArticle => {
  return (
    arg != null &&
    typeof arg === "object" &&
    typeof arg.id === "string" &&
    typeof arg.title === "string" &&
    typeof arg.categories === "object" &&
    typeof arg.createdDate === "string" &&
    typeof arg.updatedDate === "string" &&
    typeof arg.content === "string" &&
    typeof arg.imageName === "string" &&
    typeof arg._private === "boolean"
  );
};
/* eslint-enable */

export interface IDraft {
  id: string;
  title: string;
  categories: string;
  updatedDate: string;
  content: string;
  imageName: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
export const implementsIDraft = (arg: any): arg is IDraft => {
  return (
    arg !== null &&
    typeof arg === "object" &&
    typeof arg.id === "string" &&
    typeof arg.title === "string" &&
    typeof arg.categories === "string" &&
    typeof arg.updatedDate === "string" &&
    typeof arg.content === "string" &&
    typeof arg.imageName === "string"
  );
};
/* eslint-enable */

export interface ICategory {
  id: string;
  name: string;
  articleNum: number;
}

export interface IEditorArticle {
  id: string;
  title: string;
  categories: string;
  updatedDate: string;
  content: string;
  imageName: string;
  _private: boolean;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
export const implementsIEditorArticle = (arg: any): arg is IEditorArticle => {
  return (
    arg !== null &&
    typeof arg === "object" &&
    typeof arg.id === "string" &&
    typeof arg.title === "string" &&
    typeof arg.categories === "string" &&
    typeof arg.updatedDate === "string" &&
    typeof arg.content === "string" &&
    typeof arg.imageName === "string" &&
    typeof arg._private === "boolean"
  );
};
/* eslint-enable */

export interface IArticleReq {
  id: string;
  title: string;
  categories: ICategory[];
  content: string;
  imageName: string;
  _private: boolean;
}

export interface IDraftReq {
  id: string;
  title: string;
  categories: string;
  content: string;
  imageName: string;
}
