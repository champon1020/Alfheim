export type ArticleType = {
  id: number;
  title: string;
  categories: CategoryType[];
  createDate: string;
  updateDate: string;
  contentHash: string;
  imageHash: string;
  _private: boolean;
} 

export type CategoryType = {
  id: number;
  name: string;
  articleNum: number;
}

export type Draft = {
  id: number;
  title: string;
  categories: string;
  contentHash: string;
  imageHash: string;
  _private?: boolean;
}


// request types
export type ArticleRequestType = {
  id: number;
  title: string;
  categories: CategoryRequestType[];
  contentHash: string;
  imageHash: string;
  _private: boolean;
}

export type CategoryRequestType = {
  id: number;
  name: string;
}

export type DraftRequestType = {
  id: number;
  title: string;
  categories: string;
  contentHash: string;
  imageHash: string;
}