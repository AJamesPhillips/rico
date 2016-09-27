import * as React from 'react';
import { connect } from 'react-redux';
import Crop from './Crop';

let Flop = ({
  flop,
  onCropClick
}) => {
  return (
    <div>
      <h2>Crop Flop</h2>
      {
        flop.map((crop, index) => {
          return (
            <Crop
              key={index}
              crop={crop}
              flopIndex={index}
              onClick={onCropClick}
            />
          )
        })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    flop: state.crops.flop
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCropClick: (crop, flopIndex) => {
      dispatch({
        type: 'TAKE_FROM_FLOP',
        flopIndex
      });

      dispatch({
        type: 'ADD_CROP',
        crop
      });
    }
  };
};

Flop = connect(
  mapStateToProps,
  mapDispatchToProps
)(Flop);

export default Flop;

