/* @flow */

import { addColonists } from './boards';

type Action = {
  type: string,
  remaining?: number,
  colonists?: number
};

export const setRemaining = (remaining: number): Action => {
  return {
    type: 'SET_REMAINING',
    remaining
  };
};

export const replenishShip = (colonists: number): Action => {
  return {
    type: 'REPLENISH_SHIP',
    colonists
  };
};

export const assignColonists = () => (dispatch: Dispatch, getState: () => State) => {
  const boards = getState().boards;
  const colonistsOnShip = getState().colonists.ship;

  for (var i = 0; i < colonistsOnShip; i++) {
    dispatch(addColonists(1, boards[i % boards.length].id));
  }
};

export const replenishShipAfterMayor = () => (dispatch: Dispatch, getState: () => State) => {
  const boards = getState().boards;
  let emptyColonistSpaces = 0;

  for (var i = 0; i < boards.length; i++) {
    for (var j = 0; j < boards[i].buildings.length; j++) {
      let buildingColonists = boards[i].buildings[j].colonists;
      emptyColonistSpaces += buildingColonists.filter(c => !c).length;
    }
  }

  if (emptyColonistSpaces < boards.length) {
    emptyColonistSpaces = boards.length;
  }

  dispatch(replenishShip(emptyColonistSpaces));
};

