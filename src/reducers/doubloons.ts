import { Action } from "../actions/constants"

export type DoubloonsState = number

export function doubloonsFactory (numberOfPlayers: number) {
  const initialDoubloons = 60 - (calcInitialDoubloons(numberOfPlayers) * numberOfPlayers)

  return function doubloons (state: DoubloonsState = initialDoubloons, action: Action): DoubloonsState {
    return state
  }
}

export function calcInitialDoubloons (numberOfPlayers: number): number {
  return numberOfPlayers === 2 ? 3 : numberOfPlayers - 1
}
