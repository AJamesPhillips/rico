let idCounter = 0;

const boards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [
        ...state,
        {
          name: action.name,
          id: idCounter++,
          doubloons: action.doubloons,
          buildings: [],
          crops: []
        }
      ];
    case 'UPDATE_ACTIVE_PLAYER':
      return state.map((player, index) => {
        if (index === action.index) {
          return {
            ...player,
            active: true
          }
        }

        return {
          ...player,
          active: false
        }
      });
    case 'MODIFY_DOUBLOONS':
      return state.map(player => {
        if (player.id !== action.id) {
          return player;
        }

        return {
          ...player,
          doubloons: player.doubloons + action.doubloons
        };
      });
    case 'ADD_BUILDING':
      return state.map(player => {
        if (player.id !== action.id) {
          return player;
        }

        return {
          ...player,
          buildings: [
            ...player.buildings,
            {
              name: action.building.name,
              colonists: action.building.colonists
            }
          ]
        };
      });
    case 'ADD_CROP':
      const activeID = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeID) {
          return player;
        }

        return {
          ...player,
          crops: [
            ...player.crops,
            {
              name: action.crop,
              colonists: [false]
            }
          ]
        };
      });
    default:
      return state;
  }
};

export { boards }
