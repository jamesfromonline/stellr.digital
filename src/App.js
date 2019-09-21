import React, { useEffect } from 'react'
import { StateProvider, initialState } from "./state"
import { rootReducer } from "./reducers"
import Div100vh from 'react-div-100vh'
import Home from './components/home'

function App() {

  return (
    <StateProvider initialState={initialState} reducer={rootReducer}>
      <Div100vh>
        <main className="app__wrapper">
          <Home />
        </main>
      </Div100vh>
    </StateProvider>
  )
}

export default App;
