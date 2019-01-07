import * as React from "react"

const PlayerStatus = ({
  governor,
  isCurrentRolePickingPlayer,
  isCurrentActionTakingPlayer
}) => {
  return (
    <div style={{ paddingLeft: "2px", fontWeight: "bold" }}>
      {governor && <p>GOVERNOR</p>}
      {isCurrentRolePickingPlayer && <p>This player's turn to pick a role</p>}
      {isCurrentActionTakingPlayer && <p>This player's turn to take their action</p>}
    </div>
  )
}

export default PlayerStatus
