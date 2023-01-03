import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import Review from './Review';

const WebReview = reactToWebComponent(Review, React as any, ReactDOM as any, {
  shadow: 'open',
});

customElements.define('web-Review', WebReview as any);
