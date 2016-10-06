import * as React from 'react';

const Colonist = ({
  visible
}) => {
  return (
    <span
      className="glyphicon glyphicon-user"
      style={{display: visible ? 'inline' : 'none'}}
    ></span>
  );
};

export default Colonist;
