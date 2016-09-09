import expect from 'expect';
import { turns, jobTurns } from '../../src/reducers/turns.js';

describe('turns', function() {
  it('should handle INITIALIZE_TURNS', function() {
    const playerState = [{
      name: 'playerOne',
      id: 0
    }, {
      name: 'playerTwo',
      id: 1
    }, {
      name: 'playerThree',
      id: 2
    }];

    expect(
      turns([], {
        players: playerState,
        type: 'INITIALIZE_TURNS'
      })
    ).toEqual([
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
    ]);
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

    expect(
      turns(initialState, {
        type: 'NEXT_TURN'
      })
    ).toEqual([
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
    ]);
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

    expect(
      turns(initialState, {
        type: 'NEXT_TURN'
      })
    ).toEqual([
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
    ]);
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

    expect(
      turns(initialState, {
        type: 'NEXT_ROUND'
      })
    ).toEqual([
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
    ]);
  });
});

describe('jobTurns', function() {
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
