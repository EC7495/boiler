import React from 'react';
import store from './redux/store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '../public/index.css';

export const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
