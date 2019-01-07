import * as React from "react"
import { connect } from "react-redux"
import PlayerStatus from "./status"
import PlayerBuildings from "./PlayerBuildings"
import PlayerCrops from "./PlayerCrops"
import PlayerBarrels from "./PlayerBarrels"
import PassMayorButton from "./PassMayorButton"
import actions from "../../actions/index_original"
import "../../styles/PlayerBoard.scss"

const PlayerBoard = ({
  board,
  governor,
  isCurrentRolePickingPlayer,
  isCurrentActionTakingPlayer,
  mayorPhase,
  onPlaceColonistCrop,
  onRemoveColonistCrop,
  onPlaceColonistBuilding,
  onRemoveColonistBuilding,
  onPassMayorClick
}) => {
  return (
    <div className="player-board">
      <PlayerStatus
        governor={governor}
        isCurrentRolePickingPlayer={isCurrentRolePickingPlayer}
        isCurrentActionTakingPlayer={isCurrentActionTakingPlayer}
      />
      <p>Doubloons: {board.doubloons}</p>
      <p>Unallocated colonists: {board.unallocatedColonists}</p>
      <PlayerBarrels cropBarrels={board.cropBarrels} />
      <PlayerBuildings
        buildings={board.buildings || []}
        canPlaceColonists={mayorPhase && isCurrentActionTakingPlayer}
        onPlaceColonist={onPlaceColonistBuilding}
        onRemoveColonist={onRemoveColonistBuilding}
      />
      <PlayerCrops
        crops={board.crops || []}
        canPlaceColonists={mayorPhase && isCurrentActionTakingPlayer}
        onPlaceColonist={onPlaceColonistCrop}
        onRemoveColonist={onRemoveColonistCrop}
      />
      <PassMayorButton
        visible={mayorPhase && isCurrentActionTakingPlayer}
        onClick={onPassMayorClick}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { govenorPlayerId, currentRolePlayerId, currentRoleId, currentActionPlayerId } = state.round
  const { playerId } = ownProps.board
  // const currentJobPlayer = state.jobTurns.find(p => p.currentJobPlayer) || {}
  // const currentPlayerBoardIndex = state.boards.findIndex(p => p.id === currentPlayer.playerID)
  return {
    governor: govenorPlayerId === playerId,
    isCurrentRolePickingPlayer: currentRolePlayerId === playerId && currentRoleId === undefined,
    isCurrentActionTakingPlayer: currentActionPlayerId === playerId,
    mayorPhase: state.activeJob === "mayor",
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlaceColonistCrop: (cropIndex) => {
      dispatch(actions.addColonistToCrop(cropIndex))
    },
    onRemoveColonistCrop: (cropIndex) => {
      dispatch(actions.removeColonistFromCrop(cropIndex))
    },
    onPlaceColonistBuilding: (buildingIndex) => {
      console.log(buildingIndex)
      dispatch(actions.addColonistToBuilding(buildingIndex))
    },
    onRemoveColonistBuilding: (buildingIndex) => {
      dispatch(actions.removeColonistFromBuilding(buildingIndex))
    },
    onPassMayorClick: () => {
      dispatch(actions.handleEndOfTurn())
    }
  }
}

const ConnectedPlayerBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBoard)

export default ConnectedPlayerBoard
