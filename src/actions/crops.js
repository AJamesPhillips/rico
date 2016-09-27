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

export const takeFromFlop = (flopIndex) => {
  return {
    type: 'TAKE_FROM_FLOP',
    flopIndex
  };
};

export const discardLeftoverFlop = () => {
  return {
    type: 'DISCARD_LEFTOVER_FLOP'
  };
};

export const shuffleDiscardedIntoPool = () => {
  return {
    type: 'SHUFFLE_DISCARDED_INTO_POOL'
  };
};
