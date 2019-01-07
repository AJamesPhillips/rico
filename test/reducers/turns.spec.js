import expect from 'expect';
import { turns, jobTurns, activePlayerTab } from '../../src/reducers/turns.js';
import actions from '../../src/actions/index_original';

describe('turns reducer', function() {
  it('should handle default', function() {
    expect(turns(undefined, {})).toEqual([]);
  });

  it('should handle INITIALIZE_TURNS', function() {
    const playerTurns = [{
      name: 'playerOne',
      id: 0
    }, {
      name: 'playerTwo',
      id: 1
    }, {
      name: 'playerThree',
      id: 2
    }];

    const newState = [
      {
        playerID: 0,
        currentPlayer: true
      },
      {
        playerID: 1,
        currentPlayer: false
      },
      {
        playerID: 2,
        currentPlayer: false
      }
    ];
    expect(
      turns([], actions.initializeTurns(playerTurns))
    ).toEqual(newState);
  });

  it('should handle NEXT_TURN', function() {
    const initialState = [
      {
        playerID: 0,
        currentPlayer: true
      },
      {
        playerID: 1,
        currentPlayer: false
      },
      {
        playerID: 2,
        currentPlayer: false
      }
    ];

    const newState = [
      {
        playerID: 0,
        currentPlayer: false
      },
      {
        playerID: 1,
        currentPlayer: true
      },
      {
        playerID: 2,
        currentPlayer: false
      }
    ];

    expect(
      turns(initialState, actions.nextTurn())
    ).toEqual(newState);
  });

  it('should remove currentPlayer at the end of a round', function() {
    const initialState = [
      {
        playerID: 0,
        currentPlayer: false
      },
      {
        playerID: 1,
        currentPlayer: false
      },
      {
        playerID: 2,
        currentPlayer: true
      }
    ];

    const newState = [
      {
        playerID: 0,
        currentPlayer: false
      },
      {
        playerID: 1,
        currentPlayer: false
      },
      {
        playerID: 2,
        currentPlayer: false
      }
    ];

    expect(
      turns(initialState, actions.nextTurn())
    ).toEqual(newState);
  });

  it('should handle NEXT_ROUND', function() {
    const initialState = [
      {
        playerID: 0,
        currentPlayer: false
      },
      {
        playerID: 1,
        currentPlayer: false
      },
      {
        playerID: 2,
        currentPlayer: false
      }
    ];

    const newState = [
      {
        playerID: 1,
        currentPlayer: true
      },
      {
        playerID: 2,
        currentPlayer: false
      },
      {
        playerID: 0,
        currentPlayer: false
      }
    ];

    expect(
      turns(initialState, actions.nextRound())
    ).toEqual(newState);
  });
});

describe('jobTurns reducer', function() {
  it('should handle default', function() {
    expect(jobTurns(undefined, {})).toEqual([]);
  });

  it('should handle START_JOB_PHASE', function() {
    const playerTurns = [{
      playerID: 0,
      currentPlayer: false
    }, {
      playerID: 1,
      currentPlayer: true
    }, {
      playerID: 2,
      currentPlayer: false
    }];

    const jobTurnsState = [{
      playerID: 1,
      currentPlayer: true,
      currentJobPlayer: true
    }, {
      playerID: 2,
      currentPlayer: false
    }, {
      playerID: 0,
      currentPlayer: false
    }];

    expect(
      jobTurns([], {
        type: 'START_JOB_PHASE',
        playerTurns
      })
    ).toEqual(jobTurnsState);
  });

  it('should handle NEXT_JOB_TURN', function() {
    const jobTurnsState = [{
      playerID: 1,
      currentPlayer: true,
      currentJobPlayer: true
    }, {
      playerID: 2,
      currentPlayer: false
    }, {
      playerID: 0,
      currentPlayer: false
    }];

    const updatedState = [{
      playerID: 1,
      currentPlayer: true,
      currentJobPlayer: false
    }, {
      playerID: 2,
      currentPlayer: false,
      currentJobPlayer: true
    }, {
      playerID: 0,
      currentPlayer: false
    }];

    expect(
      jobTurns(jobTurnsState, {
        type: 'NEXT_JOB_TURN'
      })
    ).toEqual(updatedState);
  });

  it('should handle END_JOB_PHASE', function() {
    const state = [{
      playerID: 1,
      currentPlayer: true,
    }, {
      playerID: 2,
      currentPlayer: false
    }, {
      playerID: 0,
      currentPlayer: false,
      currentJobPlayer: true
    }];

    expect(jobTurns(state, {
      type: 'END_JOB_PHASE'
    })).toEqual([]);
  });


  it('should end job turns', function() {
    const jobTurnsState = [{
      playerID: 1,
      currentPlayer: true,
    }, {
      playerID: 2,
      currentPlayer: false
    }, {
      playerID: 0,
      currentPlayer: false,
      currentJobPlayer: true
    }];

    const updatedState = [{
      playerID: 1,
      currentPlayer: true,
    }, {
      playerID: 2,
      currentPlayer: false
    }, {
      playerID: 0,
      currentPlayer: false,
      currentJobPlayer: false
    }];
    expect(
      jobTurns(jobTurnsState, {
        type: 'NEXT_JOB_TURN'
      })
    ).toEqual(updatedState)
  });
});
