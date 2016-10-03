import * as React from 'react';

const RemoveColonist = ({
  onClick,
  visible
}) => {
  return (
    <span
      class="glyphicon glyphicon-minus"
      onClick={onClick}
      style={{display: visible}}
    ></span>
  );
};

export default RemoveColonist;
