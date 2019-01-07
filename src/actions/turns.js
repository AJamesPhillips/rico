import { updateActivePlayer } from './boards'
import { setActiveJob, incentivizeUntakenJobs, resetJobs } from './roles'
import { discardLeftoverFlop, revealNewFlop } from './crops'
import { replenishShipAfterMayor } from './colonists'

export const initializeTurns = (players) => {
  return {
    type: 'INITIALIZE_TURNS',
    players
  }
}

export const startJobPhase = () => (dispatch, getState) => {
  const playerTurns = getState().turns
  dispatch({
    type: 'START_JOB_PHASE',
    playerTurns
  })
}

export const nextJobTurn = () => {
  return {
    type: 'NEXT_JOB_TURN'
  }
}

export const endJobPhase = () => {
  return {
    type: 'END_JOB_PHASE'
  }
}

export const nextTurn = () => {
  return {
    type: 'NEXT_TURN'
  }
}

export const nextRound = () => {
  return {
    type: 'NEXT_ROUND'
  }
}

export const jobHasResolved = () => (dispatch, getState) => {
  if (getState().activeJob === 'mayor') {
    dispatch(replenishShipAfterMayor())
  }

  dispatch(setActiveJob(''))

  dispatch(endJobPhase())

  dispatch(nextTurn())

  if (getState().turns.findIndex(t => t.currentPlayer) === -1) {
    dispatch(nextRound())

    dispatch(incentivizeUntakenJobs())

    dispatch(resetJobs())
  }

  const currentPlayer = getState().turns.find(t => t.currentPlayer) || {}
  dispatch(updateActivePlayer(currentPlayer.playerID))
}

export const handleEndOfTurn = () => (dispatch, getState) => {
  dispatch(nextJobTurn())

  const currentJobPlayerIndex = getState().jobTurns.findIndex(t => t.currentJobPlayer)
  // there are still turns left in the job phase
  if (currentJobPlayerIndex !== -1) {
    const currentPlayerJobIndex = getState().jobTurns.findIndex(t => t.currentJobPlayer)
    dispatch(updateActivePlayer(getState().jobTurns[currentJobPlayerIndex].playerID))

    return
  }

  if (getState().activeJob === 'settler') {
    dispatch(discardLeftoverFlop())
    dispatch(revealNewFlop())
  }

  dispatch(jobHasResolved())
}

