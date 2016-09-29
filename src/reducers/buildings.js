// TODO: formalize the structure of buildings
const buildingsInitialState = [
  {
    name: 'Small Market',
    cost: 1,
    supply: 5,
    initialSupply: 5,
    colonists: [false]
  },
  {
    name: 'University',
    cost: 8,
    supply: 5,
    initialSupply: 5,
    colonists: [false]
  }
];

const buildings = (state = buildingsInitialState, action) => {
  switch (action.type) {
    case 'REDUCE_BUILDING_SUPPLY':
      return state.map(building => {
        if (building.name !== action.building.name) {
          return building;
        }

        return {
          ...building,
          supply: building.supply-1
        };

      });
    default:
      return state;
  }
};

export {buildings}
