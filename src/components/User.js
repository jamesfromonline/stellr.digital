import React, { useEffect } from "react"
import { useStateValue } from "../state"
import { withRouter } from "react-router-dom"

const User = props => {
  const [{ animations, user, isLoading }, dispatch] = useStateValue()

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

  const fetchInstagramUser = async username => {
    const url = `http://167.99.121.93:5000/instagram?username=${username}`
    try {
      const data = await fetch(url)
      const json = await data.json()
      dispatch({
        type: "user",
        payload: json
      })
      dispatch({
        type: "loading",
        payload: false
      })
    } catch (e) {
      // setError(true)
      props.history.push("/")
      console.error(`User ${username} not found.`)
    }
  }

  useEffect(() => {
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      dispatch({
        type: "loading",
        payload: true
      })
      const path = props.history.location.pathname
      const username = path.slice(1, path.length)
      fetchInstagramUser(username)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoading && Object.entries(user).length > 0) {
    const data = user.user
    console.log(data)
    return (
      <div className={`user ${animations.user}`}>
        <div className="user__top-bar">
          <button onClick={goHome}>Back</button>
        </div>
        <div className="user__main">
          <div className="user__card">
            <div className="user__card-content">
              <div className="user__avatar-container">
                <div
                  className="user__avatar"
                  style={{ backgroundImage: `url(${data.profile_picture})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return "LOADING"
  }
}

export default withRouter(User)
