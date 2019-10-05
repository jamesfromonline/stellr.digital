import React from "react"

const SearchForm = props => {
  const handleSearch = e => {
    e.preventDefault()
    props.handleSearch()
  }

  return (
    <form className="wrap" onSubmit={handleSearch}>
      <input
        type="text"
        spellCheck="false"
        onChange={props.handleChange}
        placeholder="username"
      />
      <div className="bg" />
    </form>
  )
}

export default SearchForm
