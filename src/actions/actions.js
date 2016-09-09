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
