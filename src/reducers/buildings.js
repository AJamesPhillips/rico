
const buildingsInitialState = [
  {
    name: 'Small Market',
    cost: 1,
    supply: 2,
    initialSupply: 2,
    colonistSlots: 1
  },
  {
    name: 'University',
    cost: 8,
    supply: 2,
    initialSupply: 2,
    colonistSlots: 1
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
