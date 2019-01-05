import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';

const Building = ({ name, cost, disabled, supply, onClick, styleHeight }) => {
  return (
    <Button
      style={{ height: styleHeight, width: 200 }}
      bsStyle="primary"
      onClick={onClick}
      disabled={disabled}>{name + ' (' + cost + ')' + ' - ' + supply}</Button>
  );
};

export default Building;
