import * as functions from "firebase-functions";

import shareImpl from "./share";

export const share = functions.https.onRequest(shareImpl);
