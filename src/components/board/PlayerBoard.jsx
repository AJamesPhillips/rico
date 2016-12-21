import * as React from 'react';
import { connect } from 'react-redux';
import PlayerStatus from './status';
import DoubloonCounter from './DoubloonCounter';
import PlayerBuildings from './PlayerBuildings';
import PlayerCrops from './PlayerCrops';
import PlayerBarrels from './PlayerBarrels';
import PassMayorButton from './PassMayorButton';
import actions from '../../actions';
import '../../styles/PlayerBoard.scss';

let PlayerBoard = ({
  board,
  governor,
  isCurrentPlayer,
  isCurrentJobPlayer,
  mayorPhase,
  yourBoard,
  onPlaceColonistCrop,
  onRemoveColonistCrop,
  onPlaceColonistBuilding,
  onRemoveColonistBuilding,
  onPassMayorClick
}) => {
  return (
    <div className="player-board">
      <PlayerStatus
        playerID={board.id}
        governor={governor}
        isCurrentPlayer={isCurrentPlayer}
        isCurrentJobPlayer={isCurrentJobPlayer}
      />
      <DoubloonCounter doubloons={board.doubloons} />
      <p>{board.unallocatedColonists + ' Unallocated colonists'}</p>
      <PlayerBarrels
        barrels={board.barrels}
      />
      <PlayerBuildings
        buildings={board.buildings || []}
        canPlaceColonists={mayorPhase && yourBoard}
        onPlaceColonist={onPlaceColonistBuilding}
        onRemoveColonist={onRemoveColonistBuilding}
      />
      <PlayerCrops
        crops={board.crops || []}
        canPlaceColonists={mayorPhase && yourBoard}
        onPlaceColonist={onPlaceColonistCrop}
        onRemoveColonist={onRemoveColonistCrop}
      />
      <PassMayorButton
        visible={mayorPhase && yourBoard}
        onClick={onPassMayorClick}
      />
    </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  const currentPlayer = state.turns.find(p => p.currentPlayer) || {};
  const currentJobPlayer = state.jobTurns.find(p => p.currentJobPlayer) || {};
  const currentPlayerBoardIndex = state.boards.findIndex(p => p.id === currentPlayer.playerID);
  return {
    governor: state.turns[0].playerID === ownProps.board.id,
    isCurrentPlayer: currentPlayer.playerID === ownProps.board.id,
    isCurrentJobPlayer: currentJobPlayer.playerID === ownProps.board.id,
    mayorPhase: state.activeJob === 'mayor',
    yourBoard: !!state.boards.find(p => p.active && p.id === currentJobPlayer.playerID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlaceColonistCrop: (cropIndex) => {
      dispatch(actions.addColonistToCrop(cropIndex));
    },
    onRemoveColonistCrop: (cropIndex) => {
      dispatch(actions.removeColonistFromCrop(cropIndex))
    },
    onPlaceColonistBuilding: (buildingIndex) => {
      console.log(buildingIndex);
      dispatch(actions.addColonistToBuilding(buildingIndex));
    },
    onRemoveColonistBuilding: (buildingIndex) => {
      dispatch(actions.removeColonistFromBuilding(buildingIndex))
    },
    onPassMayorClick: () => {
      dispatch(actions.handleEndOfTurn());
    }
  };
};

PlayerBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBoard);

export default PlayerBoard;
