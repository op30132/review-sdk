import CryptoJS from 'crypto-js';

const getSign = (body: any, secretKey: string) => {
  const jsonBody = JSON.stringify(body);
  const timestamp = new Date()
    .toISOString()
    .substring(0, 10)
    .split('-')
    .join('');

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
