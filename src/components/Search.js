import React, { useRef, useState } from "react"
import { withRouter } from "react-router-dom"
import { useStateValue } from "../state"

const Search = props => {
  const [{ animations }, dispatch] = useStateValue()
  const [error, setError] = useState(false)
  const igSearch = useRef(null)

  const fetchInstagramUser = async username => {
    const url = `http://167.99.121.93:5000/instagram?username=${username}`
    try {
      const data = await fetch(url)
      const json = await data.json()
      dispatch({
        type: "user",
        payload: json
      })

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
      setTimeout(() => {
        props.history.push(username)
      }, 500)
    } catch (e) {
      setError(true)
      console.error(`User ${username} not found.`)
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    console.log(igSearch.current.classList)
    igSearch.current.classList.remove("test")
    setError(false)
    if (igSearch.current.value.length > 0) {
      fetchInstagramUser(igSearch.current.value)
    } else {
      setError(true)
    }
  }

  return (
    <div className={`search ${animations.search}`}>
      <form onSubmit={handleSearch}>
        <input ref={igSearch} placeholder="username" />
      </form>
      <button onClick={handleSearch}>go</button>
      {error && <p>User not found. Try somebody else.</p>}
    </div>
  )
}

export default withRouter(Search)
