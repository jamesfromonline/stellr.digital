import React from "react"

const Loader = props => (
  <div
    className="loading loader active"
    style={{ borderColor: props.main, borderRightColor: props.sub }}
  />
)

export default Loader
