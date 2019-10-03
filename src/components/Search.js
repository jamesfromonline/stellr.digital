import React, { useRef, useState } from "react"
import { withRouter } from "react-router-dom"
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
    try {
      const data = await fetch(url),
        json = await data.json()
      dispatch({ type: "user", payload: json })
      setError(false)
      setErrorMessage("")
      startAnimations()
      setTimeout(() => {
        props.history.push(username)
      }, 500)
    } catch (e) {
      dispatch({ type: "loading", payload: false })
      setError(true)
      setErrorMessage(`Can't find that username. Did you spell it correctly?`)
      console.error(`User ${username} not found.`)
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    dispatch({ type: "loading", payload: true })
    setError(false)
    setErrorMessage("")
    if (igSearch.current.value.length > 0) {
      fetchInstagramUser(igSearch.current.value)
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
      {/* <form onSubmit={handleSearch}>
        <input spellCheck="false" ref={igSearch} placeholder="username" />
      </form> */}

      <div className="search__area">
        <form className="wrap" onSubmit={handleSearch}>
          <input
            type="text"
            spellCheck="false"
            ref={igSearch}
            placeholder="username"
          />
          <div className="bg" />
        </form>
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
