import React, { createContext, useContext, useReducer } from "react"

export const StateContext = createContext()

export const initialState = {
  user: {},
  posts: {
    count: 0,
    posts: [],
    page_info: {}
  },
  isLoading: false,
  animations: {
    search: "animate__fade-in",
    user: null
  }
}

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
