import axios from "axios";
import * as functions from "firebase-functions";

const HOST = "https://blog.champonian.com";

const shareFunc = async (
  req: functions.https.Request,
  res: functions.Response
) => {
  try {
    const [, , id] = req.path.split("/");
    const html = generateHtml(id);
    res.status(200).end(html);
  } catch (err: any) {
    res.status(500).end("Internal Server Error: ${err.message}");
  }
};

interface IArticle {
  id: string;
  title: string;
  categories?: any;
  content: string;
  imageName: string;
  _private: boolean;
}

const generateHtml = async (id: string) => {
  const article = fetchArticle(id);
  const TITLE = article.title;
  const IMAGE_URL = `${HOST}/resrc/${article.imageName}`;
  const URL = `${HOST}/article/${id}`;
  const DESCRIPTION = article.content;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${IMAGE_URL}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${URL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="champon's notebook">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${IMAGE_URL}">
    <meta name="twitter:description" content="${DESCRIPTION}">
    <meta name="twitter:site" content="${URL}>
    <meta name="twitter:card" content="summary">
  </head>
  <body>
    <script type="text/javascript">window.location="/article/${id}";</script>
  </body>
</html>
  `;
};

const fetchArticle = (id: string) => {
  const url = `https://blog.champonian.com/api/find/article/${id}`;
  let article: any = {};

  axios
    .get(url)
    .then((res) => {
      article = res.data.article;
    })
    .catch((err) => {
      throw new Error("Cannot fetch article: ${err.message}");
    });

  return article;
};

export default shareFunc;
