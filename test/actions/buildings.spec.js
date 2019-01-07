import expect from 'expect';
import actions from '../../src/actions/index_original';

describe('buildings actions', function() {
  it('REDUCE_BUILDING_SUPPLY', function() {
    const expectedAction = {
      type: 'REDUCE_BUILDING_SUPPLY',
      building: {}
    };

    expect(actions.reduceBuildingSupply({})).toEqual(expectedAction);
  });
})
