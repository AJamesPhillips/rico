import expect from 'expect';
import { crops } from '../../src/reducers/crops';

describe('crops reducer', function() {
  it('should handle SET_FLOP_SIZE', function() {
    expect(
      crops({}, {
        type: 'SET_FLOP_SIZE',
        flopSize: 4
      })
    ).toEqual({
      flopSize: 4
    });
  });

  it('should handle FILL_POOL', function() {
    const state = crops(undefined, {
      type: 'FILL_POOL'
    });

    const cornCrops = state.pool.filter(c => c === 'corn');
    expect(cornCrops.length).toEqual(10);
    const indigoCrops = state.pool.filter(c => c === 'indigo');
    expect(indigoCrops.length).toEqual(12);
    const sugarCrops = state.pool.filter(c => c === 'sugar');
    expect(sugarCrops.length).toEqual(11);
    const tobaccoCrops = state.pool.filter(c => c === 'tobacco');
    expect(tobaccoCrops.length).toEqual(9);
    const coffeeCrops = state.pool.filter(c => c === 'coffee');
    expect(coffeeCrops.length).toEqual(8);
  });

  it('should handle REVEAL_NEW_FLOP', function() {
    const state = crops({
      pool: ['corn', 'sugar', 'tobacco'],
      flopSize: 2
    }, {
      type: 'REVEAL_NEW_FLOP'
    });
    expect(state.flop).toEqual(['corn', 'sugar'])
  });

  it('should handle DISCARD_LEFTOVER_FLOP', function() {
    expect(
      crops({
        flop: ['corn'],
        discarded: ['sugar']
      }, {
        type: 'DISCARD_LEFTOVER_FLOP',
        leftover: ['tobacco']
      })
    ).toEqual({
      flop: [],
      discarded: ['sugar', 'tobacco']
    });
  });

  it('should handle SHUFFLE_DISCARDED_INTO_POOL', function() {
    const state = crops({
      pool: ['corn', 'sugar'],
      discarded: ['coffee', 'indigo']
    }, {
      type: 'SHUFFLE_DISCARDED_INTO_POOL'
    });
    expect(state.pool).toInclude('corn');
    expect(state.pool).toInclude('coffee');
    expect(state.pool).toInclude('sugar');
    expect(state.pool).toInclude('indigo');
  });
});
