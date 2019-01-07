import * as React from "react"
import Button from "react-bootstrap/lib/Button"

const Building = ({ name, cost, costForPlayer, playersTurnToBuild, playerAbleToBuild, supply, onClick, styleHeight }) => {
  const styleCostForPlayer = playersTurnToBuild
    ? { color: playerAbleToBuild ? "LimeGreen" : "Crimson" }
    : { display: "none" }

  return (
    <Button
      style={{ height: styleHeight, width: 200 }}
      bsStyle="primary"
      onClick={onClick}
      disabled={!playerAbleToBuild}
    >
      {name} ({cost}) <span style={styleCostForPlayer}>({costForPlayer})</span> - {supply}
    </Button>
  );
};

export default Building;
