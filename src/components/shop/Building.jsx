import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';

const Building = ({name, cost, disabled, supply, onClick}) => {
  return (
    <Button
      bsStyle="primary"
      onClick={onClick}
      disabled={disabled}>{name + ' (' + cost + ')' + ' - ' + supply}</Button>
  );
};

export default Building;
