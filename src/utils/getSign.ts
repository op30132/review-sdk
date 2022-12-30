import env from "@utils/env";
import CryptoJS from "crypto-js";

const getSign = (body) => {
  const secretKey = env("REVIEW_SECRET_KEY");
  const jsonBody = JSON.stringify(body);
  const timestamp = new Date().toLocaleDateString().split("/").join("");

  const finalSignString =
    secretKey.toString() + jsonBody.toString() + timestamp.toString();
  const checkCode = CryptoJS.SHA256(
    encodeURIComponent(finalSignString).toLowerCase(),
  )
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();

  return checkCode;
};

export default getSign;
