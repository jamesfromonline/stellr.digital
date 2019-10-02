import React, { useEffect } from "react"
import { useStateValue } from "../state"
import { withRouter } from "react-router-dom"

const User = props => {
  const [{ animations, user }, dispatch] = useStateValue()

  const goHome = () => {
    dispatch({
      type: "animation",
      payload: {
        ...animations,
        user: "animate__out--right",
        search: "animate__in--right",
        background: {
          nebula: {
            one: "animate__nebula-1--right",
            two: "animate__nebula-2--right",
            three: "animate__nebula-3--right"
          },
          landscape: {
            one: "animate__landscape-1--right",
            two: "animate__landscape-2--right",
            three: "animate__landscape-3--right"
          },
          clouds: {
            one: "animate__clouds-1--right",
            two: "animate__clouds-2--right"
          }
        }
      }
    })
    setTimeout(() => {
      props.history.push("/")
    }, 500)
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className={`user ${animations.user}`}>
      <div className="user__top-bar">
        <button onClick={goHome}>Back</button>
      </div>
      <div className="user__main">
        <div className="user__card">
          <div className="user__card-content">DATA GOES HERE PLS</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(User)
