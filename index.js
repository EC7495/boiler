import React from 'react';
import { render } from 'react-dom';

export const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

console.log(document);
render(<App />, document.getElementById('app'));
