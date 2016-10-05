import * as React from 'react';

const AddColonist = ({
  onClick,
  visible
}) => {
  return (
    <span
      class="glyphicon glyphicon-plus"
      onClick={onClick}
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default AddColonist;
