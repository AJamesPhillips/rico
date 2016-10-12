import expect from 'expect';
import actions from '../../src/actions';

describe('crafting actions', function() {
  it('SUBTRACT_CROP_FROM_SUPPLY', function() {
    const expectedAction = {
      type: 'SUBTRACT_CROP_FROM_SUPPLY',
      cropType: 'indigo',
      volume: 4
    };

    expect(actions.subtractCropFromSupply('indigo', 4)).toEqual(expectedAction);
  });

  it('craftCrop', function() {
    const dispatch = expect.createSpy();
    const board = {
      id: 0,
      buildings: [{
        name: 'Small Indigo Plant',
        colonists: [true]
      }],
      crops: [{
        name: 'indigo',
        colonists: [true]
      }, {
        name: 'indigo',
        colonists: [true]
      }]
    };
    const craftSupply = {
      indigo: 5
    };
    const getState = () => ({craftSupply});

    actions.craftCrop(board, 'indigo', ['Small Indigo Plant'])(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(actions.addBarrels('indigo', 1, 0));
  });

  it('craftCorn', function() {
    const dispatch = expect.createSpy();
    const board = {
      id: 0,
      crops: [{
        name: 'corn',
        colonists: [true]
      }, {
        name: 'corn',
        colonists: [true]
      }, {
        name: 'corn',
        colonists: [true]
      }, {
        name: 'corn',
        colonists: [true]
      }]
    };
    const craftSupply = {
      corn: 6
    };
    const getState = () => ({craftSupply});

    actions.craftCorn(board)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(actions.addBarrels('corn', 4, 0));
  });

  it('resolveCrafting', function() {
    const dispatch = expect.createSpy();
    const boards = [{}, {}];
    const getState = () => ({boards});

    actions.resolveCrafting()(dispatch, getState);

    expect(dispatch.calls.length).toEqual(10);
  })
});
