import * as React from "react"
import { connect } from "react-redux"
import Building from "./Building"
import actions from "../../actions/index_original"
import { selectors } from "../../reducers"

const Shop = ({
  buildings,
  resolvePurchase
}) => {
  const buildingButtonHeight = 40
  const style = {
    display: "flex",
    height: buildingButtonHeight * 6 + (buildingButtonHeight - 1),
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  }
  return (
    <div>
      <h2>Shop</h2>
      <div style={style}>
        {
          buildings.map(building => {
            return (
              <Building
                key={building.name}
                styleHeight={buildingButtonHeight}
                name={building.name}
                cost={building.cost}
                costForPlayer={building.costForPlayer}
                playersTurnToBuild={building.playersTurnToBuild}
                playerAbleToBuild={building.playerAbleToBuild}
                supply={building.remainingCount + "/" + building.initialCount}
                onClick={() => resolvePurchase(building)}
              />
            )
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentActionPlayerId = selectors.getCurrentActionPlayerId(state)

  return {
    buildings: selectors.getShopForPlayerId(state, { playerId: currentActionPlayerId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resolvePurchase: (building) => {
      // dispatch(actions.addBuilding(building))
      // dispatch(actions.reduceBuildingSupply(building))

      // const currentJobPlayerID = state.jobTurns.find(t => t.currentJobPlayer).playerID
      // let discount = 0
      // // check if the buyer has the Builder privilege
      // if (state.jobs.find(job => job.title === "builder" && job.takenBy === currentJobPlayerID)) {
      //   discount = 1
      // }
      // // TODO: eventually check if the buyer has staffed quarries

      // dispatch(actions.modifyDoubloons(-building.cost + discount))

      // dispatch(actions.handleEndOfTurn())
    }
  }
}

const ConnectedShop = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop)

export default ConnectedShop
