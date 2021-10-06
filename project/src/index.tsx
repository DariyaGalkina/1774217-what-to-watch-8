import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const filmInfo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App filmInfo={filmInfo} />
  </React.StrictMode>,
  document.getElementById('root'));
