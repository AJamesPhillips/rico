import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Building from './Building';
import actions from '../../actions';

const Shop = ({
  buildings,
  onBuildingClick,
  inBuildPhase,
  buildingHasSupply,
  playerCanAffordBuilding,
  resolvePurchase
}) => {
  const buildingButtonHeight = 40;
  const style = {
    display: "flex",
    height: buildingButtonHeight * 6 + (buildingButtonHeight - 1),
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  }
  return (
    <div>
      <h2>Shop</h2>
      <div style={style}>
        {
          buildings.map(building => {
            const disabled = !inBuildPhase() ||
                            !buildingHasSupply(building) ||
                            !playerCanAffordBuilding(building);
            return (
              <Building
                key={building.name}
                styleHeight={buildingButtonHeight}
                name={building.name}
                cost={building.cost}
                disabled={disabled}
                supply={building.remainingCount + '/' + building.initialCount}
                onClick={() => resolvePurchase(building)}
              />
            );
          })
        }
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {state};
};

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
};

const mergeProps = ({state}, {dispatch}) => {
  return {
    buildings: state.buildings,
    inBuildPhase: () => {
      return state.activeJob === 'builder';
    },
    buildingHasSupply: (building) => {
      return building.supply > 0;
    },
    playerCanAffordBuilding: (building) => {
      const cost = building.cost;
      const currentPlayer = state.turns.find(p => p.currentPlayer) || {};
      const player = state.boards.find(player => player.id === currentPlayer.playerID) || {};

      return player.doubloons >= cost;
    },
    resolvePurchase: (building) => {
      dispatch(actions.addBuilding(building));
      dispatch(actions.reduceBuildingSupply(building));

      const currentJobPlayerID = state.jobTurns.find(t => t.currentJobPlayer).playerID;
      let discount = 0;
      // check if the buyer has the Builder privilege
      if (state.jobs.find(job => job.title === 'builder' && job.takenBy === currentJobPlayerID)) {
        discount = 1;
      }
      // TODO: eventually check if the buyer has staffed quarries

      dispatch(actions.modifyDoubloons(-building.cost + discount));

      dispatch(actions.handleEndOfTurn());
    }
  };
};

const ConnectedShop = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Shop)

export default ConnectedShop
