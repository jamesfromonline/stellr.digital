import React, { createContext, useContext, useReducer } from "react"

export const StateContext = createContext()

export const initialState = {
  user: {},
  animations: {
    background: {
      nebula: {
        one: "",
        two: "",
        three: ""
      },
      landscape: {
        one: "",
        two: "",
        three: ""
      },
      clouds: {
        one: "",
        two: ""
      }
    },
    home: null,
    user: null
  }
}

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
