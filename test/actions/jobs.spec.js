import expect from 'expect';
import actions from '../../src/actions';

describe('jobs actions', function() {
  it('INITIALIZE_JOBS', function() {
    const expectedAction = {
      type: 'INITIALIZE_JOBS',
      jobs: []
    };

    expect(actions.initializeJobs([])).toEqual(expectedAction);
  });

  it('TAKE_JOB', function() {
    const dispatch = expect.createSpy();
    const turns = [{
      currentPlayer: true,
      playerID: 5
    }];
    const getState = () => ({turns});
    const expectedAction = {
      type: 'TAKE_JOB',
      id: 2,
      takenBy: 5
    };

    actions.takeJob(2)(dispatch, getState);

    expect(dispatch.calls.length).toEqual(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('DISINCENTIVIZE_TAKEN_JOB', function() {
    const expectedAction = {
      type: 'DISINCENTIVIZE_TAKEN_JOB',
      id: 2
    };

    expect(actions.disincentivizeTakenJob(2)).toEqual(expectedAction);
  });

  it('INCENTIVIZE_UNTAKEN_JOBS', function() {
    const expectedAction = {
      type: 'INCENTIVIZE_UNTAKEN_JOBS'
    };

    expect(actions.incentivizeUntakenJobs()).toEqual(expectedAction);
  });

  it('RESET_JOBS', function() {
    const expectedAction = {
      type: 'RESET_JOBS'
    };

    expect(actions.resetJobs()).toEqual(expectedAction);
  });

  it('SET_ACTIVE_JOB', function() {
    const expectedAction = {
      type: 'SET_ACTIVE_JOB',
      job: {}
    };

    expect(actions.setActiveJob({})).toEqual(expectedAction);
  });
});
