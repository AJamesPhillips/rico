import { CROP_TYPE } from "../../decls/flowTypes";

export interface Player {
  playerName: string
  playerId: number
}

export type BuildingSpace = undefined

export type Wharf = undefined | { cropType: undefined | CROP_TYPE, cropNumber: number }
