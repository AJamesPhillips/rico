
export type CropType =
  | 'corn'
  | 'indigo'
  | 'sugar'
  | 'tobacco'
  | 'coffee'

export type Building = {
  name: string,
  colonists: boolean[]
}

export type ShopBuilding = {
  name: string,
  cost: number,
  supply: number,
  initialSupply: number,
  colonists: boolean[]
}

export type Crop = {
  name: CropType,
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
