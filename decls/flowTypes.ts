import { str_enum } from "@ajp/utils-ts/utils"

export const CROP_TYPES = str_enum(["CORN", "INDIGO", "SUGAR", "TOBACCO", "COFFEE"])

export type CROP_TYPE = keyof typeof CROP_TYPES

export interface Building {
  name: string
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
  remainingCount: number | undefined
  initialCount: number
}

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
