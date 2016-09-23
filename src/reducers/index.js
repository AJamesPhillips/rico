import { combineReducers } from 'redux';

import { boards } from './boards';
import { jobs } from './jobs';
import { turns, jobTurns, activePlayerTab } from './turns';
import { buildings } from './buildings';

const ricoApp = combineReducers({boards, jobs, buildings, turns, jobTurns, activePlayerTab});

export default ricoApp;
