import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { jobHasResolved } from './jobs';

const Building = ({name, cost, disabled, supply, onClick}) => {
  return (
    <Button
      bsStyle="primary"
      onClick={onClick}
      disabled={disabled}>{name + ' (' + cost + ')' + ' - ' + supply}</Button>
  );
};

class Shop extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Panel>
      <h2>Ye Olde Colonial Shoppe</h2>
      {state.buildings.map(building => {
        return (
          <Building
            name={building.name}
            cost={building.cost}
            key={building.name}
            disabled={state.jobTurns.find(player => player.currentJobPlayer) === undefined
                   || state.buildings.find(stateBuilding => stateBuilding.name === building.name).supply <= 0
                  /* TODO: refactor the fuck out of this vvvv */
                   || state.boards.find(player => player.id === state.turns.find(playerTurn => playerTurn.currentPlayer).playerID).doubloons <= building.cost}
            supply={building.supply + '/' + building.initialSupply}
            onClick={() => resolvePurchase(building, store)}
            />
        );
      })}
      <Button
        bsStyle="default"
        onClick={() => resolvePurchase(null, store)}
        disabled={state.jobTurns.find(player => player.currentJobPlayer) === undefined}
      >Pass
      </Button>
      </Panel>
    );
  }
}
Shop.contextTypes = {
  store: React.PropTypes.object
};


const resolvePurchase = (building, store) => {
  const state = store.getState();
  const currentJobPlayerIndex = state.jobTurns.findIndex(player => player.currentJobPlayer);
  const currentJobPlayerID = state.jobTurns.find(player => player.currentJobPlayer).playerID;
  const currentJobPlayer = state.boards.find(player => player.id === currentJobPlayerID);

  if (building !== null) {
    // make sure they can afford it
    if (building.cost > currentJobPlayer.doubloons) {
      alert("Can not afford that");
      return false;
    }

    if (currentJobPlayer.buildings.find(ownedBuilding => ownedBuilding.name === building.name) !== undefined) {
      alert("You already own this building");
      return false;
    }

    if (building.supply === 0) {
      alert("No more copies of this building can be purchased.");
      return false;
    }

    store.dispatch({
      type: 'ADD_BUILDING',
      currentJobPlayerID,
      building
    });

    store.dispatch({
      type: 'REDUCE_BUILDING_SUPPLY',
      building
    });

    let discount = 0;
    // if the current player is the one that picked the build job, grant them the discount
    if (state.jobs.find(job => job.title === 'builder' && job.takenBy === currentJobPlayerID) !== undefined) {
      discount = 1;
    }

    store.dispatch({
      type: 'MODIFY_DOUBLOONS',
      id: currentJobPlayerID,
      doubloons: -building.cost + discount
    });
  }

  store.dispatch({
    type: 'NEXT_JOB_TURN',
    currentJobPlayerIndex
  });

  if (currentJobPlayerIndex + 1 === store.getState().jobTurns.length) {
    jobHasResolved(store);
  }
  else {
    store.dispatch({
      type: 'UPDATE_ACTIVE_PLAYER_TAB',
      key: store.getState().boards.findIndex(player => store.getState().jobTurns.find(player => player.currentJobPlayer).playerID === player.id)
    });
  }
};

export { Shop }
