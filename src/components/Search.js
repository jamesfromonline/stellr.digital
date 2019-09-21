import React, { useRef, useState } from "react"
import { withRouter } from "react-router-dom"
import { useStateValue } from "../state"

const Search = props => {
  const [{ user }, dispatch] = useStateValue()
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
        payload: "moveLeft"
      })
      console.log(json)
      props.history.push(username)
    } catch (e) {
      setError(true)
      console.error(`User ${username} not found.`)
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    setError(false)
    fetchInstagramUser(igSearch.current.value)
  }

  return (
    <div className="search">
      <input ref={igSearch} onSubmit={handleSearch} placeholder="Search" />
      <button onClick={handleSearch}>Go</button>
      {error && <p>User not found. Try somebody else.</p>}
    </div>
  )
}

export default withRouter(Search)
