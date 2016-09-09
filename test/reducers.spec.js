import expect from 'expect';
import { boards } from '../src/reducers/boards.js';
import { turns } from '../src/reducers/turns.js';

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
      var playerState = [{
        name: 'playerOne',
        id: 0
      }, {
        name: 'playerTwo',
        id: 1
      }, {
        name: 'playerThree',
        id: 2
      }];

    });
  });
});
