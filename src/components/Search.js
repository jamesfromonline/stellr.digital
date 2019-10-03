import React, { useRef, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { useStateValue } from "../state"
import SearchButton from "./searchButton"

const Search = props => {
  const [{ animations, isLoading }, dispatch] = useStateValue()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const igSearch = useRef(null)

  const startAnimations = () => {
    dispatch({
      type: "animation",
      payload: {
        ...animations,
        background: {
          nebula: {
            one: "animate__nebula-1--left",
            two: "animate__nebula-2--left",
            three: "animate__nebula-3--left"
          },
          landscape: {
            one: "animate__landscape-1--left",
            two: "animate__landscape-2--left",
            three: "animate__landscape-3--left"
          },
          clouds: {
            one: "animate__clouds-1--left",
            two: "animate__clouds-2--left"
          }
        },
        search: "animate__out--left",
        user: "animate__in--left"
      }
    })
  }

  const fetchInstagramUser = async username => {
    const url = `http://167.99.121.93:5000/instagram?username=${username}`
    try {
      const data = await fetch(url)
      const json = await data.json()
      dispatch({
        type: "user",
        payload: json
      })
      setError(false)
      setErrorMessage("")
      startAnimations()
      setTimeout(() => {
        props.history.push(username)
      }, 500)
    } catch (e) {
      dispatch({
        type: "loading",
        payload: false
      })
      setError(true)
      setErrorMessage(`Can't find that username. Did you spell it correctly?`)
      console.error(`User ${username} not found.`)
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    dispatch({
      type: "loading",
      payload: true
    })
    igSearch.current.classList.remove("test")
    setError(false)
    setErrorMessage("")
    if (igSearch.current.value.length > 0) {
      fetchInstagramUser(igSearch.current.value)
    } else {
      dispatch({
        type: "loading",
        payload: false
      })
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
      <form onSubmit={handleSearch}>
        <input ref={igSearch} placeholder="USERNAME" />
      </form>
      <SearchButton
        error={error}
        setError={setError}
        handleSearch={handleSearch}
      />
      <p className={errorClass}>{errorMessage}</p>
    </section>
  )
}

export default withRouter(Search)
