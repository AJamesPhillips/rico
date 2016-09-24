import { jobHasResolved } from '../jobs/services';

export const resolvePurchase = (store, building) => {
  const state = store.getState();
  const currentJobPlayerIndex = state.jobTurns.findIndex(p => p.currentJobPlayer);
  const currentJobPlayerID = state.jobTurns.find(p => p.currentJobPlayer).playerID;
  const currentJobPlayer = state.boards.find(p => p.id === currentJobPlayerID);

  if (building.cost > currentJobPlayer.doubloons) {
    alert("Can not afford that");
    return false;
  }

  if (currentJobPlayer.buildings.find(ownedBuilding => ownedBuilding.name === building.name)) {
    alert("You already own this building");
    return false;
  }

  if (building.supply === 0) {
    alert("No more copies of this building can be purchased.");
    return false;
  }

  store.dispatch({
    type: 'ADD_BUILDING',
    currentJobPlayerID,
    building
  });

  store.dispatch({
    type: 'REDUCE_BUILDING_SUPPLY',
    building
  });

  // check if the buyer has the Builder privilege
  if (state.jobs.find(job => job.title === 'builder' && job.takenBy === currentJobPlayerID)) {
    discount = 1;
  }

  store.dispatch({
    type: 'MODIFY_DOUBLOONS',
    id: currentJobPlayerID,
    doubloons: -building.cost + discount
  });

  store.dispatch({
    type: 'NEXT_JOB_TURN',
    currentJobPlayerIndex
  });

  const updatedState = store.getState();

  if (currentJobPlayerIndex + 1 === state.jobTurns.length) {
    jobHasResolved(store);
  }
  else {
    const newJobPlayer = state.jobTurns.find(p => p.currentJobPlayer);
    const newJobPlayerTabIndex = state.boards.findIndex(p => p.id === newJobPlayer.playerID);
    store.dispatch({
      type: 'UPDATE_ACTIVE_PLAYER_TAB',
      key: newJobPlayerTabIndex
    });
  }
}
