
export type Action = TODO
| SelectedPlayerBoardIndexAction

export interface TODO {
  type: "REDUCE_BUILDING_SUPPLY"
  building: { name: string }
}

export interface SelectedPlayerBoardIndexAction {
  type: "UPDATE_SELECTED_PLAYER_BOARD_INDEX"
  selectedPlayerBoardIndex: number
}
