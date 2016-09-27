import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PlayerBoard from './PlayerBoard';

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

    return (
      <Tabs
        activeKey={state.boards.findIndex(p => p.active)}
        id={'0'}
        onSelect={(index) => {
          store.dispatch({
            type: 'UPDATE_ACTIVE_PLAYER',
            index
          });
        }}
        >
        {state.boards.map((board, index) =>
          <Tab
            key={board.name}
            title={board.name}
            eventKey={index}>
            <PlayerBoard
              board={board} />
          </Tab>
        )}
      </Tabs>
    );
  }
}
PlayerBoards.contextTypes = {
  store: React.PropTypes.object
};

export default PlayerBoards;
