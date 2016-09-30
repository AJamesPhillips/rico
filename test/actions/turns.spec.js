import expect from 'expect';
import actions from '../../src/actions';

describe('turns actions', function() {
  it('INITIALIZE_TURNS', function() {
    const expectedAction = {
      type: 'INITIALIZE_TURNS',
      players: []
    };

    expect(actions.initializeTurns([])).toEqual(expectedAction);
  });

  it('START_JOB_PHASE', function() {
    const expectedAction = {
      type: 'START_JOB_PHASE',
      playerTurns: []
    };

    expect(actions.startJobPhase([])).toEqual(expectedAction);
  });

  it('NEXT_JOB_TURN', function() {
    const expectedAction = {
      type: 'NEXT_JOB_TURN'
    };

    expect(actions.nextJobTurn()).toEqual(expectedAction);
  });

  it('END_JOB_PHASE', function() {
    const expectedAction = {
      type: 'END_JOB_PHASE'
    };

    expect(actions.endJobPhase()).toEqual(expectedAction);
  });

  it('NEXT_TURN', function() {
    const expectedAction = {
      type: 'NEXT_TURN'
    };

    expect(actions.nextTurn()).toEqual(expectedAction);
  });

  it('NEXT_ROUND', function() {
    const expectedAction = {
      type: 'NEXT_ROUND'
    };

    expect(actions.nextRound()).toEqual(expectedAction);
  });

  it('jobHasResolved', function() {
    const dispatch = expect.createSpy();
    const turns = [{}, {}];
    const getState = () => ({turns});

    actions.jobHasResolved()(dispatch, getState);

    expect(dispatch.calls.length).toEqual(6);
  });

  it('handleEndOfTurn if not the end of the round', function() {
    const dispatch = expect.createSpy();
    const jobTurns = [{currentJobPlayer: true, playerID: 2}, {}];
    const getState = () => ({jobTurns});

    actions.handleEndOfTurn()(dispatch, getState);

    expect(dispatch.calls.length).toEqual(2);
  });

  it('handleEndOfTurn at the end of the round', function() {
    const dispatch = expect.createSpy();
    const jobTurns = [{}, {}];
    const turns = [{currentPlayer: true}, {}];
    const activeJob = 'settler';
    const getState = () => ({jobTurns, turns, activeJob});

    actions.handleEndOfTurn()(dispatch, getState);

    expect(dispatch.calls.length).toEqual(5);
  });
});
