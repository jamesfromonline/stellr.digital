import React, { useState, useEffect } from "react"
import { useStateValue } from "../state"

const SearchButton = props => {
  const [{ isLoading }] = useStateValue()
  const [buttonClass, setButtonClass] = useState("")

  const handleClick = e => {
    props.handleSearch(e)
  }

  useEffect(() => {
    if (isLoading) {
      setButtonClass("loader active")
    } else {
      setButtonClass("")
    }
  }, [isLoading])

  return (
    <button
      className={buttonClass}
      type="submit"
      onClick={handleClick}
      title="Search"
    >
      {!isLoading && "GO"}
    </button>
  )
}

export default SearchButton
