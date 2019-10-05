import React, { useRef } from "react"

const SearchForm = props => {
  const input = useRef(null)

  const handleSearch = e => {
    e.preventDefault()
    props.handleSearch(input)
  }

  return (
    <form className="wrap" onSubmit={handleSearch}>
      <input
        type="text"
        spellCheck="false"
        ref={input}
        placeholder="username"
      />
      <div className="bg" />
    </form>
  )
}

export default SearchForm
