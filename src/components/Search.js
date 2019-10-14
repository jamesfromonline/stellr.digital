import React, { useState } from "react"
import { useStateValue } from "../state"
import { withRouter } from "react-router-dom"
import SearchForm from "./shared/SearchForm"
import SearchButton from "./shared/SearchButton"
import Logo from "./shared/Logo"

const Search = props => {
  const [{ animations, isLoading }, dispatch] = useStateValue(),
    [errorMessage, setErrorMessage] = useState(""),
    [error, setError] = useState(false),
    [input, setInput] = useState("")

  const startAnimations = () => {
    dispatch({
      type: "animation",
      payload: {
        ...animations,
        search: "animate__out--left",
        user: "animate__in--left"
      }
    })
  }

  const fetchInstagramUser = async username => {
    const url = `http://167.99.121.93:5000/instagram?username=${username}`
    // const url = `http://localhost:5000/instagram?username=${username}`
    try {
      const data = await fetch(url),
        json = await data.json()
      dispatch({ type: "user", payload: json })
      setError(false)
      setErrorMessage("")
      startAnimations()
      setTimeout(() => {
        props.history.push(username)
        dispatch({ type: "loading", payload: false })
      }, 500)
    } catch (e) {
      dispatch({ type: "loading", payload: false })
      setError(true)
      setErrorMessage(`Can't find that username. Did you spell it correctly?`)
      console.error(`User ${username} not found.`)
    }
  }

  const handleSearch = () => {
    dispatch({ type: "loading", payload: true })
    setError(false)
    setErrorMessage("")
    if (input.length > 0) {
      fetchInstagramUser(input.toLowerCase())
    } else {
      dispatch({ type: "loading", payload: false })
      setError(true)
      setErrorMessage("You must enter at least 1 character")
    }
  }

  const handleChange = e => setInput(e.target.value)

  const errorClass = error
    ? "search__error search__error--active"
    : "search__error"

  return (
    <section className={`search ${animations.search}`}>
      <Logo />
      <div className="search__container">
        <SearchForm handleChange={handleChange} handleSearch={handleSearch} />
        <SearchButton
          error={error}
          setError={setError}
          isLoading={isLoading}
          handleSearch={handleSearch}
        />
        <p className={errorClass}>{errorMessage}</p>
      </div>
    </section>
  )
}

export default withRouter(Search)
