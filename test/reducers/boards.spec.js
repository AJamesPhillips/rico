import expect from 'expect';
import { boards } from '../../src/reducers/boards.js';

describe('boards reducer', function() {
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
    expect(
      boards([{
        name: 'mockPlayer',
        id: 0,
        doubloons: 3,
        buildings: []
      }], {
        type: 'MODIFY_DOUBLOONS',
        id: 0,
        doubloons: 2
      })
    ).toEqual([{
      name: 'mockPlayer',
      id: 0,
      doubloons: 5,
      buildings: []
    }]);
  });
});

