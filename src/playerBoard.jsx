import { createStore, combineReducers } from 'redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './styles/PlayerBoard.scss';

const DoubloonCounter = ({
  doubloons
}) => {
  return (
    <span>Doubloons: {doubloons}</span>
  );
}

const PlayerBoard = ({
  board,
  currentPlayer,
  currentJobPlayer,
  governor
}) => {
  return (
    <div className="player-board">
      <p>{governor ? 'GOVERNOR' : ''}</p>
      <p>{currentPlayer() ? 'This player\'s turn' : ''}</p>
      <p>{currentJobPlayer() ? 'This player\'s job phase' : ''}</p>
      {/*<p>{board.currentJobPlayer ? 'This player\'s job' : ''}</p>*/}
      <p>{board.name}</p>
      <DoubloonCounter doubloons={board.doubloons} />
      <Row>
        {board.buildings.map(building =>
          <Col
            key={building.name}
            sm={3}
            className="occupied-building-space">
            {building.name}
          </Col>
        )}
        {
          // print out empty columns for leftover spaces
          fillEmptyBuildingSpaces(board.buildings.length).map((space, index) => {
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
    </div>
  );
}

const fillEmptyBuildingSpaces = (buildingCount) => {
  let emptySpaces = [];
  for (var i = buildingCount; i < 12; i++) {
    emptySpaces.push('nothing here!');
  }

  return emptySpaces;
}

class PlayerBoards extends React.Component {
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
    const currentPlayer = state.turns.find(player => player.currentPlayer);
    const currentJobPlayer = state.jobTurns.find(player => player.currentJobPlayer);

    return (
      <Tabs
        activeKey={state.activePlayerTab}
        onSelect={(key) => {
          store.dispatch({
            type: 'UPDATE_ACTIVE_PLAYER_TAB',
            key
          });
        }}
        >
        {state.boards.map((board, index) =>
          <Tab
            key={board.name}
            title={board.name + (currentPlayer.playerID === board.id ? '*' : '')}
            eventKey={index}>
            <PlayerBoard
              board={board}
              currentPlayer={() => {
                let yourTurn = false;
                if (currentPlayer !== undefined) {
                  yourTurn = currentPlayer.playerID === board.id;
                }
                return yourTurn;
              }}
              currentJobPlayer={() => {
                let yourTurn = false;
                if (currentJobPlayer !== undefined) {
                  yourTurn = currentJobPlayer.playerID === board.id;
                }
                return yourTurn;
              }}
              governor={state.turns[0].playerID === board.id} />
          </Tab>
        )}
      </Tabs>
    );
  }
}
PlayerBoards.contextTypes = {
  store: React.PropTypes.object
};

export { PlayerBoards }
