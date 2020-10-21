export interface IArticle {
  id: string;
  sortedId: number;
  title: string;
  categories: ICategory[];
  createDate: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export const implementsIArticle = (arg: any): arg is IArticle => {
  return (
    arg !== null &&
    typeof arg === "object" &&
    typeof arg.id === "string" &&
    typeof arg.sortedId === "number" &&
    typeof arg.title === "string" &&
    typeof arg.categories === "object" &&
    typeof arg.createDate === "string" &&
    typeof arg.updateDate === "string" &&
    typeof arg.content === "string" &&
    typeof arg.imageHash === "string" &&
    typeof arg.isPrivate === "boolean"
  );
};

export interface IDraft {
  id: string;
  sortedId: number;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
}

export const implementsIDraft = (arg: any): arg is IDraft => {
  return (
    arg !== null &&
    typeof arg === "object" &&
    typeof arg.id === "string" &&
    typeof arg.sortedId === "number" &&
    typeof arg.title === "string" &&
    typeof arg.categories === "string" &&
    typeof arg.updateDate === "string" &&
    typeof arg.content === "string" &&
    typeof arg.imageHash === "string"
  );
};

export interface ICategory {
  id: string;
  name: string;
  articleNum: number;
}

// Type of editor article|draft object.
export interface IEditorArticle {
  id: string;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export const implementsIEditorArticle = (arg: any): arg is IEditorArticle => {
  return (
    arg !== null &&
    typeof arg === "object" &&
    typeof arg.id === "string" &&
    typeof arg.title === "string" &&
    typeof arg.categories === "string" &&
    typeof arg.updateDate === "string" &&
    typeof arg.content === "string" &&
    typeof arg.imageHash === "string" &&
    typeof arg.isPrivate === "boolean"
  );
};

export interface IArticleReq {
  id: string;
  title: string;
  categories: ICategory[];
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export interface IDraftReq {
  id: string;
  title: string;
  categories: string;
  content: string;
  imageHash: string;
}
