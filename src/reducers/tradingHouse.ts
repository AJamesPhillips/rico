import { Action } from "../actions/constants"
import { CROP_TYPE } from "../../decls/flowTypes"

export type TradingHouseState = (CROP_TYPE | undefined)[]

export function tradingHouseFactory (numberOfPlayers: number) {
  return function tradingHouse (state: TradingHouseState = [], action: Action): TradingHouseState {
    return state
  }
}
