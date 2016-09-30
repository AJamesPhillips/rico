import expect from 'expect';
import { jobs, activeJob } from '../../src/reducers/jobs';

describe('jobs reducer', function() {
  it('should handle default', function() {
    expect(jobs(undefined, {})).toEqual([]);
  });

  it('should handle INITIALIZE_JOBS', function() {
    const action = {
      type: 'INITIALIZE_JOBS',
      jobs: [{
        title: 'builder',
        id: 0
      },
      {
        title: 'settler',
        id: 1
      }]
    };

    const expectedState = [{
      title: 'builder',
      id: 0
    },
    {
      title: 'settler',
      id: 1
    }];

    expect(jobs(undefined, action)).toEqual(expectedState);
  });

  it('should handle TAKE_JOB', function() {
    const state = [{
      title: 'builder',
      id: 0
    },
    {
      title: 'settler',
      id: 1
    }];

    const action = {
      type: 'TAKE_JOB',
      id: 1,
      takenBy: 3
    };

    const expectedState = [{
      title: 'builder',
      id: 0
    },
    {
      title: 'settler',
      id: 1,
      taken: true,
      takenBy: 3
    }];

    expect(jobs(state, action)).toEqual(expectedState);
  });

  it('should handle DISINCENTIVIZE_TAKEN_JOB', function() {
    const state = [{
      title: 'builder',
      id: 0
    },
    {
      title: 'settler',
      id: 1,
      incentive: 4
    }];

    const action = {
      type: 'DISINCENTIVIZE_TAKEN_JOB',
      id: 1
    };

    const expectedState = [{
      title: 'builder',
      id: 0
    },
    {
      title: 'settler',
      id: 1,
      incentive: 0
    }];

    expect(jobs(state, action)).toEqual(expectedState);
  });

  it('should handle INCENTIVIZE_UNTAKEN_JOBS', function() {
    const state = [{
      title: 'builder',
      id: 0,
      incentive: 0,
      taken: true
    },
    {
      title: 'settler',
      id: 1,
      incentive: 4
    }];

    const action = {
      type: 'INCENTIVIZE_UNTAKEN_JOBS'
    };

    const expectedState = [{
      title: 'builder',
      id: 0,
      incentive: 0,
      taken: true
    },
    {
      title: 'settler',
      id: 1,
      incentive: 5
    }];

    expect(jobs(state, action)).toEqual(expectedState);
  });

  it('should handle RESET_JOBS', function() {
    const state = [{
      title: 'builder',
      id: 0,
      taken: true
    },
    {
      title: 'settler',
      id: 1,
      taken: true
    }];

    const action = {
      type: 'RESET_JOBS'
    };

    const expectedState = [{
      title: 'builder',
      id: 0,
      taken: false,
      takenBy: undefined
    },
    {
      title: 'settler',
      id: 1,
      taken: false,
      takenBy: undefined
    }];

    expect(jobs(state, action)).toEqual(expectedState);
  })
});

describe('activeJob reducer', function() {
  it('should handle default', function() {
    expect(activeJob(undefined, {})).toEqual('');
  });

  it('should handle SET_ACTIVE_JOB', function() {
    const action = {
      type: 'SET_ACTIVE_JOB',
      job: 'builder'
    };

    const expectedState = 'builder';

    expect(activeJob(undefined, action)).toEqual(expectedState);
  });
})
