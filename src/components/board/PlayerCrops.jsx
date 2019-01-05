import * as React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Colonist from '../colonists/Colonist';
import AddColonist from '../colonists/AddColonist';
import RemoveColonist from '../colonists/RemoveColonist';

const fillEmptyCropSpaces = (buildingCount) => {
  let emptySpaces = [];
  for (var i = buildingCount; i < 12; i++) {
    emptySpaces.push('nothing here!');
  }

  return emptySpaces;
};

const PlayerCrops = ({
  crops,
  canPlaceColonists,
  onPlaceColonist,
  onRemoveColonist
}) => {
  return (
    <Row>
      <p style={{ paddingLeft: "20px", fontWeight: "bold" }}>Crops</p>
      {
        crops.map((crop,index) =>
          <Col
            key={index}
            sm={4}
            className="occupied-crop-space">
            {crop.name}
            <Colonist
              visible={crop.colonists[0]}
            />
            <AddColonist
              visible={canPlaceColonists && !crop.colonists[0]}
              onClick={onPlaceColonist}
              tileIndex={index}
            />
            <RemoveColonist
              visible={canPlaceColonists && crop.colonists[0]}
              onClick={onRemoveColonist}
              tileIndex={index}
            />
          </Col>
        )
      }
      {
        // print out empty columns for leftover spaces
        fillEmptyCropSpaces(crops.length).map((space, index) => {
          return (
            <Col
              key={index}
              sm={4}
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
