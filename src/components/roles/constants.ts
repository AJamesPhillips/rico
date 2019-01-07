import { ROLE_TITLE, ROLE_TITLES } from "../../../decls/flowTypes"

interface Descriptions {
  action: string
  privilege: string
}

export const ROLE_TITLE_TO_DESCRIPTIONS: {[roleTitle in ROLE_TITLE]: Descriptions} = {
  [ROLE_TITLES.Settler]: {
    action: "each player takes and places a plantation tile",
    privilege: "the settler may take and place a quarry instead"
  },
  [ROLE_TITLES.Mayor]: {
    action: "each player takes and places one colonist in turn order",
    privilege: "the mayor may take one additional colonist"
  },
  [ROLE_TITLES.Builder]: {
    action: "each player may build one building",
    privilege: "builder pay 1 less doubloon"
  },
  [ROLE_TITLES.Craftsman]: {
    action: "all players takes good cases from the supply",
    privilege: "craftsman takes one case more"
  },
  [ROLE_TITLES.Trader]: {
    action: "each player may sell at most one case",
    privilege: "trader takes 1 doubloon more with their sale"
  },
  [ROLE_TITLES.Captain]: {
    action: "players must load cases on the cargo ships",
    privilege: "captain takes 1 VP more"
  },
  [ROLE_TITLES.Prospector]: {
    action: "none!",
    privilege: "1 doubloon from the bank"
  },
}
