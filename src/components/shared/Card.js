import React from "react"

const Card = props => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__top-bar">
          <button
            className="card__btn"
            title="Go Back"
            onClick={props.goHome}
          ></button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default Card
