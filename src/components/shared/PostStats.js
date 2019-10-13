import React from "react"
import { useStateValue } from "../../state"
import { decorateNumber } from "../../utils"

const PostStats = props => {
  const [{ posts, user }] = useStateValue()
  const post = posts.posts[props.index].node,
    likes = post.edge_media_preview_like.count,
    comments = post.edge_media_to_comment.count,
    engagement = (((likes + comments) / user.user.followed_by) * 100).toFixed(2)
  return (
    <ul className="post-stats">
      <li className="post-stats__stat">
        <div className="post-stats__icon post-stats__icon--like" />
        <p className="post-stats__content">{decorateNumber(likes)}</p>
      </li>
      <li className="post-stats__stat">
        <div className="post-stats__icon post-stats__icon--comment" />
        <p className="post-stats__content">{decorateNumber(comments)}</p>
      </li>
      <li className="post-stats__stat">
        <div className="post-stats__icon post-stats__icon--engagement" />
        <p className="post-stats__content">{engagement}%</p>
      </li>
    </ul>
  )
}

export default PostStats
