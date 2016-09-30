import expect from 'expect';
import actions from '../../src/actions';

describe('turns actions', function() {
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
})
