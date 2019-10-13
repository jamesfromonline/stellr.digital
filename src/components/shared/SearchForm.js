import React from "react"

const SearchForm = props => {
  const handleSearch = e => {
    e.preventDefault()
    props.handleSearch()
  }

  return (
    <form className="search__form" onSubmit={handleSearch}>
      <input
        className="search__input"
        type="text"
        spellCheck="false"
        onChange={props.handleChange}
        placeholder="username"
      />
      <div className="search__input--focus" />
    </form>
  )
}

export default SearchForm
