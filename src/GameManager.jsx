import actions from './actions';
//
// TODO: I don't really like the existence of this file.
// Is there a better way to handle one-off state initialization?
// Should initialization be in the reducer files?
// Once more user input is possible (i.e. defining players), maybe
// this gets pulled out into a separate form in the app
export const initializeGameState = (store) => {
  let players = ['kyle', 'hannah', 'rob'];
  const startingDoubloons = 3;
  const turns = players.map((player, index) => {
    store.dispatch(actions.addPlayer(player, startingDoubloons));
  });

  players = store.getState().boards;

  store.dispatch({
    type: 'INITIALIZE_TURNS',
    players
  });

  store.dispatch({
    type: 'UPDATE_ACTIVE_PLAYER',
    index: 0
  });

  const jobs = [{
    title: 'prospector',
    id: 0,
    incentive: 0,
    taken: false
  },
  {
    title: 'prospector',
    id: 1,
    incentive: 0,
    taken: false
  },
  {
    title: 'prospector',
    id: 2,
    incentive: 0,
    taken: false
  },
  {
    title: 'builder',
    id: 3,
    incentive: 0,
    taken: false
  },
  {
    title: 'settler',
    id: 4,
    incentive: 0,
    taken: false
  },
  {
    title: 'mayor',
    id: 5,
    incentive: 0,
    taken: false
  }];

  store.dispatch({
    type: 'INITIALIZE_JOBS',
    jobs
  });

  store.dispatch(actions.setFlopSize(4));
  store.dispatch(actions.fillCropPool());
  store.dispatch(actions.revealNewFlop());
};
