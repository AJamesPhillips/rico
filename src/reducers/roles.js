
const initialRoles = [{
  title: 'prospector',
  id: 0,
  incentive: 0,
  taken: false
},
{
  title: 'builder',
  id: 1,
  incentive: 0,
  taken: false
},
{
  title: 'settler',
  id: 2,
  incentive: 0,
  taken: false
},
{
  title: 'mayor',
  id: 3,
  incentive: 0,
  taken: false
},
{
  title: 'craftsman',
  id: 4,
  incentive: 0,
  taken: false
}]

export const roles = (state = initialRoles, action) => {
  switch (action.type) {
    case 'TAKE_JOB':
      return state.map(job => {
        if (job.id === action.id) {
          return {
            ...job,
            taken: true,
            takenBy: action.takenBy
          }
        }

        return job
      })
    case 'DISINCENTIVIZE_TAKEN_JOB':
      return state.map(job => {
        if (job.id === action.id) {
          return {
            ...job,
            incentive: 0
          }
        }
        return job
      })
    case 'INCENTIVIZE_UNTAKEN_JOBS':
      return state.map(job => {
        if (job.taken) {
          return job
        }
        return {
          ...job,
          incentive: job.incentive+1
        }
      })
    case 'RESET_JOBS':
      return state.map(job => {
        return {
          ...job,
          taken: false,
          takenBy: undefined
        }
      })
    default:
      return state
  }
}

export const activeRole = (state = '', action) => {
  switch (action.type) {
    case 'SET_ACTIVE_JOB':
      return action.job
    default:
      return state
  }
}
