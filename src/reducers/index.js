import { combineReducers } from 'redux'

import { boards } from './boards'
import { roles, activeRole } from './roles'
import { turns, jobTurns } from './turns'
import { buildings } from './buildings'
import { crops } from './crops'
import { colonists } from './colonists'
import { craftSupply } from './craftSupply'

const ricoApp = combineReducers({
  boards,
  jobs: roles,
  activeJob: activeRole,
  buildings,
  turns,
  jobTurns,
  crops,
  colonists,
  craftSupply
})

export default ricoApp
