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
      className={crop + ' crop'}
      disabled={disabled}
    />
  );
}

export default Crop;
