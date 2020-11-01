import axios from "axios";
import * as functions from "firebase-functions";

const HOST = "https://blog.champonian.com";

const shareFunc = async (
  req: functions.https.Request,
  res: functions.Response
) => {
  const path = req.path as string;
  const id = path.split("/").reverse()[0];

  const _url = joinPaths(HOST, "api/find/article/id");
  const url = joinParams(_url, { key: "id", value: id });
  axios
    .get(url)
    .then((r) => {
      const article = r.data.article;
      const html = generateHtml(id, article);
      res.set("Cache-Control", "public, max-age=600, s-maxage=600");
      res.status(200).end(html);
    })
    .catch((err) => {
      res.status(500).end("Internal Server Error: ${err.message}, URL: ${url}");
    });
};

export default shareFunc;

const generateHtml = (id: string, article: any) => {
  const TITLE = article.title;
  const IMAGE_URL = joinPaths(HOST, "resrc/images", article.imageName);
  const URL = joinPaths(HOST, "article", id);
  const DESCRIPTION = article.content;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>champon's notebook</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${IMAGE_URL}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${URL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="champon's notebook">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${IMAGE_URL}">
    <meta name="twitter:description" content="${DESCRIPTION}">
    <meta name="twitter:site" content="${URL}">
    <meta name="twitter:card" content="summary_large_image">
  </head>
  <body>
    <script type="text/javascript">window.location="${URL}";</script>
  </body>
</html>`;
};

const joinPaths = (...args: string[]): string => {
  let path = "";
  args.forEach((a, i) => {
    if (i) path += "/";
    path += a;
  });
  return path;
};

const joinParams = (
  path: string,
  ...args: { key: string; value: string }[]
): string => {
  path += "?";
  args.forEach((a, i) => {
    if (i) path += "&";
    path += a.key + "=" + a.value;
  });
  return path;
};
