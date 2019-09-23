import React from "react"
import { useStateValue } from "../state"

const Background = () => {
  const [{ animations }] = useStateValue()

  return (
    <div className="background-wrapper">
      {/* <div className="wrapper__absolute--full beacon-wrapper beacon-wrapper-01">
        <div className="beacon beacon-01" />
      </div>
      <div className="wrapper__absolute--full beacon-wrapper beacon-wrapper-02">
        <div className="beacon beacon-02" />
      </div>
      <div className="wrapper__absolute--full beacon-wrapper beacon-wrapper-03">
        <div className="beacon beacon-03" />
      </div> */}
      <div className="space-nebula__wrapper wrapper__absolute--full">
        <div className="space-nebula space-nebula-01" />
        <div className="space-nebula space-nebula-02" />
        <div className="space-nebula space-nebula-03" />
      </div>
      <div className="wrapper__absolute--full landscape-clouds__wrapper">
        <div className="landscape-clouds landscape-clouds-01" />
        <div className="landscape-clouds landscape-clouds-02" />
      </div>

      <div className="landscape">
        <div className="landscape__bg landscape__bg--03" />
        <div className="landscape__bg landscape__bg--02" />
        <div className="landscape__bg landscape__bg--01" />
      </div>
    </div>
  )
}

export default Background
