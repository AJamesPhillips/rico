import { Action } from "../actions/constants"

export type ColonistsState = {
  remaining: number
  ship: number
  shipIncompletelyFilled: boolean
}

const COLONISTS_BY_PLAYER_NUMBER: {[index: number]: number} = {
  2: 40,
  3: 55,
  4: 75,
  5: 95,
}

export function colonistsFactory (numberOfPlayers: number) {
  const initialColonists = COLONISTS_BY_PLAYER_NUMBER[numberOfPlayers]
  const initialState = {
    remaining: initialColonists,
    ship: numberOfPlayers,
    shipIncompletelyFilled: false,
  }

  return function colonists (state: ColonistsState = initialState, action: Action): ColonistsState {
    return state
  }
}


// export const colonists = (state: State = initialState, action: Object): State => {
//   switch (action.type) {
//     case 'SET_REMAINING':
//       return {
//         remaining: action.remaining,
//         ship: state.ship
//       };
//     case 'REPLENISH_SHIP':
//       return {
//         remaining: state.remaining - action.colonists,
//         ship: action.colonists
//       }
//     default:
//       return state;
//   }
// }
