import * as React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Colonist from '../colonists/Colonist';
import AddColonist from '../colonists/AddColonist';
import RemoveColonist from '../colonists/RemoveColonist';

const fillEmptyBuildingSpaces = (buildingCount) => {
  let emptySpaces = [];
  for (var i = buildingCount; i < 12; i++) {
    emptySpaces.push('nothing here!');
  }

  return emptySpaces;
};

const PlayerBuildings = ({
  buildings,
  canPlaceColonists,
  onPlaceColonist,
  onRemoveColonist
}) => {
  return (
    <Row>
      <p style={{ paddingLeft: "20px", fontWeight: "bold" }}>Buildings</p>
      {
        buildings.map((building, index) =>
          <Col
            key={building.name}
            sm={3}
            className="occupied-building-space">
            {building.name}
            {/* TODO: handle buildings with >1 colonists */}
            <Colonist
              visible={building.colonists[0]}
            />
            <AddColonist
              visible={canPlaceColonists && !building.colonists[0]}
              onClick={onPlaceColonist}
              tileIndex={index}
            />
            <RemoveColonist
              visible={canPlaceColonists && building.colonists[0]}
              onClick={onRemoveColonist}
              tileIndex={index}
            />
          </Col>
        )
      }
      {
        // print out empty columns for leftover spaces
        fillEmptyBuildingSpaces(buildings.length).map((space, index) => {
          return (
            <Col
              key={index}
              sm={3}
              className="empty-building-space">
              Empty
            </Col>
          )
        })
      }
    </Row>
  );
};

export default PlayerBuildings;
