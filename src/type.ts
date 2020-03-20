export type ArticleType = {
  id: string;
  sortedId: number;
  title: string;
  categories: CategoryType[];
  createDate: string;
  updateDate: string;
  contentHash: string;
  imageHash: string;
  _private: boolean;
} 

export type CategoryType = {
  id: string;
  name: string;
  articleNum: number;
}

export type DraftType = {
  id: string;
  sortedId: number;
  title: string;
  categories: string;
  updateDate: string;
  contentHash: string;
  imageHash: string;
}


// request types
export type ArticleRequestType = {
  id: string;
  title: string;
  categories: CategoryRequestType[];
  contentHash: string;
  imageHash: string;
  _private: boolean;
}

export type CategoryRequestType = {
  id: string;
  name: string;
}

export type DraftRequestType = {
  id: string;
  title: string;
  categories: string;
  contentHash: string;
  imageHash: string;
}