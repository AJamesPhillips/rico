import * as React from 'react';

const RemoveColonist = ({
  onClick,
  visible
}) => {
  return (
    <span
      className="glyphicon glyphicon-minus"
      onClick={onClick}
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default RemoveColonist;
