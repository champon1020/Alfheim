// Configuration type.
type ConfigType = {
  clientId: string;
  url: string;
  apiUrl: string;
  fileUrl: string;
  ogpUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  defImg: string;
  maxArticleNum: number;
  maxSettingArticleNum: number;
  maxSettingImageNum: number;
};

// getConfig returns the configuration object.
const getConfig = (): ConfigType => {
  // Return test mode configuration.
  if (process.env.REACT_APP_TRAVIS === "true") {
    return require("./private/config.test.json"); // eslint-disable-line @typescript-eslint/no-unsafe-return
  }

  // Return dev mode configuration.
  if (process.env.REACT_APP_ALFHEIM_MODE === "dev") {
    return require("./private/config.dev.json"); // eslint-disable-line @typescript-eslint/no-unsafe-return
  }

  return require("./private/config.prod.json"); // eslint-disable-line @typescript-eslint/no-unsafe-return
};

export const Config = getConfig();
