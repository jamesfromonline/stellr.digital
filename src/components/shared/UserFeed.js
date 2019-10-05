import React from "react"
import BottomScrollListener from "react-bottom-scroll-listener"

const UserFeed = props => {
  const mappedFeed = props.feed.map(post => {
    const p = post.node
    return (
      <div className="feed__thumbnail" key={p.id}>
        <img src={p.thumbnail_src} alt="saying something because lintr" />
      </div>
    )
  })

  return (
    <BottomScrollListener
      onBottom={props.mediaLoading ? null : props.handlePagination}
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
