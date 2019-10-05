import React, { useRef, useState } from "react"
import { withRouter } from "react-router-dom"
import SearchForm from "./shared/SearchForm"
import SearchButton from "./searchButton"
import { useStateValue } from "../state"

const Search = props => {
  const [{ animations }, dispatch] = useStateValue(),
    [errorMessage, setErrorMessage] = useState(""),
    [error, setError] = useState(false),
    igSearch = useRef(null)

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
      await dispatch({ type: "user", payload: json })
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

  const handleSearch = input => {
    dispatch({ type: "loading", payload: true })
    setError(false)
    setErrorMessage("")
    if (input.current.value.length > 0) {
      fetchInstagramUser(input.current.value.toLowerCase())
    } else {
      dispatch({ type: "loading", payload: false })
      setError(true)
      setErrorMessage("You must enter at least 1 character")
    }
  }

  const errorClass = error
    ? "search__error search__error--active"
    : "search__error"

  return (
    <section className={`search ${animations.search}`}>
      <h1 className="logo">stellr</h1>
      <div className="search__area">
        <SearchForm handleSearch={handleSearch} />
        <SearchButton
          error={error}
          setError={setError}
          handleSearch={handleSearch}
        />
        <p className={errorClass}>{errorMessage}</p>
      </div>
    </section>
  )
}

export default withRouter(Search)
