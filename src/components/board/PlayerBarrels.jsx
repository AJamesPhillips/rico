import React from 'react';
import '../../styles/PlayerBarrels.scss';

const PlayerBarrels = ({
  barrels
}) => {

  const elements = Object.keys(barrels).map(b => {
    return (
      <span
        key={b}
      >
        <span
          className={"glyphicon glyphicon-oil " + b}
        />
        <span>{barrels[b]}</span>
      </span>
    );
  })
  return <div>{elements}</div>;
};

export default PlayerBarrels;
