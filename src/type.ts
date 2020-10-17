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

export interface CategoryIface {
  id: string;
  name: string;
}

export interface DraftIface {
  id: string;
  sortedId: number;
  title: string;
  categories: string;
  updateDate: string;
  content: string;
  imageHash: string;
}

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
