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
        buildings: [],
        crops: [],
        unallocatedColonists: 0,
        barrels: {},
        active: false
      }
    ]);
  });

  it('should handle MODIFY_DOUBLOONS', function() {
    var state = [{
      name: 'mockPlayer',
      id: 0,
      doubloons: 3,
      active: true
    }, {
      name: 'mockPlayer2',
      id: 1,
      doubloons: 3
    }];

    var newState = [{
      name: 'mockPlayer',
      id: 0,
      doubloons: 5,
      active: true
    }, {
      name: 'mockPlayer2',
      id: 1,
      doubloons: 3
    }];

    var action = {
      type: 'MODIFY_DOUBLOONS',
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
      buildings: [],
      active: true
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
  });

  it('should handle UPDATE_ACTIVE_PLAYER', function() {
    const state = [{
      id: 0,
      name: 'mockPlayer'
    }, {
      id: 1,
      name: 'mockPlayer2'
    }];

    const expectedState = [{
      id: 0,
      name: 'mockPlayer',
      active: false
    }, {
      id: 1,
      name: 'mockPlayer2',
      active: true
    }];

    const action = {
      type: 'UPDATE_ACTIVE_PLAYER',
      index: 1
    };

    expect(boards(state, action)).toEqual(expectedState);
  });

  it('should handle ADD_CROP', function() {
    const state = [{
      id: 0,
      name: 'mockPlayer',
      crops: [],
      active: true
    }, {
      id: 1,
      name: 'mockPlayer2',
      crops: [],
      active: false
    }];

    const action = {
      type: 'ADD_CROP',
      crop: 'corn'
    };

    const expectedState = [{
      id: 0,
      name: 'mockPlayer',
      crops: [{
        name: 'corn',
        colonists: [false]
      }],
      active: true
    }, {
      id: 1,
      name: 'mockPlayer2',
      crops: [],
      active: false
    }];

    expect(boards(state, action)).toEqual(expectedState);
  });

  it('should handle ADD_COLONIST_TO_CROP', function() {
    const state = [{
      active: true,
      unallocatedColonists: 1,
      crops: [{
        name: 'corn',
        colonists: [false]
      }]
    }, {
      active: false
    }];

    const action = {
      type: 'ADD_COLONIST_TO_CROP',
      index: 0
    };

    const expectedState = [{
      active: true,
      unallocatedColonists: 0,
      crops: [{
        name: 'corn',
        colonists: [true]
      }]
    }, {
      active: false
    }];

    expect(boards(state, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_COLONIST_FROM_CROP', function() {
    const state = [{
      active: true,
      unallocatedColonists: 0,
      crops: [{
        name: 'corn',
        colonists: [true]
      }]
    }, {
      active: false
    }];

    const action = {
      type: 'REMOVE_COLONIST_FROM_CROP',
      index: 0
    };

    const expectedState = [{
      active: true,
      unallocatedColonists: 1,
      crops: [{
        name: 'corn',
        colonists: [false]
      }]
    }, {
      active: false
    }];

    expect(boards(state, action)).toEqual(expectedState);
  });

  it('should handle ADD_COLONISTS', function() {
    const state = [{
      id: 0,
      unallocatedColonists: 2
    }, {
      id: 1
    }];

    const action = {
      type: 'ADD_COLONISTS',
      colonists: 3,
      playerID: 0
    };

    const expectedState = [{
      id: 0,
      unallocatedColonists: 5
    }, {
      id: 1
    }];

    expect(boards(state, action)).toEqual(expectedState);
  });

  it('should handle ADD_BARRELS', function() {
    const state = [{
      id: 0
    }, {
      id: 1,
      barrels: {
        indigo: 3,
        corn: 1
      }
    }];

    const action = {
      type: 'ADD_BARRELS',
      playerID: 1,
      crop: 'corn',
      volume: 3
    };

    const expectedState = [{
      id: 0
    }, {
      id: 1,
      barrels: {
        indigo: 3,
        corn: 4
      }
    }];

    expect(boards(state, action)).toEqual(expectedState);
  });
});

