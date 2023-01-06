import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import Review from './Review';
import Workflow from './workflow';

export const WebReview = reactToWebComponent(
  Review,
  React as any,
  ReactDOM as any,
  {
    shadow: 'open',
  },
);

export const WebWorkflow = reactToWebComponent(
  Workflow,
  React as any,
  ReactDOM as any,
  {
    shadow: 'open',
  },
);

customElements.define('web-review', WebReview as any);
customElements.define('web-workflow', WebWorkflow as any);
