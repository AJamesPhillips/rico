const initialState = {
  remaining: 0,
  ship: 0
};

export const colonists = (state = initialState, action) => {
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
