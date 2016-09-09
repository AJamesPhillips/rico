const jobs = (state = [], action) => {
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
    case 'ADD_JOB':
      return [
        ...state,
        {
          title: action.title,
          id: action.id,
          taken: false,
          incentive: 0
        }
      ]
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

export { jobs }
