import { Player, BuildingSpace, Wharf } from "./types"
import { Action } from "../actions/constants"
import { CROP_TYPE, CROP_TYPES, ISLAND_SPACE_TYPES, IslandSpace, ISLAND_SPACE_TYPE, ShopBuilding } from "../../decls/flowTypes"
import { calcInitialDoubloons } from "./doubloons"

const PLAYER_NUMBER_AND_INDEX_TO_INITIAL_CROP = {
  2: {
    0: CROP_TYPES.INDIGO,
    1: CROP_TYPES.CORN,
  },
  3: {
    0: CROP_TYPES.INDIGO,
    1: CROP_TYPES.INDIGO,
    2: CROP_TYPES.CORN,
  },
  4: {
    0: CROP_TYPES.INDIGO,
    1: CROP_TYPES.INDIGO,
    2: CROP_TYPES.CORN,
    3: CROP_TYPES.CORN,
  },
  5: {
    0: CROP_TYPES.INDIGO,
    1: CROP_TYPES.INDIGO,
    2: CROP_TYPES.INDIGO,
    3: CROP_TYPES.CORN,
    4: CROP_TYPES.CORN,
  },
}

function initialIslandSpaces ({ numberOfPlayers, playerIndex }: { numberOfPlayers: number, playerIndex: number }): IslandSpace[] {
  const initialCrop: CROP_TYPE = PLAYER_NUMBER_AND_INDEX_TO_INITIAL_CROP[numberOfPlayers][playerIndex]
  const unoccupied = [...Array(11)].map(() => "UNOCCUPIED") as "UNOCCUPIED"[]
  const islandSpaceTypes = [initialCrop, ...unoccupied]
  return islandSpaceTypes.map(type => ({ type, hasColonist: false }))
}

export interface PlayerBoard {
  playerName: string
  playerId: number
  doubloons: number
  unallocatedColonists: number
  cropBarrels: { [key in CROP_TYPE]: number }
  islandSpaces: IslandSpace[]
  buildings: BuildingSpace[]
  wharf: Wharf
}

export type PlayerBoardsState = PlayerBoard[]

export function playerBoardsFactory (players: Player[]) {
  const numberOfPlayers = players.length

  const initialState: PlayerBoardsState = players.map(({ playerName, playerId }, playerIndex) => {
    const doubloons = calcInitialDoubloons(numberOfPlayers)
    const islandSpaces = initialIslandSpaces({ numberOfPlayers, playerIndex })

    return {
      playerName,
      playerId,
      doubloons,
      unallocatedColonists: 0,
      cropBarrels: {
        [CROP_TYPES.CORN]: 0,
        [CROP_TYPES.INDIGO]: 0,
        [CROP_TYPES.SUGAR]: 0,
        [CROP_TYPES.TOBACCO]: 0,
        [CROP_TYPES.COFFEE]: 0,
      },
      islandSpaces,
      buildings: [...Array(12)],
      wharf: undefined,
    }
  })

  return function playerBoards (state: PlayerBoardsState = initialState, action: Action): PlayerBoardsState {
    return state
  }
}

function playerBoardForPlayerId (state: PlayerBoardsState, args: { playerIdToFind: number }) {
  const playerBoard = state.find(({ playerId }) => playerId === args.playerIdToFind)
  if (!playerBoard) console.trace(`Could not find playerId: ${args.playerIdToFind} in ${JSON.stringify(state)}`)
  return playerBoard
}

function islandSpacesForPlayerId (state: PlayerBoardsState, args: { playerId: number }) {
  return playerBoardForPlayerId(state, { playerIdToFind: args.playerId })!.islandSpaces
}

function quarriesForPlayerId (state: PlayerBoardsState, args: { playerId: number }) {
  return islandSpacesForPlayerId(state, args).filter(({ type }) => type === ISLAND_SPACE_TYPES.QUARRY)
}

function activeQuarriesForPlayerId (state: PlayerBoardsState, args: { playerId: number }): number {
  if (args.playerId === undefined) return 0
  return quarriesForPlayerId(state, args).filter(({ hasColonist }) => hasColonist).length
}

function doubloonsForPlayerId (state: PlayerBoardsState, args: { playerId: number }): number {
  if (args.playerId === undefined) return 0
  return playerBoardForPlayerId(state, { playerIdToFind: args.playerId })!.doubloons
}

export const playerBoardsSelectors = {
  playerBoardForPlayerId,
  islandSpacesForPlayerId,
  quarriesForPlayerId,
  activeQuarriesForPlayerId,
  doubloonsForPlayerId,
}
