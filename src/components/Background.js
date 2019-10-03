import React, { useEffect, useRef } from "react"
import { useStateValue } from "../state"

const Background = () => {
  const [{ animations }] = useStateValue()

  useEffect(() => {
    console.log(animations)
  }, [animations])

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
        <div
          className={`space-nebula space-nebula-01 ${animations.background.nebula.one}`}
        />
        <div
          className={`space-nebula space-nebula-02 ${animations.background.nebula.two}`}
        />
        <div
          className={`space-nebula space-nebula-03 ${animations.background.nebula.three}`}
        />
      </div>
      <div className="wrapper__absolute--full landscape-clouds__wrapper">
        <div
          className={`landscape-clouds landscape-clouds-01 ${animations.background.clouds.one}`}
        />
        <div
          className={`landscape-clouds landscape-clouds-02 ${animations.background.clouds.two}`}
        />
      </div>

      <div className="landscape">
        <div
          className={`landscape__bg landscape__bg--03 ${animations.background.landscape.three}`}
        />
        <div
          className={`landscape__bg landscape__bg--02 ${animations.background.landscape.two}`}
        />
        <div
          className={`landscape__bg landscape__bg--01 ${animations.background.landscape.one}`}
        />
      </div>
    </div>
  )
}

export default Background
