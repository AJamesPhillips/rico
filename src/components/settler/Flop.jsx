import * as React from "react"
import { connect } from "react-redux"
import Crop from "./Crop"
import actions from "../../actions/index_original"
import { selectors } from "../../reducers"

const Flop = ({
  flop,
  onCropClick,
  settlerPhase
}) => {
  return (
    <div style={{ backgroundColor: "#DDD" }}>
      <h2>Crop Flop</h2>
      {
        flop.map((crop, index) => {
          return (
            <Crop
              key={index}
              crop={crop}
              flopIndex={index}
              onClick={onCropClick}
              disabled={!settlerPhase}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    flop: state.islandTiles.flop,
    settlerPhase: selectors.inSettlerPhase(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCropClick: (crop, flopIndex) => {
      dispatch(actions.takeFromFlop(flopIndex))

      dispatch(actions.addCrop(crop))

      dispatch(actions.handleEndOfTurn())
    }
  }
}

const ConnectedFlop = connect(
  mapStateToProps,
  mapDispatchToProps
)(Flop)

export default ConnectedFlop

