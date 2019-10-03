import React, { useState, useEffect } from "react"
import { useStateValue } from "../state"

const SearchButton = props => {
  const [{ isLoading }] = useStateValue(),
    [buttonClass, setButtonClass] = useState("")

  useEffect(() => {
    if (isLoading) {
      setButtonClass("loader active")
    } else {
      setButtonClass("")
    }
  }, [isLoading])

  const handleClick = e => {
    props.handleSearch(e)
  }

  return (
    <button
      className={`loading ${buttonClass}`}
      type="submit"
      onClick={handleClick}
      title="Search"
    >
      {!isLoading && "go"}
    </button>
  )
}

export default SearchButton
