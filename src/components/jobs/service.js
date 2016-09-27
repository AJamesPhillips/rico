// The existence of this file is probably a bad sign.
// I can't tell if Puerto Rico just has complicated state mutations
// compared to the standard web UI, or if I need to be breaking these
// steps down more and integrating them into my container components.
// Also having to pass in the store seems bad. Maybe ironically makes
// testing easier.

// anyway, this file has logic related to the jobs components
import actions from '../../actions';

export const initiateJob = (job, store) => {
  if (job.taken) {
    return;
  }

  let currentPlayerID = store.getState().turns.find(player => player.currentPlayer).playerID;

  store.dispatch({
    type: 'TAKE_JOB',
    id: job.id,
    takenBy: currentPlayerID
  });

  store.dispatch({
    type: 'START_JOB_PHASE',
    playerTurns: store.getState().turns,
  });

  if (job.incentive > 0) {
    resolveTakenIncentive(store, job, currentPlayerID);
  }

  store.dispatch({
    type: 'PLAYER_JOB_PICKED',
    playerID: currentPlayerID,
    jobID: job.id
  });

  if (job.title === 'prospector') {
    resolveProspector(store, currentPlayerID);

    jobHasResolved(store);
  }
};

export const resolveProspector = (store, playerID) => {
  store.dispatch({
    type: 'MODIFY_DOUBLOONS',
    id: playerID,
    doubloons: 1
  });
};

export const resolveTakenIncentive = (store, job, playerID) => {
  store.dispatch(actions.modifyDoubloons(job.incentive, playerID));

  store.dispatch({
    type: 'DISINCENTIVIZE_TAKEN_JOB',
    id: job.id
  });
}

export const jobHasResolved = (store) => {
  let currentPlayerTurnIndex = store.getState().turns.findIndex(player => player.currentPlayer);

  store.dispatch({
    type: 'END_JOB_PHASE'
  });

  store.dispatch({
    type: 'NEXT_TURN',
    currentPlayerIndex: currentPlayerTurnIndex
  });

  // the next player doesn't exist in the array which means we're done with this round
  if (currentPlayerTurnIndex + 1 === store.getState().turns.length) {
    startNextRound(store);
  }

  updateActivePlayer(store);
};

export const updateActivePlayer = (store) => {
  const currentPlayerID = store.getState().turns.find(p => p.currentPlayer).playerID;
  const index = store.getState().boards.findIndex(p => p.id === currentPlayerID );

  store.dispatch({
    type: 'UPDATE_ACTIVE_PLAYER',
    index
  });
};

export const startNextRound = (store) => {
  store.dispatch({
    type: 'NEXT_ROUND'
  });

  store.dispatch({
    type: 'INCENTIVIZE_UNTAKEN_JOBS'
  });

  store.dispatch({
    type: 'RESET_JOBS'
  });
}
