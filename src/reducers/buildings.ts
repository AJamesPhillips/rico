import { ShopBuilding, CROP_TYPES, BUILDING_NAMES, BUILDING_NAME } from "../../decls/flowTypes"
import { Action } from "../actions/constants"

type BuildingState = ShopBuilding[]

function getBuildingsInitialState (numberOfPlayers: number): ShopBuilding[] {
  const initialCounts = {
    smallProductionBuilding: Math.min(4, numberOfPlayers),
    productionBuilding: Math.min(3, numberOfPlayers),
    smallVioletBuilding: Math.min(2, numberOfPlayers - 1),
    largeVioletBuilding: 1,
  }

  const buildings: ShopBuilding[] = [
    ...[
      {
        name: BUILDING_NAMES["Small Indigo Plant"],
        description: "",
        maxColonists: 1,
        produces: CROP_TYPES.INDIGO,
        points: 1,
        cost: 1,
        initialCount: initialCounts.smallProductionBuilding,
      },
      {
        name: BUILDING_NAMES["Small Sugar Mill"],
        description: "",
        maxColonists: 1,
        produces: CROP_TYPES.SUGAR,
        points: 1,
        cost: 2,
        initialCount: initialCounts.smallProductionBuilding,
      },
      {
        name: BUILDING_NAMES["Small Market"],
        description: "+1 doubloon with sale",
        maxColonists: 1,
        produces: undefined,
        points: 1,
        cost: 1,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Hacienda"],
        description: "+1 plantation from supply",
        maxColonists: 1,
        produces: undefined,
        points: 1,
        cost: 2,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Construction Hut"],
        description: "quarry instead of plantation",
        maxColonists: 1,
        produces: undefined,
        points: 1,
        cost: 2,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Small Warehouse"],
        description: "store 1 kind of good",
        maxColonists: 1,
        produces: undefined,
        points: 1,
        cost: 3,
        initialCount: initialCounts.smallVioletBuilding,
      },
    ].map(building => ({ ...building, size: 1, maxQuaries: 1 })),
    ...[
      {
        name: BUILDING_NAMES["Indigo Plant"],
        description: "",
        maxColonists: 3,
        produces: CROP_TYPES.INDIGO,
        points: 2,
        cost: 3,
        initialCount: initialCounts.productionBuilding,
      },
      {
        name: BUILDING_NAMES["Sugar Mill"],
        description: "",
        maxColonists: 3,
        produces: CROP_TYPES.SUGAR,
        points: 2,
        cost: 4,
        initialCount: initialCounts.productionBuilding,
      },
      {
        name: BUILDING_NAMES["Hospice"],
        description: "+1 colonist for settling",
        maxColonists: 1,
        produces: undefined,
        points: 2,
        cost: 4,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Office"],
        description: "sell same kind of goods",
        maxColonists: 1,
        produces: undefined,
        points: 2,
        cost: 5,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Large Market"],
        description: "+2 doubloons with sale",
        maxColonists: 1,
        produces: undefined,
        points: 2,
        cost: 5,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Large Warehouse"],
        description: "store 2 kinds of goods",
        maxColonists: 1,
        produces: undefined,
        points: 2,
        cost: 6,
        initialCount: initialCounts.smallVioletBuilding,
      },
    ].map(building => ({ ...building, size: 1, maxQuaries: 2 })),
    ...[
      {
        name: BUILDING_NAMES["Tobacco Storage"],
        description: "",
        maxColonists: 3,
        produces: CROP_TYPES.TOBACCO,
        points: 3,
        cost: 5,
        initialCount: initialCounts.productionBuilding,
      },
      {
        name: BUILDING_NAMES["Coffee Roaster"],
        description: "",
        maxColonists: 2,
        produces: CROP_TYPES.COFFEE,
        points: 3,
        cost: 6,
        initialCount: initialCounts.productionBuilding,
      },
      {
        name: BUILDING_NAMES["University"],
        description: "+1 colonist for building",
        maxColonists: 1,
        produces: undefined,
        points: 3,
        cost: 7,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Factory"],
        description: "+0/1/2/3/5 doubloons with production",
        maxColonists: 1,
        produces: undefined,
        points: 3,
        cost: 8,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Harbor"],
        description: "+1 victory point per delivery",
        maxColonists: 1,
        produces: undefined,
        points: 3,
        cost: 8,
        initialCount: initialCounts.smallVioletBuilding,
      },
      {
        name: BUILDING_NAMES["Wharf"],
        description: "your own ship",
        maxColonists: 1,
        produces: undefined,
        points: 3,
        cost: 9,
        initialCount: initialCounts.smallVioletBuilding,
      }
    ].map(building => ({ ...building, size: 1, maxQuaries: 3 })),
    ...[
      {
        name: BUILDING_NAMES["Guild Hall"],
        description: "2 victory points for each large building\n1 victory points for each small building"
      },
      {
        name: BUILDING_NAMES["Residence"],
        description: "4 VP for <10\n5 VP for 10\n6 VP for 11\n7 VP for 12\n occupied island spaces"
      },
      {
        name: BUILDING_NAMES["Fortress"],
        description: "1 victory point for every 3 colonists"
      },
      {
        name: BUILDING_NAMES["Customs House"],
        description: "1 victory point for every 4 victory point chip"
      },
      {
        name: BUILDING_NAMES["City Hall"],
        description: "1 victory point for each violet building"
      }
    ].map(largeVioletBuilding => ({
      ...largeVioletBuilding,
      size: 2,
      maxColonists: 1,
      produces: undefined,
      points: 4,
      cost: 10,
      maxQuaries: 4,
      initialCount: initialCounts.largeVioletBuilding
    }))
  ].map(building => ({ ...building, colonists: 0, remainingCount: building.initialCount }))

  return buildings
}

export function buildingsFactory (numberOfPlayers: number) {
  return function buildings (state: BuildingState = getBuildingsInitialState(numberOfPlayers), action: Action): BuildingState {
    // if (action.type === "REDUCE_BUILDING_SUPPLY") {
    //   return state.map(building => {
    //     if (building.name !== action.building.name) {
    //       return building
    //     }

    //     let remainingCount = building.remainingCount
    //     remainingCount += -1

    //     return {
    //       ...building,
    //       remainingCount,
    //     }
    //   })
    // }

    return state
  }
}

function buildingHasSupply (building: ShopBuilding) {
  return building.remainingCount > 0
}

export const buildingCalcs = {
  buildingHasSupply,
}

function getBuilding (state: BuildingState, args: { buildingName: BUILDING_NAME }) {
  return state.find(building => building.name === args.buildingName)
}

export const buildingSelectors = {
  getBuilding,
}
