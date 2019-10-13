import React from "react"
import { useStateValue } from "../../state"

const PostStats = props => {
  const [{ posts, user }] = useStateValue()
  const post = posts.posts[props.index].node,
    likes = post.edge_media_preview_like.count,
    comments = post.edge_media_to_comment.count,
    engagement = (((likes + comments) / user.user.followed_by) * 100).toFixed(2)
  console.log(engagement + "%")
  return (
    <ul className="post-stats">
      <li className="post-stats__stat">Likes {likes}</li>
      <li className="post-stats__stat">Comments {comments}</li>
      <li className="post-stats__stat">Engagement {engagement}</li>
    </ul>
  )
}

export default PostStats
