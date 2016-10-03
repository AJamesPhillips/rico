import * as React from 'react';

const AddColonist = ({
  onClick,
  visible
}) => {
  return (
    <span
      class="glyphicon glyphicon-plus"
      onClick={onClick}
      style={{display: visible}}
    ></span>
  );
};

export default AddColonist;
