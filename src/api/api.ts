import ax from "axios";

export type ArticleType = {
  id: number;
  title: string;
  categories: string[];
  createDate: Date;
  updateDate: Date;
  contentUrl: string;
  imageUrl: string;
  private: boolean;
} 

export type CategoryType = {
  id: number;
  name: string;
  articleNum: number;
}

type ResponseType = {
  articles: ArticleType[];
}

type RequestType = {
  article: ArticleType;
}

const defaultRequest: RequestType = {
  article: {
    id: -1,
    title: "",
    categories: [],
    createDate: new Date(),
    updateDate: new Date(),
    contentUrl: "",
    imageUrl: "",
    private: false
  }
};

const defaultQueryParam = {
  id: -1,
  title: "",
  createDate: new Date(),
  updateDate: new Date(),
  contentUrl: "",
  imageUrl: "",
  private: false,
  categories: ""
};

const BASE_URL = "http://localhost:3000/";
const axios = ax.create({
  
});

export const GetArticles = (
  resolveRespose: (res: ResponseType) => void
) => {
  const url = BASE_URL + "find/article/list";
  axios.get(url, {
    params: defaultQueryParam
  }).then(res => {
    const data: ResponseType = res.data;
    resolveRespose(data);
  });
};

export const RegisterArticle = (
  req: RequestType,
  resolveRespose: (res: ResponseType) => void
) => {
  const url = BASE_URL + "register/article";
  axios.post(url, req, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    const data: ResponseType = res.data;
    resolveRespose(data);
  });
};

export const UpdateArticle = (
  req: RequestType,
  resolveRespose: (res: ResponseType) => void
) => {
  const url = BASE_URL + "update/article";
  axios.put(url, req, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    const data: ResponseType = res.data;
    resolveRespose(data);
  });
};