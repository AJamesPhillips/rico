import { Action } from "../actions/constants"

export type VictoryPointsState = {
  remaining: number
  noVictoryPointsLeft: boolean
}

const VICTORY_POINTS_BY_PLAYER_NUMBER: {[index: number]: number} = {
  2: 65,
  3: 75,
  4: 100,
  5: 122,
}

export function victoryPointsFactory (numberOfPlayers: number) {
  const initialVictoryPoints = VICTORY_POINTS_BY_PLAYER_NUMBER[numberOfPlayers]
  const initialVictoryPointsState = {
    remaining: initialVictoryPoints,
    noVictoryPointsLeft: false
  }

  return function victoryPoints (state: VictoryPointsState = initialVictoryPointsState, action: Action): VictoryPointsState {
    return state
  }
}
