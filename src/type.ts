export type ArticleType = {
  id: string;
  sortedId: number;
  title: string;
  categories: CategoryType[];
  createDate: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  articleNum: number;
};

export type DraftType = {
  id: string;
  sortedId: number;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
};

// request types
export type ArticleRequestType = {
  id: string;
  title: string;
  categories: CategoryRequestType[];
  content: string;
  imageHash: string;
  isPrivate: boolean;
};

export type CategoryRequestType = {
  id: string;
  name: string;
};

export type DraftRequestType = {
  id: string;
  title: string;
  categories: string;
  content: string;
  imageHash: string;
};
