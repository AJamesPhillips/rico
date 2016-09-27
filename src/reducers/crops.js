import _ from 'underscore';

let initialState = {
  pool: [],
  flop: [],
  discarded: []
};

export const crops = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FLOP_SIZE':
      return {
        ...state,
        flopSize: action.flopSize
      };
    case 'FILL_POOL':
      return {
        ...state,
        pool: fillCropPool()
      };
    case 'REVEAL_NEW_FLOP':
      return {
        ...state,
        pool: state.pool.slice(state.flopSize),
        flop: state.pool.slice(0, state.flopSize)
      };
    case 'TAKE_FROM_FLOP':
      return {
        ...state,
        flop: [
          ...state.flop.slice(0, action.flopIndex),
          ...state.flop.slice(action.flopIndex+1)
        ]
      };
    case 'DISCARD_LEFTOVER_FLOP':
      return {
        ...state,
        flop: [],
        discarded: [
          ...state.discarded,
          ...state.flop
        ]
      };
    case 'SHUFFLE_DISCARDED_INTO_POOL':
      const newPool = [
        ...state.pool,
        ...state.discarded
      ];

      return {
        ...state,
        pool: _.shuffle(newPool),
        discarded: []
      };
    default:
      return state;
  }
};

const fillCropPool = () => {
  let crops = [];

  for (var i = 0; i < 8; i++) {
    crops.push('coffee');
  }

  for (var i = 0; i < 9; i++) {
    crops.push('tobacco');
  }

  for (var i = 0; i < 10; i++) {
    crops.push('corn');
  }

  for (var i = 0; i < 11; i++) {
    crops.push('sugar');
  }

  for (var i = 0; i < 12; i++) {
    crops.push('indigo');
  }

  return _.shuffle(crops);
}
