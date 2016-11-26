/* @flow */

type State = {
  corn: number,
  indigo: number,
  sugar: number,
  tobacco: number,
  coffee: number
};

const initialState = {
  corn: 10,
  indigo: 10,
  sugar: 10,
  tobacco: 10,
  coffee: 10
};

export const craftSupply = (state: State = initialState, action: Object ): State => {
  switch (action.type) {
    case 'SUBTRACT_CROP_FROM_SUPPLY':
      return {
        ...state,
        [action.cropType]: state[action.cropType] - action.volume
      };
    default:
      return state;
  };
};
