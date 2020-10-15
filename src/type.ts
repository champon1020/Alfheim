export interface ArticleType {
  id: string;
  sortedId: number;
  title: string;
  categories: CategoryType[];
  createDate: string;
  updateDate: string;
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export interface CategoryType {
  id: string;
  name: string;
  articleNum: number;
}

export interface DraftType {
  id: string;
  sortedId: number;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
}

export interface ArticleRequestType {
  id: string;
  title: string;
  categories: CategoryRequestType[];
  content: string;
  imageHash: string;
  isPrivate: boolean;
}

export interface CategoryRequestType {
  id: string;
  name: string;
}

export interface DraftRequestType {
  id: string;
  title: string;
  categories: string;
  content: string;
  imageHash: string;
}
