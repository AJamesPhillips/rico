/* @flow */
let idCounter = 0;

type State = Board[];

const boards = (state: State = [], action: Object): State => {
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
          unallocatedColonists: 0,
          barrels: {},
          active: false
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
    // adding braces around a case block is somewhat nonstandard,
    // but we're declaring activeIndex multiple times and in switch
    // statements, case blocks don't have their own scope. so we force new ones
    // with braces.
    case 'MODIFY_DOUBLOONS': {
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
    }
    case 'ADD_BUILDING': {
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex) {
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
    }
    case 'ADD_CROP': {
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex) {
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
    }
    case 'ADD_BARRELS': {
      return state.map(player => {
        if (player.id !== action.playerID) {
          return player;
        }

        return {
          ...player,
          barrels: {
            ...player.barrels,
            [action.crop]: (player.barrels[action.crop] || 0) + action.volume
          }
        };
      });
    }
    case 'ADD_COLONIST_TO_CROP': {
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex) {
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
    }
    case 'REMOVE_COLONIST_FROM_CROP': {
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex) {
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
    }
    // TODO: handle buildings with more than one colonist slot
    case 'ADD_COLONIST_TO_BUILDING': {
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex) {
          return player;
        }

        return {
          ...player,
          unallocatedColonists: player.unallocatedColonists-1,
          buildings: [
            ...player.buildings.slice(0, action.index),
            {
              ...player.buildings[action.index],
              colonists: [true]
            },
            ...player.buildings.slice(action.index+1)
          ]
        };
      });
    }
    // TODO: handle buildings with more than one colonist slot
    case 'REMOVE_COLONIST_FROM_BUILDING': {
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex) {
          return player;
        }

        return {
          ...player,
          unallocatedColonists: player.unallocatedColonists+1,
          buildings: [
            ...player.buildings.slice(0, action.index),
            {
              ...player.buildings[action.index],
              colonists: [false]
            },
            ...player.buildings.slice(action.index+1)
          ]
        };
      });
    }
    case 'ADD_COLONISTS': {
      return state.map(player => {
        if (player.id !== action.playerID) {
          return player;
        }

        return {
          ...player,
          unallocatedColonists: player.unallocatedColonists + action.colonists
        };
      })
    }
    default:
      return state;
  }
};

export { boards }
