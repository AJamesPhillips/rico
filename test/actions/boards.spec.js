import expect from 'expect';
import actions from '../../src/actions/index_original';

describe('boards actions', function() {
  it('MODIFY_DOUBLOONS', function() {
    const value = 3;

    const expectedAction = {
      type: 'MODIFY_DOUBLOONS',
      doubloons: 3,
    };

    expect(actions.modifyDoubloons(value)).toEqual(expectedAction);
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
  });

  it('UPDATE_ACTIVE_PLAYER', function() {
    const expectedAction = {
      type: 'UPDATE_ACTIVE_PLAYER',
      index: 3
    };

    expect(actions.updateActivePlayer(3)).toEqual(expectedAction);
  });

  it('ADD_CROP', function() {
    const expectedAction = {
      type: 'ADD_CROP',
      crop: 'corn'
    };

    expect(actions.addCrop('corn')).toEqual(expectedAction)
  });

  it('ADD_BUILDING', function() {
    const expectedAction = {
      type: 'ADD_BUILDING',
      building: {}
    };

    expect(actions.addBuilding({})).toEqual(expectedAction);
  });

  it('ADD_COLONIST_TO_CROP', function() {
    const expectedAction = {
      type: 'ADD_COLONIST_TO_CROP',
      index: 3
    };

    expect(actions.addColonistToCrop(3)).toEqual(expectedAction);
  });

  it('REMOVE_COLONIST_FROM_CROP', function() {
    const expectedAction = {
      type: 'REMOVE_COLONIST_FROM_CROP',
      index: 3
    };

    expect(actions.removeColonistFromCrop(3)).toEqual(expectedAction);
  });

  it('ADD_COLONISTS', function() {
    const expectedAction = {
      type: 'ADD_COLONISTS',
      colonists: 3,
      playerID: 1
    };

    expect(actions.addColonists(3, 1)).toEqual(expectedAction);
  });
});
