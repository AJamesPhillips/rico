import { Action } from "../actions/constants"
import { CROP_TYPE, CROP_TYPES } from "../../decls/flowTypes"

export type GoodsState = {
  [crop in CROP_TYPE]: number
}

export function goodsFactory (numberOfPlayers: number) {
  const twoPlayerModifier = numberOfPlayers === 2 ? 2 : 0

  const initialState: GoodsState = {
    [CROP_TYPES.COFFEE]: 9 - twoPlayerModifier,
    [CROP_TYPES.TOBACCO]: 9 - twoPlayerModifier,
    [CROP_TYPES.CORN]: 10 - twoPlayerModifier,
    [CROP_TYPES.SUGAR]: 11 - twoPlayerModifier,
    [CROP_TYPES.INDIGO]: 11 - twoPlayerModifier,
  }

  return function goods (state: GoodsState = initialState, action: Action): GoodsState {
    return state
  }
}
