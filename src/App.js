import React from "react"
import Div100vh from "react-div-100vh"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useStateValue } from "./state"
import Home from "./components/Home"
import Background from "./components/Background"
import User from "./components/User"
import "./App.scss"

function App() {
  const [{ animations }] = useStateValue()
  return (
    <Div100vh>
      <main className="app">
        <Background />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:slug" component={User} />
          </Switch>
        </Router>
      </main>
    </Div100vh>
  )
}

export default App
