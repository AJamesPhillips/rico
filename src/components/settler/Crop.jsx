import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import '../../styles/Crop.scss';

const Crop = ({
  crop,
  flopIndex,
  onClick,
  disabled
}) => {
  return (
    <Button
      onClick={() => onClick(crop, flopIndex)}
      className={crop + ' crop-flop'}
      disabled={disabled}
    >{crop}</Button>
  );
}

export default Crop;
