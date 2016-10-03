import * as React from 'react';

const Colonist = ({
  visible
}) => {
  return (
    <span
      class="glyphicon glyphicon-user"
      style={{display: visible}}
    ></span>
  );
};

export default Colonist;
