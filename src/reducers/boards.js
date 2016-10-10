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
          crops: [],
          unallocatedColonists: 0
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
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player,index) => {
        if (index !== activeIndex) {
          return player;
        }

        return {
          ...player,
          doubloons: player.doubloons + action.doubloons
        };
      });
    case 'ADD_BUILDING':
      // the number is because babel thinks you can't
      // declare variables multiple times in different
      // case blocks. dumb dumb dumb
      const activeIndex2 = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex2) {
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
      // see above for number in variable name
      const activeIndex3 = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex3) {
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
    case 'ADD_COLONIST_TO_CROP':
      const activeIndex4 = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex4) {
          return player;
        }

        return {
          ...player,
          unallocatedColonists: player.unallocatedColonists-1,
          crops: [
            ...player.crops.slice(0, action.index),
            {
              ...player.crops[action.index],
              colonists: [true]
            },
            ...player.crops.slice(action.index+1)
          ]
        };
      });
    case 'REMOVE_COLONIST_FROM_CROP':
      const activeIndex5 = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex5) {
          return player;
        }

        return {
          ...player,
          unallocatedColonists: player.unallocatedColonists+1,
          crops: [
            ...player.crops.slice(0, action.index),
            {
              ...player.crops[action.index],
              colonists: [false]
            },
            ...player.crops.slice(action.index+1)
          ]
        };
      });
    case 'ADD_COLONISTS':
      return state.map(player => {
        if (player.id !== action.playerID) {
          return player;
        }

        return {
          ...player,
          unallocatedColonists: player.unallocatedColonists + action.colonists
        };
      })
    default:
      return state;
  }
};

export { boards }
