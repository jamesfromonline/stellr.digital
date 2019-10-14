import React from "react"

const UserStats = props => {
  const items = props.data.map(item => (
    <li key={item.title}>
      <p className="user__stat-title">{item.title}</p>
      <p className="user__stat-content">{item.content}</p>
    </li>
  ))

  if (!props.isPrivate && !props.isEmpty) {
    return <ul className={`user__stats ${props.styleName}`}>{items}</ul>
  } else {
    return null
  }
}

export default UserStats
