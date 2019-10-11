import React from "react"

const UserStats = props => {
  const items = props.data.map(item => (
    <li key={item.title}>
      <p className="user__stat-title">{item.title}</p>
      <p>{item.content}</p>
    </li>
  ))

  return (
    <ul className="user__stats" style={{ marginTop: "20px" }}>
      {items}
    </ul>
  )
}

export default UserStats
