import { Action } from "../actions/constants"
import { CROP_TYPE, CROP_TYPES } from "../../decls/flowTypes"

export type IslandTilesState = {
  flop: CROP_TYPE[]
  inputPile: CROP_TYPE[]
  discardPile: CROP_TYPE[]
  quarries: number
}

function shuffleArray<E> (elements: E[]): E[] {
  return elements
    .map(e => ({ sortKey: Math.random(), e }))
    .sort((a, b) => a.sortKey < b.sortKey ? -1 : 1)
    .map(({ e }) => e)
}

// function testRandomness () {
//   const result = {
//     1: [0, 0, 0],
//     2: [0, 0, 0],
//     3: [0, 0, 0],
//   }

//   for (let i = 0; i < 1000000; ++i) {
//     const r = shuffleArray([1, 2, 3])
//     for (let j = 0; j < 3; ++j) {
//       result[r[j]][j] += 1;
//     }

//     if (i % 10000 === 0) console.log(i)
//   }

//   return result
// }

function makeFlop (numberOfPlayers: number, crops: CROP_TYPE[]): { flop: CROP_TYPE[], inputPile: CROP_TYPE[] } {
  const flop = crops.slice(0, numberOfPlayers + 1)
  const inputPile = crops.slice(numberOfPlayers + 1)
  return { flop, inputPile }
}

function FilledArray<E> (count: number, val: E) {
  return Array(count).toString().split(",").map(() => val)
}

export function islandTilesFactory (numberOfPlayers: number) {
  // remove 3 of each plantation including quarry
  const twoPlayerModifier = numberOfPlayers === 2 ? 3 : 0
  const initialCrops = [
    ...FilledArray(8 - twoPlayerModifier, CROP_TYPES.COFFEE),
    ...FilledArray(9 - twoPlayerModifier, CROP_TYPES.TOBACCO),
    ...FilledArray(10 - twoPlayerModifier, CROP_TYPES.CORN),
    ...FilledArray(11 - twoPlayerModifier, CROP_TYPES.SUGAR),
    ...FilledArray(12 - twoPlayerModifier, CROP_TYPES.INDIGO),
  ]
  const quarries = 8 - twoPlayerModifier
  const shuffledCrops = shuffleArray(initialCrops)

  const initialState: IslandTilesState = {
    ...makeFlop(numberOfPlayers, shuffledCrops),
    quarries,
    discardPile: []
  }

  return function islandTiles (state: IslandTilesState = initialState, action: Action): IslandTilesState {
    return state
  }
}
