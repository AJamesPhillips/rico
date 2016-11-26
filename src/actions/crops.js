/* @flow */

type Action = {
  type: string,
  flopSize?: number,
  flopIndex?: number
};

export const fillCropPool = (): Action => {
  return {
    type: 'FILL_POOL'
  };
};

export const revealNewFlop = (): Action => {
  return {
    type: 'REVEAL_NEW_FLOP'
  };
};

export const setFlopSize = (size: number): Action => {
  return {
    type: 'SET_FLOP_SIZE',
    flopSize: size
  };
};

export const takeFromFlop = (flopIndex: number): Action => {
  return {
    type: 'TAKE_FROM_FLOP',
    flopIndex
  };
};

export const discardLeftoverFlop = (): Action => {
  return {
    type: 'DISCARD_LEFTOVER_FLOP'
  };
};

export const shuffleDiscardedIntoPool = (): Action => {
  return {
    type: 'SHUFFLE_DISCARDED_INTO_POOL'
  };
};
