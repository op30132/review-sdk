/**
 * @description 更改審核單狀態 -> approve
 */

import { Api } from '@jk/api';

/**
 * @description
 * @param {string} appName
 * @param {object} args { status, reason, isNotify, message }
 * @returns
 */
const approveReview = (id, args) => {
  return new Promise(async (resolve, reject) => {
    const { status, reason } = args;
    //const reviewUsers = await getReviewUsers(appName)
    try {
      const { success, data } = await Api.TriggerReview(
        {
          ...args,
          reviewUsers: {
            id: '123',
            status,
            reason,
          },
        },
        { id },
      );
      success ? resolve(data) : reject(data);
    } catch (err) {
      reject(err);
    }
  });
};

export default approveReview;
