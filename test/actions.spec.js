import expect from 'expect';
import * as actions from '../src/actions/actions.js';

describe('actions', function() {
  describe('should create an action to', function() {
    it('MODIFY_DOUBLOONS', function() {
      const value = 3;
      const id = 0;

      const expectedAction = {
        type: 'MODIFY_DOUBLOONS',
        doubloons: 3,
        id: 0
      };

      expect(actions.modifyDoubloons(value, id)).toEqual(expectedAction);
    });

    it('ADD_PLAYER', function() {
      const name = 'mockPlayer';
      const doubloons = 3;

      const expectedAction = {
        type: 'ADD_PLAYER',
        name,
        doubloons
      };

      expect(actions.addPlayer(name, doubloons)).toEqual(expectedAction);
    })
  });
});
