import * as React from 'react';
import { connect } from 'react-redux';
import PlayerStatus from './status';
import DoubloonCounter from './DoubloonCounter';
import PlayerBuildings from './PlayerBuildings';

import '../../styles/PlayerBoard.scss';

let PlayerBoard = ({
  board,
  governor,
  isCurrentPlayer,
  isCurrentJobPlayer
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
      <PlayerBuildings buildings={board.buildings || []} />
    </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  const currentPlayer = state.turns.find(p => p.currentPlayer) || {};
  const currentJobPlayer = state.jobTurns.find(p => p.currentJobPlayer) || {};

  return {
    governor: state.turns[0].playerID === ownProps.board.id,
    currentPlayer: currentPlayer.playerID === ownProps.board.id,
    currentJobPlayer: currentJobPlayer.playerID === ownProps.board.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

PlayerBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBoard);

export default PlayerBoard;
