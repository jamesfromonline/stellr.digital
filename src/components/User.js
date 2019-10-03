import React, { useEffect } from "react"
import { useStateValue } from "../state"
import { withRouter } from "react-router-dom"
import { formatNum, abbrNum } from "../utils"
import Loader from "./Loader"

const User = props => {
  const [{ animations, user, isLoading }, dispatch] = useStateValue()

  const goHome = () => {
    dispatch({
      type: "animation",
      payload: {
        ...animations,
        user: "animate__out--right",
        search: "animate__in--right"
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
      dispatch({ type: "user", payload: json })
      dispatch({ type: "loading", payload: false })
      dispatch({
        type: "animation",
        payload: {
          ...animations,
          user: "animate__fade-in"
        }
      })
    } catch (e) {
      // setError(true)
      props.history.push("/")
      console.error(`User ${username} not found.`)
    }
  }

  useEffect(() => {
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      dispatch({ type: "loading", payload: true })
      const path = props.history.location.pathname
      const username = path.slice(1, path.length)
      fetchInstagramUser(username)
    } else {
      dispatch({ type: "loading", payload: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatNumber = num => {
    if (num >= 10000) {
      return abbrNum(num, 0)
    } else if (num >= 1000 && num < 10000) {
      return formatNum(num)
    } else {
      return num
    }
  }

  if (!isLoading && Object.entries(user).length > 0) {
    const data = user.user
    return (
      <section className={`user ${animations.user}`}>
        <div className="user__main">
          <div className="user__card">
            <div className="user__card-content">
              <div className="user__card-top-bar">
                <button
                  className="user__card-btn"
                  title="Go Back"
                  onClick={goHome}
                ></button>
              </div>
              <div className="user__avatar-container">
                <div
                  className="user__avatar"
                  style={{ backgroundImage: `url(${data.profile_picture})` }}
                />
              </div>

              <ul className="user__stats">
                <li>
                  <p className="user__stat-title">Posts</p>
                  <p>{formatNumber(data.posts.length)}</p>
                </li>
                <li>
                  <p className="user__stat-title">Followers</p>
                  <p>{formatNumber(data.followed_by)}</p>
                </li>
                <li>
                  <p className="user__stat-title">Following</p>
                  <p>{formatNumber(data.following)}</p>
                </li>
              </ul>

              <div className="user__engagement-wrapper">
                <p className="user__stat-title">Engagement Rate</p>
                <p className="user__engagement-rate">
                  {data.totalEngagementRate}%
                </p>
              </div>

              <ul className="user__stats">
                <li>
                  <p className="user__stat-title">Average Likes</p>
                  <p>{formatNumber(data.likes_avg)}</p>
                </li>
                <li>
                  <p className="user__stat-title">Average Comments</p>
                  <p>{formatNumber(data.comments_avg)}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return <Loader />
  }
}

export default withRouter(User)
