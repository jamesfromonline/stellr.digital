import React from "react"
import BottomScrollListener from "react-bottom-scroll-listener"
import { useStateValue } from "../../state"
import Loader from "../Loader"

const UserFeed = props => {
  const [{ user, isLoadingMedia }, dispatch] = useStateValue()
  const showUserPost = i => {
    dispatch({
      type: "userPost",
      payload: {
        show: true,
        index: i
      }
    })
  }

  const mappedFeed = props.feed.map((post, i) => {
    const p = post.node
    return (
      <div
        onClick={() => showUserPost(i)}
        className="feed__thumbnail"
        key={p.id}
      >
        <img src={p.thumbnail_src} alt="Post Thumbnail" />
      </div>
    )
  })

  const isPrivate = props.isPrivate

  console.log(user.user.username)

  if (!isPrivate && props.feed.length > 0) {
    return (
      <BottomScrollListener
        onBottom={!props.mediaLoading && props.handlePagination}
      >
        {scrollRef => (
          <>
            <div ref={scrollRef} className="feed__grid animate__fade-in">
              {mappedFeed}
            </div>
            <div className="feed__pagination-loader">
              {props.feed.length && isLoadingMedia && <Loader />}
            </div>
          </>
        )}
      </BottomScrollListener>
    )
  } else if (!isPrivate && props.feed.length < 1) {
    return (
      <div className="feed__placeholder-container">
        <div className="feed__placeholder">
          <div className="feed__placeholder feed__placeholder--empty" />
        </div>
        <p className="feed__placeholder-text">
          @{user.user.username} hasn't posted anything yet.
        </p>
      </div>
    )
  } else {
    return (
      <div className="feed__placeholder-container">
        <div className="feed__placeholder">
          <div className="feed__placeholder feed__placeholder--private" />
        </div>
        <p className="feed__placeholder-text">
          @{user.user.username}'s account is set to private.
        </p>
      </div>
    )
  }
}

export default UserFeed
