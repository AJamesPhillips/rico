export const addCrops = (crop, volume, playerID) => {
  return {
    type: 'CRAFT_CROP',
    crop,
    volume,
    playerID
  };
};

export const craftCrop = (board, cropType, productionBuildings) => (dispatch, getState) => {
  const staffedCropTiles = board.crops.find(c => c.name === cropType && c.colonists[0]);
  const cropColonists = staffedCropTiles.length;

  let buildingColonists = 0;
  const buildings = board.buildings.find(b => {
    return productionBuildings.includes(b.name);
  });
  buildings.forEach(b => {
    buildingColonists += buildings[i].colonists.find(c => c).length;
  });

  const barrelsToProduce = Math.min(buildingColonists, cropColonists);

  const availableBarrels = getState().craftSupply[cropType];
  if (barrelsToProduce > availableBarrels) {
    barrelsToProduce = availableBarrels;
  }

  dispatch(addBarrels(cropType, barrelsToProduce, board.id));
  dispatch(subtractCropFromSupply(cropType, barrelsToProduce));
};

export const craftCorn = (board) => (dispatch, getState) => {
  const staffedCropTiles = board.crops.find(c => 'corn' === cropType && c.colonists[0]);
  let barrelsToProduce = staffedCropTiles.length;

  const availableBarrels = getState().craftSupply[cropType];
  if (barrelsToProduce > availableBarrels) {
    barrelsToProduce = availableBarrels;
  }

  dispatch(addBarrels(cropType, barrelsToProduce, board.id));
  dispatch(subtractCropFromSupply(cropType, barrelsToProduce));
};

export const resolveCrafting = () => (dispatch, getState) => {
  const boards = getState().boards;

  for (let i = 0; i < boards.length; i++) {
    dispatch(craftCorn(boards[i]));
    dispatch(craftCrop(boards[i], 'indigo', ['Small Indigo Plant', 'Large Indigo Plant']));
  }
};
