import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { decorateNumber } from "../utils"
import { useStateValue } from "../state"
import Loader from "./Loader"
import Card from "./shared/Card"
import UserPost from "./shared/UserPost"
import UserFeed from "./shared/UserFeed"
import UserStats from "./shared/UserStats"
import UserAvatar from "./shared/UserAvatar"

const User = props => {
  const [{ animations, user, posts, isLoading }, dispatch] = useStateValue(),
    [mediaLoading, setMediaLoading] = useState(true),
    [end, setEnd] = useState("")

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
      dispatch({ type: "user", payload: {} })
      dispatch({
        type: "posts",
        payload: {
          count: 0,
          posts: [],
          page_info: {}
        }
      })
      props.history.push("/")
    }, 500)
  }

  const handlePagination = () => {
    if (posts.posts.length < posts.count) {
      getUserMedia(user.user.id)
      dispatch({
        type: "loadingMedia",
        payload: true
      })
    } else {
      dispatch({
        type: "loadingMedia",
        payload: false
      })
    }
  }

  // TODO: move this to backend
  const getUserMedia = async id => {
    const url = `https://instagram.com/graphql/query/?query_id=17888483320059182&id=${id}&first=12&after=${end}`

    try {
      const data = await fetch(url),
        json = await data.json()

      const currentPosts = posts.posts,
        fetchedPosts = json.data.user.edge_owner_to_timeline_media.edges

      if (currentPosts.length < posts.count)
        fetchedPosts.forEach(p => currentPosts.push(p))

      dispatch({
        type: "posts",
        payload: {
          count: json.data.user.edge_owner_to_timeline_media.count,
          posts:
            currentPosts.length <= 0
              ? json.data.user.edge_owner_to_timeline_media.edges
              : currentPosts,
          page_info: json.data.user.edge_owner_to_timeline_media.page_info
        }
      })

      setEnd(json.data.user.edge_owner_to_timeline_media.page_info.end_cursor)
      setMediaLoading(false)
      dispatch({
        type: "loadingMedia",
        payload: false
      })
    } catch (e) {
      console.error(e)
    }
  }

  const fetchInstagramUser = async username => {
    const url = `http://167.99.121.93:5000/instagram?username=${username}`
    // const url = `http://localhost:5000/instagram?username=${username}`
    try {
      const data = await fetch(url),
        json = await data.json()

      dispatch({ type: "user", payload: json })
      dispatch({ type: "loading", payload: false })
      dispatch({
        type: "animation",
        payload: { ...animations, user: "animate__fade-in" }
      })

      getUserMedia(json.user.id)
    } catch (e) {
      props.history.push("/")
      console.error(`User ${username} not found.`)
    }
  }

  useEffect(() => {
    const path = props.history.location.pathname,
      username = path.slice(1, path.length)

    if (Object.entries(user).length === 0 && user.constructor === Object) {
      setMediaLoading(true)
      dispatch({ type: "loading", payload: true })
      fetchInstagramUser(username)
    } else {
      setMediaLoading(true)
      dispatch({ type: "loading", payload: false })
      getUserMedia(user.user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoading && Object.entries(user).length > 0) {
    const data = user.user,
      feed = posts.posts

    return (
      <section className={`user ${animations.user}`}>
        <div className="user__main">
          <Card goHome={goHome}>
            <UserAvatar src={data.profile_picture} />

            <UserStats
              styleName="user__stats--top"
              formatNumber={decorateNumber}
              data={[
                {
                  title: "Posts",
                  content: decorateNumber(data.feed_info.posts_count)
                },
                {
                  title: "Followers",
                  content: decorateNumber(data.followed_by)
                },
                {
                  title: "Following",
                  content: decorateNumber(data.following)
                }
              ]}
            />

            <div className="feed">
              {mediaLoading ? (
                <Loader main="#70e8c8" sub="#ffffff" />
              ) : (
                <UserFeed
                  feed={feed}
                  mediaLoading={mediaLoading}
                  handlePagination={handlePagination}
                />
              )}
            </div>

            <UserStats
              styleName="user__stats--bottom"
              formatNumber={decorateNumber}
              data={[
                {
                  title: "Likes",
                  content: decorateNumber(data.likes_avg)
                },
                {
                  title: "Comments",
                  content: decorateNumber(data.comments_avg)
                },
                {
                  title: "Engagement",
                  content: `${data.totalEngagementRate}%`
                }
              ]}
            />
          </Card>
        </div>
        <UserPost />
      </section>
    )
  } else {
    return <Loader />
  }
}

export default withRouter(User)
