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

export const addCrop = (crop) => {
  return {
    type: 'ADD_CROP',
    crop
  };
};

export const updateActivePlayer = (index) => {
  return {
    type: 'UPDATE_ACTIVE_PLAYER',
    index
  };
};
