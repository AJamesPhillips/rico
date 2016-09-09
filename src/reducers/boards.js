let idCounter = 0;

const boards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [
        ...state,
        {
          name: action.name,
          id: idCounter++,
          doubloons: action.doubloons
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
    default:
      return state;
  }
};

export { boards }
