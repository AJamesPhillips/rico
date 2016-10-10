import expect from 'expect';
import actions from '../../src/actions';

describe('colonist actions', function() {
  it('SET_REMAINING', function() {
    const expectedAction = {
      type: 'SET_REMAINING',
      remaining: 50
    };

    expect(actions.setRemaining(50)).toEqual(expectedAction);
  });

  it('REPLENISH_SHIP', function() {
    const expectedAction = {
      type: 'REPLENISH_SHIP',
      colonists: 3
    };

    expect(actions.replenishShip(3)).toEqual(expectedAction);
  });

  it('assignColonists', function() {
    const dispatch = expect.createSpy();
    const boards = [{
      id: 0
    }, {
      id: 1
    }, {
      id: 2
    }];
    const colonists = {
      ship: 5
    };
    const getState = () => ({boards, colonists});

    actions.assignColonists()(dispatch, getState);

    expect(dispatch.calls.length).toEqual(5);
  });


});
