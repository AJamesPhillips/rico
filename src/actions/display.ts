import { SelectedPlayerBoardIndexAction } from "./constants"

export function updateSelectedPlayerBoardIndex (selectedPlayerBoardIndex: number): SelectedPlayerBoardIndexAction {
  return {
    type: "UPDATE_SELECTED_PLAYER_BOARD_INDEX",
    selectedPlayerBoardIndex
  }
}
