/* @flow */

type Action = {
  type: string,
  doubloons?: number,
  name?: string,
  crop?: CropType,
  volume?: number,
  playerID?: number,
  building?: Building,
  index?: number,
  colonists?: number
};

export const modifyDoubloons = (value: number): Action => {
  return {
    type: 'MODIFY_DOUBLOONS',
    doubloons: value
  };
};

export const addPlayer = (name: string, doubloons: number): Action => {
  return {
    type: 'ADD_PLAYER',
    name,
    doubloons
  };
}

export const addCrop = (crop: CropType): Action => {
  return {
    type: 'ADD_CROP',
    crop
  };
};

export const addBarrels = (crop: CropType, volume: number, playerID: number): Action => {
  return {
    type: 'ADD_BARRELS',
    crop,
    volume,
    playerID
  };
};

export const addBuilding = (building: Building): Action => {
  return {
    type: 'ADD_BUILDING',
    building
  };
};

export const updateActivePlayer = (index: number): Action => {
  return {
    type: 'UPDATE_ACTIVE_PLAYER',
    index
  };
};

export const addColonistToCrop = (index: number): Action => {
  return {
    type: 'ADD_COLONIST_TO_CROP',
    index
  };
};

export const removeColonistFromCrop = (index: number): Action => {
  return {
    type: 'REMOVE_COLONIST_FROM_CROP',
    index
  };
};

export const addColonistToBuilding = (index: number): Action => {
  return {
    type: 'ADD_COLONIST_TO_BUILDING',
    index
  };
};

export const removeColonistFromBuilding = (index: number): Action => {
  return {
    type: 'REMOVE_COLONIST_FROM_BUILDING',
    index
  };
};

export const addColonists = (colonists: number, playerID: number): Action => {
  return {
    type: 'ADD_COLONISTS',
    colonists,
    playerID
  };
};
