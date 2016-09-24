import { createStore, combineReducers } from 'redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import PlayerBoards from './components/board/PlayerBoards';
import Jobs from './components/jobs/Jobs';
import Shop from './components/shop/Shop';
import { initializeGameState } from './GameManager';

import ricoApp from './reducers/index';

const RicoApp = () => {
  return (
    <div>
      <Jobs />
      <PlayerBoards />
      <Shop />
    </div>
  );
};

let store = createStore(ricoApp, window.devToolsExtension && window.devToolsExtension());

initializeGameState(store);

ReactDOM.render(
  <Provider store={store} >
    <RicoApp />
  </Provider>,
  document.getElementById('root')
);
