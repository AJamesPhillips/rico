import { combineReducers } from 'redux';

import { boards } from './boards';
import { jobs } from './jobs';
import { turns, jobTurns, activePlayerTab } from './turns';
import { buildings } from './buildings';
import { crops } from './crops';

const ricoApp = combineReducers({
  boards,
  jobs,
  buildings,
  turns,
  jobTurns,
  activePlayerTab,
  crops
});

export default ricoApp;
