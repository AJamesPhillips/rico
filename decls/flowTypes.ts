import { str_enum } from "@ajp/utils-ts/utils"

export const CROP_TYPES = str_enum(["CORN", "INDIGO", "SUGAR", "TOBACCO", "COFFEE"])

export type CROP_TYPE = keyof typeof CROP_TYPES

export const ISLAND_SPACE_TYPES = str_enum(["CORN", "INDIGO", "SUGAR", "TOBACCO", "COFFEE", "QUARRY", "UNOCCUPIED"])

export type ISLAND_SPACE_TYPE = keyof typeof ISLAND_SPACE_TYPES

export interface IslandSpace {
  type: ISLAND_SPACE_TYPE
  hasColonist: boolean
}

export const BUILDING_NAMES = str_enum([
  "Small Indigo Plant",
  "Small Sugar Mill",
  "Small Market",
  "Hacienda",
  "Construction Hut",
  "Small Warehouse",
  "Indigo Plant",
  "Sugar Mill",
  "Hospice",
  "Office",
  "Large Market",
  "Large Warehouse",
  "Tobacco Storage",
  "Coffee Roaster",
  "University",
  "Factory",
  "Harbor",
  "Wharf",
  "Guild Hall",
  "Residence",
  "Fortress",
  "Customs House",
  "City Hall",
])

export type BUILDING_NAME = keyof typeof BUILDING_NAMES

export interface Building {
  name: BUILDING_NAME
  description: string
  size: number
  maxColonists: number
  colonists: number
  produces: CROP_TYPE | undefined
  points: number
}

export interface ShopBuilding extends Building {
  cost: number
  maxQuaries: number
  remainingCount: number
  initialCount: number
}

export interface ShopBuildingForPlayer extends ShopBuilding {
  playersTurnToBuild: boolean
  playerAbleToBuild: boolean
  costForPlayer: number
}

export const ROLE_TITLES = str_enum([
  "Settler",
  "Mayor",
  "Builder",
  "Craftsman",
  "Trader",
  "Captain",
  "Prospector"
])

export type ROLE_TITLE = keyof typeof ROLE_TITLES

//

export type Crop = {
  name: CROP_TYPE,
  colonists: boolean[]
}

export type Board = {
  id: number,
  name: string,
  active: boolean,
  crops: Crop[],
  buildings: Building[],
  unallocatedColonists: number,
  barrels: Object,
  doubloons: number
}

export type Job = {
  title: string,
  id: number,
  taken: boolean,
  incentive: number
}

export type Turn = {
  playerID: number,
  currentPlayer: boolean
}

export type State = {
  boards: Board[],
  jobs: Job[],
  activeJob: string,
  buildings: ShopBuilding[],
  turns: Turn[],
  jobTurns: Array<any>,
  crops: Object,
  colonists: Object,
  craftSupply: Object
}
