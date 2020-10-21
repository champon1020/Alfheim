import { Config } from "~/config";
import axios from "axios";

import { DefaultApi } from "./api";

// defaultApi handles functions to call api.
export const defaultApi = new DefaultApi();

export const ax = axios.create({ baseURL: Config.fileUrl });
