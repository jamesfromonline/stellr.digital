import React, { useEffect } from "react"
import { useStateValue } from "../state"
import Search from "./Search"

const Home = () => {
  return (
    <div className="home">
      <Search />
    </div>
  )
}

export default Home
