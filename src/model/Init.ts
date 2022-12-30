import env from '@utils/env';
import getReviewUsers from '@utils/getReviewUsers';

class Init {
  name = null;

  jkEnv = null;

  params = null;

  constructor(name) {
    this.name = name;
  }

  async get() {
    const projectId = env('REVIEW_PROJECT_ID');
    const workflowId = env('REVIEW_WORKFLOW_ID');
    const secretKey = env('REVIEW_SECRET_KEY');
    const token = env('REVIEW_TOKEN');

    const data = await getReviewUsers(this.name);

    this.params = {
      projectId,
      workflowId,
      secretKey,
      token,
      data,
    };
  }
}

export default Init;
