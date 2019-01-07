import * as React from "react"
import { connect } from "react-redux"
import Tabs from "react-bootstrap/lib/Tabs"
import Tab from "react-bootstrap/lib/Tab"
import PlayerBoard from "./PlayerBoard"
import actions from "../../actions"

const PlayerBoards = ({
  selectedPlayerBoardIndex,
  playerBoards,
  onTabSelect
}) => {
  return (
    <Tabs
      activeKey={selectedPlayerBoardIndex}
      id={"0"}
      onSelect={onTabSelect}
      >
      {playerBoards.map((board, index) =>
        <Tab
          key={board.playerId}
          title={board.playerName + ""}
          eventKey={index}
          >
          <PlayerBoard
            board={board} />
        </Tab>
      )}
    </Tabs>
  )
}

const mapStateToProps = (state) => {
  return {
    playerBoards: state.playerBoards,
    selectedPlayerBoardIndex: state.display.selectedPlayerBoardIndex,
  }
}

const mapDispatchToProps = {
  onTabSelect: actions.updateSelectedPlayerBoardIndex
}

const ConnectedPlayerBoards = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBoards)

export default ConnectedPlayerBoards
