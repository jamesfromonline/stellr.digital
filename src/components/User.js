import React, { useState, useEffect } from "react"
import { useStateValue } from "../state"
import { withRouter } from "react-router-dom"

const User = props => {
  const [{ user }, dispatch] = useStateValue()
  const [animation, setAnimation] = useState("animate__in--left")

  const goHome = () => {
    setAnimation("animate__out--right")
    dispatch({
      type: "animation",
      payload: "moveRight"
    })
    setTimeout(() => {
      props.history.push("/")
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimation(null)
    }, 500)
  }, [])

  return (
    <div className={`user ${animation}`}>
      <div className="user__top-bar">
        <button onClick={goHome}>Back</button>
      </div>
      <div className="user__main">
        <div className="user__card">
          <div className="user__card-content">CONTENT!</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(User)
