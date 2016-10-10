import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';

const PassMayorButton = ({
  visible,
  onClick
}) => {
  return (
    <Button
      style={{display: visible ? 'inline' : 'none'}}
      onClick={onClick}
    >
      Pass mayor phase
    </Button>
  );
};

export default PassMayorButton;
