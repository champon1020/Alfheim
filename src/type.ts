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

export interface IDraft {
  id: string;
  title: string;
  categories: string;
  updatedDate: string;
  content: string;
  imageName: string;
}

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
  updatedDate: string;
  content: string;
  imageName: string;
  _private: boolean;
}

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
