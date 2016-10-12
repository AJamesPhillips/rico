import _ from 'underscore';
import { addBarrels } from './boards';

export const subtractCropFromSupply = (cropType, volume) => {
  return {
    type: 'SUBTRACT_CROP_FROM_SUPPLY',
    cropType,
    volume
  };
};

export const craftCrop = (board, cropType, productionBuildings) => (dispatch, getState) => {
  const staffedCropTiles = board.crops.filter(c => c.name === cropType && c.colonists[0]);
  const cropColonists = staffedCropTiles.length;

  let buildingColonists = 0;
  const buildings = board.buildings.filter(b => {
    return _.contains(productionBuildings, b.name);
  });
  buildings.forEach(b => {
    buildingColonists += b.colonists.filter(c => c).length;
  });

  let barrelsToProduce = Math.min(buildingColonists, cropColonists);

  const availableBarrels = getState().craftSupply[cropType];
  if (barrelsToProduce > availableBarrels) {
    barrelsToProduce = availableBarrels;
  }

  dispatch(addBarrels(cropType, barrelsToProduce, board.id));
  dispatch(subtractCropFromSupply(cropType, barrelsToProduce));
};

export const craftCorn = (board) => (dispatch, getState) => {
  const staffedCropTiles = board.crops.filter(c => c.name === 'corn' && c.colonists[0]);
  let barrelsToProduce = staffedCropTiles.length;

  const availableBarrels = getState().craftSupply.corn;
  if (barrelsToProduce > availableBarrels) {
    barrelsToProduce = availableBarrels;
  }

  dispatch(addBarrels('corn', barrelsToProduce, board.id));
  dispatch(subtractCropFromSupply('corn', barrelsToProduce));
};

export const resolveCrafting = () => (dispatch, getState) => {
  const boards = getState().boards;

  for (let i = 0; i < boards.length; i++) {
    dispatch(craftCorn(boards[i]));
    dispatch(craftCrop(boards[i], 'indigo', ['Small Indigo Plant', 'Indigo Plant']));
    dispatch(craftCrop(boards[i], 'sugar', ['Small Sugar Mill', 'Sugar Mill']));
    dispatch(craftCrop(boards[i], 'tobacco', ['Tobacco Storage']));
    dispatch(craftCrop(boards[i], 'coffee', ['Coffee Roaster']));
  }
};
