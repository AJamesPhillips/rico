/* @flow */

type Action = {
  type: string,
  building?: Building
};

export const reduceBuildingSupply = (building: Building): Action => {
  return {
    type: 'REDUCE_BUILDING_SUPPLY',
    building
  };
};
