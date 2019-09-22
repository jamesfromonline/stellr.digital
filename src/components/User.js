import React from "react"
import { useStateValue } from "../state"
import { withRouter } from "react-router-dom"

const User = props => {
  const [{ animations }, dispatch] = useStateValue()

  const goHome = () => {
    dispatch({
      type: "animation",
      payload: {
        ...animations,
        user: "animate__out--right",
        background: "moveRight"
      }
    })
    setTimeout(() => {
      props.history.push("/")
    }, 500)
  }

  return (
    <div className={`user ${animations.user}`}>
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
