export const modifyDoubloons = (value, playerID) => {
  return {
    type: 'MODIFY_DOUBLOONS',
    id: playerID,
    doubloons: value
  }
}

export const addPlayer = (name, doubloons) => {
  return {
    type: 'ADD_PLAYER',
    name,
    doubloons
  };
}

export const fillCropPool = () => {
  return {
    type: 'FILL_POOL'
  };
};

export const revealNewFlop = () => {
  return {
    type: 'REVEAL_NEW_FLOP'
  };
};

export const setFlopSize = (size) => {
  return {
    type: 'SET_FLOP_SIZE',
    flopSize: size
  };
};
