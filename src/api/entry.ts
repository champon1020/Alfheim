import axios from "axios";

import { defaultApi } from "./api";

// defaultApi handles functions to call api.
export const defaultApi = new api.DefaultApi();

export const ax = axios.create({ baseURL: Config.srcHost });
