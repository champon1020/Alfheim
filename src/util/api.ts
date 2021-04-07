import { Configuration, DefaultApi } from "~/api";
import Config from "~/config";
import Cookie from "js-cookie";

export const apiHandlerWithToken = (accessToken?: string): DefaultApi => {
  let cfg: Configuration;
  if (accessToken != null) {
    cfg = new Configuration({
      basePath: Config.apiOrigin,
      accessToken: accessToken,
    });
  } else {
    cfg = new Configuration({
      basePath: Config.apiOrigin,
      accessToken: Cookie.get("alfheim_id_token"),
    });
  }
  return new DefaultApi(cfg);
};
