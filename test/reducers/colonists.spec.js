import expect from 'expect';
import { colonists } from '../../src/reducers/colonists';

describe('colonist reducer', function() {
  it('should handle default', function() {
    const expectedState = {
      remaining: 0,
      ship: 0
    };
    expect(colonists(undefined, {})).toEqual(expectedState);
  });

  it('should handle SET_REMAINING', function() {
    const state = {
      remaining: 0,
      ship: 0
    };

    const action = {
      type: 'SET_REMAINING',
      remaining: 30
    };

    const expectedState = {
      remaining: 30,
      ship: 0
    };

    expect(colonists(state, action)).toEqual(expectedState);
  });

  it('should handle REPLENISH_SHIP', function() {
    const state = {
      remaining: 40,
      ship: 0
    };

    const action = {
      type: 'REPLENISH_SHIP',
      colonists: 5
    };

    const expectedState = {
      remaining: 35,
      ship: 5
    };

    expect(colonists(state, action)).toEqual(expectedState);
  });
});
