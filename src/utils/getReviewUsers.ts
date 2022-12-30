import { Api } from "@jk/api";
import env from "@utils/env";

const API_METHOD = {
  jkopay: "GetJkopayReviewUsers",
  jkos: "GetJkosReviewUsers",
};

const getReviewUsers = (appName) => {
  return new Promise(async (resolve, reject) => {
    const JkEnv = env("JK_ENV");
    const api = API_METHOD[JkEnv];

    try {
      const { success, data } = await Api[api({ name: appName })];
      success ? resolve(data) : reject(data);
    } catch (err) {
      reject(err);
    }
  });
};

export default getReviewUsers;
