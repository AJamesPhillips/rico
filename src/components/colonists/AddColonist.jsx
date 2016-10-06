import * as React from 'react';

const AddColonist = ({
  onClick,
  visible,
  cropIndex
}) => {
  return (
    <span
      className="glyphicon glyphicon-plus"
      onClick={() => onClick(cropIndex)}
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default AddColonist;
