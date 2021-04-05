export interface IArticle {
  id: string;
  title: string;
  tags: ITag[];
  createdAt: string;
  updatedAt: string;
  content: string;
  imageUrl: string;
  status: number;
}

export interface ITag {
  name: string;
  nArticles: number;
}
