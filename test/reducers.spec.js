import expect from 'expect';
import { boards } from '../src/reducers/boards.js';
import { turns, jobTurns } from '../src/reducers/turns.js';

describe('reducers', function() {
  describe('boards', function() {
    it('should handle ADD_PLAYER', function() {
      expect(
        boards(undefined, {
          type: 'ADD_PLAYER',
          name: 'mockPlayer',
          doubloons: 3
        })
      ).toEqual([
        {
          name: 'mockPlayer',
          id: 0,
          doubloons: 3
        }
      ]);
    });

    it('should handle MODIFY_DOUBLOONS', function() {
      expect(
        boards([{
          name: 'mockPlayer',
          id: 0,
          doubloons: 3
        }], {
          type: 'MODIFY_DOUBLOONS',
          id: 0,
          doubloons: 2
        })
      ).toEqual([{
        name: 'mockPlayer',
        id: 0,
        doubloons: 5
      }]);
    });
  });

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
});
