import expect from 'expect';
import actions from '../../src/actions';

describe('crops actions', function() {
  it('FILL_POOL', function() {
    const expectedAction = {
      type: 'FILL_POOL'
    };

    expect(actions.fillCropPool()).toEqual(expectedAction);
  });

  it('REVEAL_NEW_FLOP', function() {
    const expectedAction = {
      type: 'REVEAL_NEW_FLOP'
    };

    expect(actions.revealNewFlop()).toEqual(expectedAction);
  });

  it('SET_FLOP_SIZE', function() {
    const expectedAction = {
      type: 'SET_FLOP_SIZE',
      flopSize: 4
    };

    expect(actions.setFlopSize(4)).toEqual(expectedAction);
  });

  it('TAKE_FROM_FLOP', function() {
    const expectedAction = {
      type: 'TAKE_FROM_FLOP',
      flopIndex: 3
    };

    expect(actions.takeFromFlop(3)).toEqual(expectedAction);
  });

  it('DISCARD_LEFTOVER_FLOP', function() {
    const expectedAction = {
      type: 'DISCARD_LEFTOVER_FLOP'
    };

    expect(actions.discardLeftoverFlop()).toEqual(expectedAction);
  });

  it('SHUFFLE_DISCARDED_INTO_POOL', function() {
    const expectedAction = {
      type: 'SHUFFLE_DISCARDED_INTO_POOL'
    };

    expect(actions.shuffleDiscardedIntoPool()).toEqual(expectedAction);
  });
});
