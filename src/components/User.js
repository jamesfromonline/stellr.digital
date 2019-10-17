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
      props.history.push("/")
    }, 500)
  }

  const handlePagination = () => {
    if (user.user.posts.length <= user.user.feed_info.posts_count) {
      dispatch({
        type: "loadingMedia",
        payload: true
      })
      getNewUserMedia(user.user.id)
    } else {
      dispatch({
        type: "loadingMedia",
        payload: false
      })
    }
  }

  const getNewUserMedia = async id => {
    const url = `http://localhost:5000/instagram/media?id=${id}&end_cursor=${end}`

    try {
      const data = await fetch(url),
        json = await data.json()

      const currPosts = user.user.posts
      const fetchedPosts = json.edges

      if (json.page_info.has_next_page) {
        fetchedPosts.forEach(p => currPosts.push(p))
      }

      dispatch({
        type: "user",
        payload: {
          ...user,
          page_info: json.page_info,
          posts: currPosts <= 0 ? fetchedPosts : currPosts
        }
      })

      setEnd(json.page_info.end_cursor)
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
    const url = `https://api.stellr.digital/instagram?username=${username}`
    // const url = `http://localhost:5000/instagram?username=${username}`
    try {
      const data = await fetch(url),
        json = await data.json()

      dispatch({ type: "user", payload: json }).then(() =>
        getNewUserMedia(json.user.id)
      )
      dispatch({ type: "loading", payload: false })
      dispatch({
        type: "animation",
        payload: { ...animations, user: "animate__fade-in" }
      })
    } catch (e) {
      props.history.push("/")
      dispatch({ type: "loading", payload: false })
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
      // getUserMedia(user.user.id)
      getNewUserMedia(user.user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoading && Object.entries(user).length > 0) {
    const data = user.user,
      feed = user.user.posts

    return (
      <section className={`user ${animations.user}`}>
        <div className="user__main">
          <Card goHome={goHome}>
            <UserAvatar src={data.profile_picture} />

            <UserStats
              styleName="user__stats--top"
              formatNumber={decorateNumber}
              isPrivate={false}
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
                  isPrivate={user.user.is_private}
                  mediaLoading={mediaLoading}
                  handlePagination={handlePagination}
                />
              )}
            </div>

            <UserStats
              styleName="user__stats--bottom"
              formatNumber={decorateNumber}
              isPrivate={user.user.is_private}
              isEmpty={feed.length < 1}
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
