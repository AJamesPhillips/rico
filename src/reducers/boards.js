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
          buildings: []
        }
      ];
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
      })
    default:
      return state;
  }
};

export { boards }
