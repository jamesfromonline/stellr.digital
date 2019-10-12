import React from "react"
import BottomScrollListener from "react-bottom-scroll-listener"
import { useStateValue } from "../../state"

const UserFeed = props => {
  const [_, dispatch] = useStateValue()
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

  return (
    <BottomScrollListener
      onBottom={!props.mediaLoading && props.handlePagination}
    >
      {scrollRef => (
        <div ref={scrollRef} className="feed__grid animate__fade-in">
          {mappedFeed}
        </div>
      )}
    </BottomScrollListener>
  )
}

export default UserFeed
