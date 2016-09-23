import { connect } from 'react-redux';
import * as React from 'react';

// TODO: I think PlayerBoard needs to be a container component, not this
let PlayerStatus = ({
  governor,
  currentPlayer,
  currentJobPlayer
}) => {
  return (
    <div>
      <p>{governor ? 'GOVERNOR' : ''}</p>
      <p>{currentPlayer ? 'This player\'s turn' : ''}</p>
      <p>{currentJobPlayer ? 'This player\'s job phase' : ''}</p>
    </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  const currentPlayer = state.turns.find(p => p.currentPlayer) || {};
  const currentJobPlayer = state.jobTurns.find(p => p.currentJobPlayer) || {};

  return {
    governor: state.turns[0].playerID === ownProps.playerID,
    currentPlayer: currentPlayer.playerID === ownProps.playerID,
    currentJobPlayer: currentJobPlayer.playerID === ownProps.playerID
  };
};

PlayerStatus = connect(
  mapStateToProps,
  null
)(PlayerStatus);

export default PlayerStatus;
