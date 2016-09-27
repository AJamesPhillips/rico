import { combineReducers } from 'redux';

import { boards } from './boards';
import { jobs, activeJob } from './jobs';
import { turns, jobTurns } from './turns';
import { buildings } from './buildings';
import { crops } from './crops';

const ricoApp = combineReducers({
  boards,
  jobs,
  activeJob,
  buildings,
  turns,
  jobTurns,
  crops
});

export default ricoApp;
