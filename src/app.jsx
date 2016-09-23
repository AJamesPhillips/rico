import { createStore, combineReducers } from 'redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import PlayerBoards from './components/board/boards';
import { Jobs } from './jobs'
import { Shop } from './Shop';
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

let store = createStore(ricoApp);

initializeGameState(store);

ReactDOM.render(
  <Provider store={store} >
    <RicoApp />
  </Provider>,
  document.getElementById('root')
);
