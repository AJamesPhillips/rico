import expect from 'expect';
import { boards } from '../../src/reducers/boards.js';

describe('boards reducer', function() {
  it('should handle default', function() {
    expect(boards(undefined, {})).toEqual([]);
  });

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
        doubloons: 3,
        buildings: []
      }
    ]);
  });

  it('should handle MODIFY_DOUBLOONS', function() {
    var state = [{
      name: 'mockPlayer',
      id: 0,
      doubloons: 3
    }, {
      name: 'mockPlayer2',
      id: 1,
      doubloons: 3
    }];

    var newState = [{
      name: 'mockPlayer',
      id: 0,
      doubloons: 5
    }, {
      name: 'mockPlayer2',
      id: 1,
      doubloons: 3
    }];

    var action = {
      type: 'MODIFY_DOUBLOONS',
      id: 0,
      doubloons: 2
    };

    expect(
      boards(state, action)
    ).toEqual(newState);
  });

  it('should handle ADD_BUILDING', function() {
    const action = {
      type: 'ADD_BUILDING',
      id: 0,
      building: {
        name: 'Small Market',
        colonists: [false]
      }
    };

    const state = [{
      id: 0,
      name: 'mockPlayer',
      buildings: []
    }, {
      id: 1,
      name: 'mockPlayer2',
      buildings: []
    }];

    const newState = boards(state, action);

    expect(newState[0].buildings).toEqual([{
      name: 'Small Market',
      colonists: [false]
    }])
  })
});

