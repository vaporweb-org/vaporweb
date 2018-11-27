import React from 'react';
import ReactDOM from 'react-dom';

import MyComponent from './index';

describe('<MyComponent />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MyComponent />, div);
  });
});
