import * as React from 'react';
import { connect } from 'react-redux';
import PlayerStatus from './status';
import DoubloonCounter from './doubloons';

import '../../styles/PlayerBoard.scss';

const PlayerBoard = ({
  board
}) => {
  return (
    <div className="player-board">
      <PlayerStatus playerID={board.id} />
      <DoubloonCounter doubloons={board.doubloons} />
    </div>
  )
};

export default PlayerBoard;
