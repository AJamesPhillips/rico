/* @flow */

type Action = {
  type: string,
  jobs?: Job[],
  id?: number,
  job?: Job
};

export const initializeJobs = (jobs: Job[]): Action => {
  return {
    type: 'INITIALIZE_JOBS',
    jobs
  };
};

export const takeJob = (id: number) => (dispatch: Dispatch, getState: () => State) => {
  const currentPlayer = getState().turns.find(p => p.currentPlayer);
  let currentPlayerID;
  if (currentPlayer) currentPlayerID = currentPlayer.playerID

  dispatch({
    type: 'TAKE_JOB',
    id,
    takenBy: currentPlayerID
  });
};

export const disincentivizeTakenJob = (id: number): Action => {
  return {
    type: 'DISINCENTIVIZE_TAKEN_JOB',
    id
  };
};

export const incentivizeUntakenJobs = (): Action => {
  return {
    type: 'INCENTIVIZE_UNTAKEN_JOBS'
  };
};

export const resetJobs = (): Action => {
  return {
    type: 'RESET_JOBS'
  };
};

export const setActiveJob = (job: Job): Action => {
  return {
    type: 'SET_ACTIVE_JOB',
    job
  };
};
