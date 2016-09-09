import * as actions from 'actions/actions.js';

var players = ['kyle', 'hannah', 'rob'];

const initializeGameState = (store) => {
  const turns = players.map((player, index) => {
    store.dispatch(actions.addPlayer(player, 3));

    return {
      playerID: index,
      currentPlayer: index === 0
    };
  });

  store.dispatch({
    type: 'INITIALIZE_TURNS',
    turns
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
  }];

  store.dispatch({
    type: 'INITIALIZE_JOBS',
    jobs
  });
};



export { initializeGameState }
