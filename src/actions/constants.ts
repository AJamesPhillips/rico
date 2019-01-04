import { str_enum } from "@ajp/utils-ts/utils"

export type Action = {
  type: string
  [key: string]: any
}

export const ACTION_TYPES = str_enum(["REDUCE_BUILDING_SUPPLY"])
