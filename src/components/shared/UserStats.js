import React from "react"

const UserStats = props => {
  const data = props.data

  const items = data.map(item => {
    return (
      <li key={item.title}>
        <p className="user__stat-title">{item.title}</p>
        <p>{item.content}</p>
      </li>
    )
  })

  return (
    <ul className="user__stats" style={{ marginTop: "20px" }}>
      {items}
    </ul>
  )
}

export default UserStats
