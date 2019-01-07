import { Action } from "../actions/constants"
import { ROLE_TITLE } from "../../decls/flowTypes"

interface Role {
  id: number
  title: ROLE_TITLE
  doubloons: number
}

export type RolesState = Role[]

function initialRoles (numberOfPlayers: number): RolesState {
  const roleTitles: ROLE_TITLE[] = [
    "Settler",
    "Mayor",
    "Builder",
    "Craftsman",
    "Trader",
    "Captain",
    "Prospector"
  ]

  if (numberOfPlayers !== 2) {
    roleTitles.push("Prospector")
  }

  return roleTitles.map((title, id) => ({ id, title, doubloons: 0 }))
}

export function rolesFactory (numberOfPlayers: number) {
  const initialState = initialRoles(numberOfPlayers)

  return function roles (state: RolesState = initialState, action: Action): RolesState {
    return state
  }
}

/*
export const roles = (state = initialRoles, action) => {
  switch (action.type) {
    case "TAKE_JOB":
      return state.map(job => {
        if (job.id === action.id) {
          return {
            ...job,
            taken: true,
            takenBy: action.takenBy
          }
        }

        return job
      })
    case "DISINCENTIVIZE_TAKEN_JOB":
      return state.map(job => {
        if (job.id === action.id) {
          return {
            ...job,
            incentive: 0
          }
        }
        return job
      })
    case "INCENTIVIZE_UNTAKEN_JOBS":
      return state.map(job => {
        if (job.taken) {
          return job
        }
        return {
          ...job,
          incentive: job.incentive+1
        }
      })
    case "RESET_JOBS":
      return state.map(job => {
        return {
          ...job,
          taken: false,
          takenBy: undefined
        }
      })
    default:
      return state
  }
}

export const activeRole = (state = ", action) => {
  switch (action.type) {
    case "SET_ACTIVE_JOB":
      return action.job
    default:
      return state
  }
}
*/
