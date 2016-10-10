export const modifyDoubloons = (value) => {
  return {
    type: 'MODIFY_DOUBLOONS',
    doubloons: value
  };
};

export const addPlayer = (name, doubloons) => {
  return {
    type: 'ADD_PLAYER',
    name,
    doubloons
  };
}

export const addCrop = (crop) => {
  return {
    type: 'ADD_CROP',
    crop
  };
};

export const addBuilding = (building) => {
  return {
    type: 'ADD_BUILDING',
    building
  };
};

export const updateActivePlayer = (index) => {
  return {
    type: 'UPDATE_ACTIVE_PLAYER',
    index
  };
};

export const addColonistToCrop = (index) => {
  return {
    type: 'ADD_COLONIST_TO_CROP',
    index
  };
};

export const removeColonistFromCrop = (index) => {
  return {
    type: 'REMOVE_COLONIST_FROM_CROP',
    index
  };
};

export const addColonists = (colonists, playerID) => {
  return {
    type: 'ADD_COLONISTS',
    colonists,
    playerID
  };
};
