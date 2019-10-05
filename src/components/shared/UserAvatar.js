import React from "react"

const UserAvatar = props => (
  <div className="user__avatar-container">
    <div
      className="user__avatar"
      style={{ backgroundImage: `url(${props.src})` }}
    />
  </div>
)

export default UserAvatar
