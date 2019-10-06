import React from "react"
import { useStateValue } from "../../state"

const UserPost = () => {
  const [{ posts, userPost }, dispatch] = useStateValue()
  const handleClose = () => {
    dispatch({
      type: "userPost",
      payload: {
        ...userPost,
        show: false
      }
    })
  }
  if (userPost.show) {
    console.log(posts.posts[userPost.index])
    return (
      <div className={`post ${!userPost.show && "remove"}`}>
        <div className="post__clickable-layer" onClick={handleClose} />
        <div className="post__content-container">
          <p>post</p>
          <button onClick={handleClose}>CLOSE</button>
          <img
            className="post__img"
            src={posts.posts[userPost.index].node.display_url}
          />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UserPost