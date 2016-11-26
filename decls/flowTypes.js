declare type Action = {
  type: string
};

declare type CropType =
  | 'corn'
  | 'indigo'
  | 'sugar'
  | 'tobacco'
  | 'coffee'

declare type Building = {
  name: string,
  colonists: boolean[],
};

declare type ShopBuilding = {
  name: string,
  cost: number,
  supply: number,
  initialSupply: number,
  colonists: boolean[]
};

declare type Crop = {
  name: CropType,
  colonists: boolean[]
};

declare type Board = {
  id: number,
  name: string,
  active: boolean,
  crops: Crop[],
  buildings: Building[],
  unallocatedColonists: number,
  barrels: Object,
  doubloons: number
};

declare type State = {
  boards: Board[],
  jobs: Array<any>,
  activeJob: string,
  buildings: Array<any>,
  turns: Array<any>,
  jobTurns: Array<any>,
  crops: Object,
  colonists: Object,
  craftSupply: Object
}
