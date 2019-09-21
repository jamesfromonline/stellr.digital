import React from "react"
import { StateProvider, initialState } from "./state"
import { rootReducer } from "./reducers"
import Div100vh from "react-div-100vh"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./components/Home"

function App() {
  return (
    <StateProvider initialState={initialState} reducer={rootReducer}>
      <Div100vh>
        <main className="app__wrapper">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </main>
      </Div100vh>
    </StateProvider>
  )
}

export default App
