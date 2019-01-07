import { createStore, applyMiddleware } from "redux"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"

import PlayerBoards from "./components/board/PlayerBoards"
import Roles from "./components/roles/Roles"
import Shop from "./components/shop/Shop"
import Flop from "./components/settler/Flop"

import { ricoGameReducers } from "./reducers/index"

const RicoApp = () => {
  return (
    <div>
      <Roles />
      <PlayerBoards />
      <Shop />
      <Flop />
    </div>
  )
}

const store = createStore(
  ricoGameReducers(["kyle", "hannah", "rob"]),
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware
  )
)

ReactDOM.render(
  <Provider store={store} >
    <RicoApp />
  </Provider>,
  document.getElementById("root")
)
