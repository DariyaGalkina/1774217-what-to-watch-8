import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { fetchFilmsAction } from './store/api-actions';
import { reducer } from './store/reducer';
import { createAPI } from './services/api';
import { AuthorizationStatus } from './const';
import type { ThunkAppDispatch } from './types/action';

const api = createAPI(() => AuthorizationStatus.Auth);

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
));

(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
