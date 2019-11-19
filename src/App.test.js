import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const modal = document.createElement('div');
  modal.setAttribute("id", "modal");
  document.body.appendChild(modal);

  ReactDOM.render(<App />, div);

});
