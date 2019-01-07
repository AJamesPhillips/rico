import { Action } from "../actions/constants"
import { CROP_TYPE } from "../../decls/flowTypes"

interface CargoShip {
  capacity: number
  cropType: CROP_TYPE | undefined
  currentLoad: number
}

export type CargoShipsState = CargoShip[]

const CARGO_SHIPS_BY_PLAYER_NUMBER: {[index: number]: number[]} = {
  2: [4, 6],
  3: [4, 5, 6],
  4: [5, 6, 7],
  5: [6, 7, 8],
}

export function cargoShipsFactory (numberOfPlayers: number) {
  const initialCargoShips = CARGO_SHIPS_BY_PLAYER_NUMBER[numberOfPlayers]
  const initialState: CargoShipsState = initialCargoShips.map(capacity => ({
    capacity,
    cropType: undefined,
    currentLoad: 0
  }))

  return function cargoShips (state: CargoShipsState = initialState, action: Action): CargoShipsState {
    return state
  }
}
