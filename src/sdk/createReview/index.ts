/**
 * @description 建立審核單
 */

import { Api } from '@jk/api';
import getHeaders from '@utils/getHeaders';

/**
 * @description
 * @param {string} appName
 * @param {object} args { projectId, workflowId, title, content, creator, message, isNotify }
 * @returns
 */
const createReview = (appName, args) => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   const { projectId, workflowId, data: reviewUsersData } = init.params;
    //   const body = {
    //     ...args,
    //     projectId,
    //     workflowId,
    //     reviewUsers: reviewUsersData,
    //   };

    //   const { success, data } = await Api.CreateReview(body, getHeaders(body));
    //   success ? resolve(data) : reject(data);
    // } catch (err) {
    reject();
    // }
  });
};

export default createReview;
