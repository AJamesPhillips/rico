import * as React from 'react';

const AddColonist = ({
  onClick,
  visible,
  tileIndex
}) => {
  return (
    <span
      className="glyphicon glyphicon-plus"
      onClick={() => onClick(tileIndex)}
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default AddColonist;
