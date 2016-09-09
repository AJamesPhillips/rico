import { createStore, combineReducers } from 'redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { PlayerBoards } from './playerBoard';
import { Jobs } from './jobs'
import { Shop } from './Shop';
import { initializeGameState } from './GameManager';

import { boards } from './reducers/boards';
import { jobs } from './reducers/jobs';
import { buildings } from './reducers/buildings';
import { turns, jobTurns, activePlayerTab } from './reducers/turns';

const ricoApp = combineReducers({boards, jobs, buildings, turns, jobTurns, activePlayerTab});

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
