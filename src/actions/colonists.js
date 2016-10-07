export const setRemaining = (remaining) => {
  return {
    type: 'SET_REMAINING',
    remaining
  };
};

export const replenishShip = (colonists) => {
  return {
    type: 'REPLENISH_SHIP',
    colonists
  };
};

export const assignColonists = () => (dispatch, getState) => {

};

