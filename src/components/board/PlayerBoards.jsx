import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PlayerBoard from './PlayerBoard';
import actions from '../../actions';

let PlayerBoards = ({
  activeTab,
  boards,
  onTabSelect
}) => {
  return (
    <Tabs
      activeKey={activeTab}
      id={'0'}
      onSelect={onTabSelect}
      >
      {boards.map((board, index) =>
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

const mapStateToProps = (state) => {
  return {
    activeTab: state.boards.findIndex(p => p.active),
    boards: state.boards
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabSelect: (index) => {
      dispatch(actions.updateActivePlayer(index));
    }
  };
}

PlayerBoards = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBoards);

export default PlayerBoards;
