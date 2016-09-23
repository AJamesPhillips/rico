import * as React from 'react';

const fillEmptyBuildingSpaces = (buildingCount) => {
  let emptySpaces = [];
  for (var i = buildingCount; i < 12; i++) {
    emptySpaces.push('nothing here!');
  }

  return emptySpaces;
};

const PlayerBuildings = ({
  buildings
}) => {
  return (
    <Row>
      {buildings.map(building =>
        <Col
          key={building.name}
          sm={3}
          className="occupied-building-space">
          {building.name}
        </Col>
      )}
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
