/* @flow */

type State = {
  remaining: number,
  ship: number
};

const initialState: State = {
  remaining: 0,
  ship: 0
};

export const colonists = (state: State = initialState, action: Object): State => {
  switch (action.type) {
    case 'SET_REMAINING':
      return {
        remaining: action.remaining,
        ship: state.ship
      };
    case 'REPLENISH_SHIP':
      return {
        remaining: state.remaining - action.colonists,
        ship: action.colonists
      }
    default:
      return state;
  }
}
