import { ShopBuilding } from '../../decls/flowTypes'
import { Action, ACTION_TYPES } from '../actions/constants'

type State = ShopBuilding[];

const buildingsInitialState: ShopBuilding[] = [
  {
    name: 'Small Indigo Plant',
    cost: 1,
    supply: 5,
    initialSupply: 5,
    colonists: [false]
  },
  {
    name: 'Small Sugar Mill',
    cost: 2,
    supply: 5,
    initialSupply: 5,
    colonists: [false]
  },
  {
    name: 'Small Market',
    cost: 1,
    supply: 2,
    initialSupply: 2,
    colonists: [false]
  },
  {
    name: 'University',
    cost: 8,
    supply: 5,
    initialSupply: 5,
    colonists: [false]
  }
]

export const buildings = (state: State = buildingsInitialState, action: Action): State => {
  if (action.type === ACTION_TYPES.REDUCE_BUILDING_SUPPLY) {
    return state.map(building => {
      if (building.name !== action.building.name) {
        return building
      }

      return {
        ...building,
        supply: building.supply - 1
      }
    })
  }

  return state
}
