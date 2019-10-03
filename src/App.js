import React from "react"
import Div100vh from "react-div-100vh"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Search from "./components/Search"
import User from "./components/User"
import "./App.scss"

function App() {
  return (
    <Div100vh>
      <main className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/:slug" component={User} />
          </Switch>
        </Router>
      </main>
    </Div100vh>
  )
}

export default App
