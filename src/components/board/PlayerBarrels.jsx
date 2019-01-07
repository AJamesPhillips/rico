import React from "react"
import "../../styles/PlayerBarrels.scss"

const PlayerBarrels = ({
  cropBarrels
}) => {

  const elements = Object.keys(cropBarrels).map(cropName => {
    return (
      <span key={cropName}>
        <span className={"glyphicon glyphicon-oil " + cropName} />
        <span>{cropBarrels[cropName]}</span>
      </span>
    )
  })
  return <div>{elements}</div>
}

export default PlayerBarrels
