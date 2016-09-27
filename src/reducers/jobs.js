export const jobs = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_JOBS':
      return action.jobs;
    case 'TAKE_JOB':
      return state.map(job => {
        if (job.id === action.id) {
          return {
            ...job,
            taken: true,
            takenBy: action.takenBy
          };
        }

        return job;
      });
    case 'DISINCENTIVIZE_TAKEN_JOB':
      return state.map(job => {
        if (job.id === action.id) {
          return {
            ...job,
            incentive: 0
          };
        }
        return job;
      })
    case 'INCENTIVIZE_UNTAKEN_JOBS':
      return state.map(job => {
        if (job.taken) {
          return job;
        }
        return {
          ...job,
          incentive: job.incentive+1
        };
      })
    case 'RESET_JOBS':
      return state.map(job => {
        return {
          ...job,
          taken: false
        };
      })
    default:
      return state;
  }
}

export const activeJob = (state = '', action) => {
  switch (action.type) {
    case 'SET_ACTIVE_JOB':
      return action.job;
    default:
      return state;
  }
}
