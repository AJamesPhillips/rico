import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Building from './Building';
import actions from '../../actions';

let Shop = ({
  buildings,
  onBuildingClick,
  inBuildPhase,
  buildingHasSupply,
  playerCanAffordBuilding
}) => {
  return (
    <div>
      <h2>Shop</h2>
      {
        buildings.map(building => {
          const disabled = !inBuildPhase() ||
                           !buildingHasSupply() ||
                           !playerCanAffordBuilding();
          return (
            <Building
              key={building.name}
              name={building.name}
              cost={building.cost}
              disabled={disabled}
              supply={building.supply + '/' + building.initialSupply}
              onClick={() => resolvePurchase(store, building)}
            />
          );
        })
      }
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
      return state.activeJob === 'settler';
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
      // eventually check if the buyer has staffed quarries

      dispatch(actions.modifyDoubloons(-building.cost + discount));

      dispatch(actions.handleEndOfTurn());
    }
  };
};

Shop = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Shop);

export default Shop;
