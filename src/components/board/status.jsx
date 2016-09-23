import { connect } from 'react-redux';
import * as React from 'react';

const PlayerStatus = ({
  governor,
  isCurrentPlayer,
  isCurrentJobPlayer
}) => {
  return (
    <div>
      <p>{governor ? 'GOVERNOR' : ''}</p>
      <p>{isCurrentPlayer ? 'This player\'s turn' : ''}</p>
      <p>{isCurrentJobPlayer ? 'This player\'s job phase' : ''}</p>
    </div>
  )
};

export default PlayerStatus;
