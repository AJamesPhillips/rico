export const initializeJobs = (jobs) => {
  return {
    type: 'INITIALIZE_JOBS',
    jobs
  };
};

export const takeJob = (id) => (dispatch, getState) => {
  const currentPlayerID = getState().turns.find(p => p.currentPlayer).playerID;
  dispatch({
    type: 'TAKE_JOB',
    id,
    takenBy: currentPlayerID
  });
};

export const disincentivizeTakenJob = (id) => {
  return {
    type: 'DISINCENTIVIZE_TAKEN_JOB',
    id
  };
};

export const incentivizeUntakenJobs = () => {
  return {
    type: 'INCENTIVIZE_UNTAKEN_JOBS'
  };
};

export const resetJobs = () => {
  return {
    type: 'RESET_JOBS'
  };
};

export const setActiveJob = (job) => {
  return {
    type: 'SET_ACTIVE_JOB',
    job
  };
};
