import actions from './actions';
//
// TODO: I don't really like the existence of this file.
// Is there a better way to handle one-off state initialization?
// Should initialization be in the reducer files?
// Once more user input is possible (i.e. defining players), maybe
// this gets pulled out into a separate form in the app
export const initializeGameState = (store: any) => {
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

  store.dispatch(actions.setFlopSize(4));
  store.dispatch(actions.fillCropPool());
  store.dispatch(actions.revealNewFlop());

  store.dispatch(actions.setRemaining(55));
  store.dispatch(actions.replenishShip(3));
};
