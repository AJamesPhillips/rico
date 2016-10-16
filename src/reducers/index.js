import { combineReducers } from 'redux';

import { boards } from './boards';
import { jobs, activeJob } from './jobs';
import { turns, jobTurns } from './turns';
import { buildings } from './buildings';
import { crops } from './crops';
import { colonists } from './colonists';
import { craftSupply } from './craftSupply';

const ricoApp = combineReducers({
  boards,
  jobs,
  activeJob,
  buildings,
  turns,
  jobTurns,
  crops,
  colonists,
  craftSupply
});

export default ricoApp;
