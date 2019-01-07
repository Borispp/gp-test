/**
 * Entry point for the UI
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';

import { store } from './store';

/**
 * Inside the Root component we provide the Redux store through Provider to the rest of the app.
 */

// Container name is capitalized because it is a React component
// tslint:disable-next-line variable-name
const Root: React.SFC<{}> = (): JSX.Element => (
  <Provider store={store}>
    <App />
  </Provider>
);

window.addEventListener('DOMContentLoaded', () => {
  const rootEl: HTMLElement | null = document.getElementById('root');

  ReactDOM.render(<Root />, rootEl);
});
