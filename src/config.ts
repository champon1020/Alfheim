// Configuration type.
type ConfigType = {
  clientId: string;
  host: string;
  apiHost: string;
  srcHost: string;
  defImage: string;
  maxArticleNum: number;
  maxSettingArticleNum: number;
  maxSettingImageNum: number;
};

// getConfig returns the configuration object.
const getConfig = (): ConfigType => {
  // Return as the test mode.
  if (process.env.REACT_APP_TRAVIS === "true") {
    const conf = require("./private/config_test.json");
    return config.test;
  }

  const conf = require("./private/config.json");

  // Return as the dev mode.
  if (process.env.REACT_APP_ALFHEIM_MODE === "dev") {
    return config.dev;
  }

  return config.deploy;
};

export const Config = getConfig();
