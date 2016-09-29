import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import PlayerBoards from './components/board/PlayerBoards';
import Jobs from './components/jobs/Jobs';
import Shop from './components/shop/Shop';
import Flop from './components/settler/Flop';
import { initializeGameState } from './GameManager';

import ricoApp from './reducers/index';

const RicoApp = () => {
  return (
    <div>
      <Jobs />
      <PlayerBoards />
      <Shop />
      <Flop />
    </div>
  );
};

let store = createStore(
  ricoApp,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware
  )
);

initializeGameState(store);

ReactDOM.render(
  <Provider store={store} >
    <RicoApp />
  </Provider>,
  document.getElementById('root')
);
