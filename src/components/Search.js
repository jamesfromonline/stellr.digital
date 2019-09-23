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
            clouds: "animate__clouds--left",
            nebula: "animate__nebula--left",
            landscape: "animate__landscape--left"
          },
          search: "animate__out--left",
          user: "animate__in--left"
        }
      })
      console.log(json)
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
