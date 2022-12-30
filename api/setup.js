import { setupJkApi } from '@jk/api';
import http from './router/http';
import protocol from './protocol';
import mock from './mock';

const setup = () => {
  setupJkApi({
    protocol,
    engine: {
      http,
    },
    // mock,
  });
};

export default setup;
