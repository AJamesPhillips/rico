import { ROLE_TITLE, ROLE_TITLES } from "../../decls/flowTypes"
import { Action } from "../actions/constants"
import { Player } from "./types"

export interface RoundState {
  round: number
  govenorPlayerId: number
  currentRolePlayerId: number
  currentRoleType: ROLE_TITLE | undefined
  currentRoleId: number | undefined
  currentActionPlayerId: number | undefined
  roleIdToPlayerId: {[roleId: number]: number}
}

export function roundFactory (players: Player[]) {
  const firstPlayer = players[0].playerId
  const initialState = {
    round: 1,
    govenorPlayerId: firstPlayer,
    currentRolePlayerId: firstPlayer,
    currentRoleType: undefined,
    currentRoleId: undefined,
    currentActionPlayerId: undefined,
    roleIdToPlayerId: {},
  }

  return function round (state: RoundState = initialState, action: Action): RoundState {
    return state
  }
}

export const roundSelectors = {
  getCurrentActionPlayerId: (state: RoundState) => state.currentActionPlayerId,
  inSettlerPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Settler,
  inMayorPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Mayor,
  inBuilderPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Builder,
  inCraftsmanPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Craftsman,
  inTraderPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Trader,
  inCaptainPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Captain,
  inProspectorPhase: (state: RoundState) => state.currentRoleType === ROLE_TITLES.Prospector,
}
