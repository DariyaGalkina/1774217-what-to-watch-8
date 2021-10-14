import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { films } from './mocks/films';
// import { reviews } from './mocks/reviews';

// const filmInfo = {
//   name: 'The Grand Budapest Hotel',
//   genre: 'Drama',
//   release: 2014,
// };

ReactDOM.render(
  <React.StrictMode>
    <App
      films={films}
      // reviews={reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
