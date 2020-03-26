import React from 'react'
import classes from '../Slider/Slider.module.scss'
import { stopTimer } from '../../redux/actions'
import {
  getSecondsToRemember,
  getTimePassedAfterStart
} from '../../redux/selectors'
import { useSelector } from 'react-redux'

export const Timer = className => {
  const secondsToRemember = useSelector(getSecondsToRemember)
  const timePassedAfterStart = useSelector(getTimePassedAfterStart)
  const FULL_DASH_ARRAY = 283
  const WARNING_THRESHOLD = 5
  const ALERT_THRESHOLD = 3

  const COLOR_CODES = {
    info: {
      color: 'green'
    },
    warning: {
      color: 'orange',
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: 'red',
      threshold: ALERT_THRESHOLD
    }
  }

  const timeLeft = () => {
    const time = secondsToRemember - timePassedAfterStart
    if (time === 0) {
      onTimesUp()
    } else {
      return time
    }
  }

  // useEffect(() => {
  //   if (time === 0) {
  //     onTimesUp()

  // }, [timeLeft])

  const circleDasharray = () =>
    `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`

  const timeFraction = () => {
    const rawTimeFraction = timeLeft / secondsToRemember
    return rawTimeFraction - (1 / secondsToRemember) * (1 - rawTimeFraction)
  }

  const remainingPathColor = () => {
    const { alert, warning, info } = COLOR_CODES

    if (timeLeft <= alert.threshold) {
      return alert.color
    } else if (timeLeft <= warning.threshold) {
      return warning.color
    } else {
      return info.color
    }
  }

  const onTimesUp = () => {
    stopTimer()
    // $emit("timerEnd")
  }

  return (
    <div>
      <div className={`${classes.baseTimer} ${className}`}>
        <svg
          className={classes.baseTimer__svg}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={classes.baseTimer__circle}>
            <circle
              className={classes.baseTimer__path__elapsed}
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              stroke-dasharray={circleDasharray}
              className={
                (classes.baseTimer__path__remaining, remainingPathColor)
              }
              d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
            ></path>
          </g>
        </svg>
        <span className={classes.baseTimer__label}>{timeLeft}</span>
      </div>
    </div>
  )
}
