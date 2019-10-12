import React, { useState, useEffect } from "react"
import { useStateValue } from "../../state"

const UserPost = () => {
  const [{ posts, userPost }, dispatch] = useStateValue()
  const [animation, setAnimation] = useState("animate__fade-in")
  const handleClose = () => {
    setAnimation("animate__fade-out")
    setTimeout(() => {
      dispatch({
        type: "userPost",
        payload: {
          ...userPost,
          show: false
        }
      })
    }, 300)
  }

  useEffect(() => {
    userPost.show && setAnimation("animate__fade-in")
  }, [userPost.show])

  if (userPost.show) {
    return (
      <div className={`post ${animation}`}>
        <div className="post__clickable-layer" onClick={handleClose} />
        <div className="post__top-bar">
          <button className="post__close-btn" onClick={handleClose} />
        </div>
        <div className="post__content-container">
          <img
            className="post__img"
            src={posts.posts[userPost.index].node.display_url}
            alt="User post"
          />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UserPost
