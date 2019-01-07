import { combineReducers, Action as ReduxAction } from "redux"

import { ShopBuildingForPlayer, ShopBuilding } from "../../decls/flowTypes"
import { Player } from "./types"
import { victoryPointsFactory } from "./victoryPoints"
import { doubloonsFactory } from "./doubloons"
import { colonistsFactory } from "./colonists"
import { islandTilesFactory } from "./islandTiles"
import { cargoShipsFactory } from "./cargoShips"
import { goodsFactory } from "./goods"
import { tradingHouseFactory } from "./tradingHouse"
import { buildingsFactory, buildingCalcs, buildingSelectors } from "./buildings"
import { rolesFactory } from "./roles"
import { playerBoardsFactory, playerBoardsSelectors } from "./playerBoards"
import { roundFactory, roundSelectors } from "./roundFactory"
import { displayFactory } from "./displayFactory"
import { mapSubStateToSelectors } from "./utils";

type ReducersMap = {
  victoryPoints: ReturnType<typeof victoryPointsFactory>,
  doubloons: ReturnType<typeof doubloonsFactory>,
  colonists: ReturnType<typeof colonistsFactory>,
  islandTiles: ReturnType<typeof islandTilesFactory>,
  cargoShips: ReturnType<typeof cargoShipsFactory>,
  goods: ReturnType<typeof goodsFactory>,
  tradingHouse: ReturnType<typeof tradingHouseFactory>,
  buildings: ReturnType<typeof buildingsFactory>,
  roles: ReturnType<typeof rolesFactory>,
  playerBoards: ReturnType<typeof playerBoardsFactory>,
  round: ReturnType<typeof roundFactory>,
  display: ReturnType<typeof displayFactory>,
}

export type ApplicationState = {[reducerKey in keyof ReducersMap]: ReturnType<ReducersMap[reducerKey]>}

function playerNamesValid (playerNames: string[]) {
  const allNamesAreUnique = new Set(playerNames).size === playerNames.length
  const allNamesHaveLengthOfOneOrMore = playerNames.filter(Boolean).length === playerNames.length
  return allNamesAreUnique && allNamesHaveLengthOfOneOrMore
}

export function ricoGameReducers (playerNames: string[]) {
  if (!playerNamesValid(playerNames)) {
    throw new Error(`Invalid game initialisation with player names: ${playerNames}`)
  }

  const players: Player[] = playerNames.map((playerName, playerId) => ({ playerName, playerId }))
  const numberOfPlayers = players.length

  const reducersMap: {[reducerKey in keyof ReducersMap]: (state: any, action: ReduxAction) => any } = {
    victoryPoints: victoryPointsFactory(numberOfPlayers),
    doubloons: doubloonsFactory(numberOfPlayers),
    colonists: colonistsFactory(numberOfPlayers),
    islandTiles: islandTilesFactory(numberOfPlayers),
    cargoShips: cargoShipsFactory(numberOfPlayers),
    goods: goodsFactory(numberOfPlayers),
    tradingHouse: tradingHouseFactory(numberOfPlayers),
    buildings: buildingsFactory(numberOfPlayers),
    roles: rolesFactory(numberOfPlayers),
    playerBoards: playerBoardsFactory(players),
    round: roundFactory(players),
    display: displayFactory(numberOfPlayers),
  }

  return combineReducers<ApplicationState>(reducersMap)
}

const simpleSelectors = {
  ...mapSubStateToSelectors<ApplicationState, typeof buildingSelectors>("buildings", buildingSelectors),
  ...mapSubStateToSelectors<ApplicationState, typeof playerBoardsSelectors>("playerBoards", playerBoardsSelectors),
  ...mapSubStateToSelectors<ApplicationState, typeof roundSelectors>("round", roundSelectors),
}

function doubloonCostForBuildingForPlayer (state: ApplicationState, args: { building: ShopBuilding, playerId: number }) {
  const { building, playerId } = args
  const activeQuarries = simpleSelectors.activeQuarriesForPlayerId(state, { playerId })
  return building!.cost - Math.min(building!.maxQuaries, activeQuarries)
}

function playerCanAffordBuilding (state: ApplicationState, args: { building: ShopBuilding, playerId: number }) {
  const playerBoard = simpleSelectors.playerBoardForPlayerId(state, { playerIdToFind: args.playerId })
  return doubloonCostForBuildingForPlayer(state, args) - playerBoard!.doubloons > 0
}

function getShopForPlayerId (state: ApplicationState, args: { playerId: number }): ShopBuildingForPlayer[] {
  const { playerId } = args
  const shopBuildings: ShopBuildingForPlayer[] = state.buildings
    .map(building => {
      const costForPlayer = doubloonCostForBuildingForPlayer(state, { building, playerId })
      const playersTurnToBuild = simpleSelectors.inBuilderPhase(state) && buildingCalcs.buildingHasSupply(building)
      const playerAbleToBuild = playersTurnToBuild && playerCanAffordBuilding(state, { building, playerId })

      return {
        ...building,
        playersTurnToBuild,
        playerAbleToBuild,
        costForPlayer,
      }
    })

  return shopBuildings
}

export const selectors = {
  ...simpleSelectors,
  getShopForPlayerId,
}
