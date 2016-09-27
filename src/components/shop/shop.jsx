import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Building from './Building';
import { resolvePurchase } from './service';
class Shop extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <div>
        <h2>Shop</h2>
        {
          state.buildings.map(building => {
            const disabled = !inBuildPhase(state) ||
                             !buildingHasSupply(building) ||
                             !playerCanAffordBuilding(state, building);
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
  }
}
Shop.contextTypes = {
  store: React.PropTypes.object
};

const inBuildPhase = (state) => {
  return state.jobTurns.find(player => player.currentJobPlayer) !== undefined;
};

const buildingHasSupply = (building) => {
  return building.supply > 0;
};

const playerCanAffordBuilding = (state, building) => {
  const cost = building.cost;
  const currentPlayer = state.turns.find(p => p.currentPlayer) || {};
  const player = state.boards.find(player => player.id === currentPlayer.playerID) || {};

  return player.doubloons >= cost;
};

export default Shop;
