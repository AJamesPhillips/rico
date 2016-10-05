import { updateActivePlayer } from './boards';
import { setActiveJob, incentivizeUntakenJobs, resetJobs } from './jobs';
import { discardLeftoverFlop, revealNewFlop } from './crops';

export const initializeTurns = (players) => {
  return {
    type: 'INITIALIZE_TURNS',
    players
  };
};

export const startJobPhase = () => (dispatch, getState) => {
  const playerTurns = getState().turns;
  return {
    type: 'START_JOB_PHASE',
    playerTurns
  };
};

export const nextJobTurn = () => {
  return {
    type: 'NEXT_JOB_TURN'
  };
};

export const endJobPhase = () => {
  return {
    type: 'END_JOB_PHASE'
  };
};

export const nextTurn = () => {
  return {
    type: 'NEXT_TURN'
  };
};

export const nextRound = () => {
  return {
    type: 'NEXT_ROUND'
  };
};

export const jobHasResolved = () => (dispatch, getState) => {
  dispatch(setActiveJob(''));

  dispatch(endJobPhase());

  dispatch(nextTurn());

  if (getState().turns.findIndex(t => t.currentPlayer) === -1) {
    dispatch(nextRound());

    dispatch(incentivizeUntakenJobs());

    dispatch(resetJobs());
  }
}

export const handleEndOfTurn = () => (dispatch, getState) => {
  dispatch(nextJobTurn());

  const currentJobPlayerIndex = getState().jobTurns.findIndex(t => t.currentJobPlayer);
  if (currentJobPlayerIndex === -1) {
    if (getState().activeJob === 'settler') {
      dispatch(discardLeftoverFlop());
      dispatch(revealNewFlop());
    }

    dispatch(jobHasResolved());

    const currentPlayerID = getState().turns.find(t => t.currentPlayer).playerID;
    dispatch(updateActivePlayer(currentPlayerID));
  } else {
    dispatch(updateActivePlayer(getState().jobTurns[currentJobPlayerIndex].playerID));
  }
}

