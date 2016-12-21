import * as React from 'react';

const RemoveColonist = ({
  onClick,
  visible,
  tileIndex
}) => {
  return (
    <span
      className="glyphicon glyphicon-minus"
      onClick={() => onClick(tileIndex)}
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default RemoveColonist;
