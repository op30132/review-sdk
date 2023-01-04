import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import Review from './Review';
import './tailwind.css';

const template = document.createElement('template');
template.innerHTML = `
<style>
button {
  background: #1E88E5;
  color: white;
  padding: 2rem 4rem;
  border: 0;
  font-size: 1.5rem;
}
</style>
<button>Sup?</button>`;

class WhatsUp extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    alert('Sup?');
  }
}

export const WebReview = reactToWebComponent(
  Review,
  React as any,
  ReactDOM as any,
  {
    shadow: 'open',
  },
);

customElements.define('web-review', WebReview as any);
