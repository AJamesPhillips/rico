import * as React from 'react';

const RemoveColonist = ({
  onClick,
  visible,
  cropIndex
}) => {
  return (
    <span
      className="glyphicon glyphicon-minus"
      onClick={() => onClick(cropIndex)}
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default RemoveColonist;
