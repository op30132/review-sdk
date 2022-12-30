import { Router } from '@jk/api';

const API_HOST = process.env.API_HOST;
const SUPERADMIN_JKOS_HOST = process.env.SUPERADMIN_JKOS_HOST;
const SUPERADMIN_JKOPAY_HOST = process.env.SUPERADMIN_JKOPAY_HOST;

const Http = () => {
  Router.group(
    () => {
      Router.get('GetReviewList', `${API_HOST}/reviews`);
      Router.get('GetReview', `${API_HOST}/reviews/:id`);
      Router.get(
        'GetJkopayReviewUsers',
        `${SUPERADMIN_JKOPAY_HOST}/api/reviewUser/:name`,
      );
      Router.get(
        'GetJkosReviewUsers',
        `${SUPERADMIN_JKOS_HOST}/api/reviewUser/:name`,
      );
    },
    (urlParams = {}, headers = {}) => ({
      urlParams,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }),
  );
  Router.group(
    () => {
      Router.post('CreateReview', `${API_HOST}/reviews`);
      Router.post('TriggerReview', `${API_HOST}/reviews/:id/status`);
    },
    (body = {}, urlParams = {}) => ({
      body,
      urlParams,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
};

export default Http;
