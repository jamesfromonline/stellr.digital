import React, { useState, useEffect } from "react"

const SearchButton = props => {
  const [buttonClass, setButtonClass] = useState("")

  useEffect(() => {
    if (props.isLoading) {
      setButtonClass("loader active")
    } else {
      setButtonClass("")
    }
  }, [props.isLoading])

  const handleClick = e => props.handleSearch()

  return (
    <button
      className={`loading ${buttonClass}`}
      type="submit"
      onClick={handleClick}
      title="Search"
    >
      {!props.isLoading && "go"}
    </button>
  )
}

export default SearchButton
