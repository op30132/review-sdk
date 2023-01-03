import getSign from '@utils/getSign';
import env from '@utils/env';

const getHeaders = (body) => {
  const token = env('REVIEW_TOKEN');
  const checkCode = getSign(body);

  return {
    token,
    checkCode,
  };
};

export default getHeaders;
