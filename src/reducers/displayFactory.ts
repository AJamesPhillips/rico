import { Action } from "../actions/constants"

interface DisplayState {
  selectedPlayerBoardIndex: number
}

export function displayFactory (numberOfPlayers: number) {
  const initialState: DisplayState = {
    selectedPlayerBoardIndex: 0
  }

  return function display (state: DisplayState = initialState, action: Action): DisplayState {
    if (action.type === "UPDATE_SELECTED_PLAYER_BOARD_INDEX") {
      state = {
        ...state,
        selectedPlayerBoardIndex: action.selectedPlayerBoardIndex
      }
    }
    return state
  }
}
