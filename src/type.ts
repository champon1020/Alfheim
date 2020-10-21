export interface ArticleIface {
  id: string;
  sortedId: number;
  title: string;
  categories: CategoryIface[];
  createDate: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export const implementsIArticle = (arg: any): arg is ArticleIface => {
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

export interface DraftIface {
  id: string;
  sortedId: number;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
}

export const implementsIDraft = (arg: any): arg is DraftIface => {
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

export interface CategoryIface {
  id: string;
  name: string;
  articleNum: number;
}

// Type of editor article|draft object.
export interface EditorArticle {
  id: string;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export const implementsIEditorArticle = (arg: any): arg is EditorArticle => {
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

export interface ArticleReq {
  id: string;
  title: string;
  categories: CategoryIface[];
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export interface DraftReq {
  id: string;
  title: string;
  categories: string;
  content: string;
  imageHash: string;
}
