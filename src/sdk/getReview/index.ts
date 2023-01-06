/**
 * @description 拿到待審核列表
 */

import { Api } from '@jk/api';

const getReviewList = (...args) => {
  return new Promise(async (resolve, reject) => {
    console.log('args', args);
    try {
      const response = await Api.getReviewList(...args);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export default getReviewList;
