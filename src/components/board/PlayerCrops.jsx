import * as React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const fillEmptyCropSpaces = (buildingCount) => {
  let emptySpaces = [];
  for (var i = buildingCount; i < 12; i++) {
    emptySpaces.push('nothing here!');
  }

  return emptySpaces;
};

const PlayerCrops = ({
  crops
}) => {
  return (
    <Row>
      <p style={{paddingLeft: '20px'}}>Crops</p>
      {
        crops.map((crop,index) =>
          <Col
            key={index}
            sm={3}
            className="occupied-crop-space">
            {crop.name}
          </Col>
        )
      }
      {
        // print out empty columns for leftover spaces
        fillEmptyCropSpaces(crops.length).map((space, index) => {
          return (
            <Col
              key={index}
              sm={3}
              className="empty-crop-space">
              Empty
            </Col>
          )
        })
      }
    </Row>
  );
};

export default PlayerCrops;
