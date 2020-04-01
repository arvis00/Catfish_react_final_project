import React from 'react'
import classes from './Timer.module.scss'
import {
  getSecondsToRemember,
  getTimePassedAfterStart,
  getTimerEnd
} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { setTimerEndAction } from '../../redux/actionCreators'
import { stopTimer } from '../../redux/actions'

export const Timer = ({ className }) => {
  const secondsToRemember = useSelector(getSecondsToRemember)
  const timePassedAfterStart = useSelector(getTimePassedAfterStart)
  const timerEnd = useSelector(getTimerEnd)
  const dispatch = useDispatch()
  const FULL_DASH_ARRAY = 283
  const WARNING_THRESHOLD = 10
  const ALERT_THRESHOLD = 5

  const COLOR_CODES = {
    info: {
      color: '#48a56a'
    },
    warning: {
      color: '#d8ad4e',
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: '#ff6860',
      threshold: ALERT_THRESHOLD
    }
  }

  const onTimesUp = () => dispatch => {
    stopTimer()
    dispatch(setTimerEndAction(true))
  }

  const timeLeft = () => {
    if (!timerEnd) {
      const time = secondsToRemember - timePassedAfterStart
      if (time === 0) {
        dispatch(onTimesUp())
      } else {
        return time
      }
    }
  }

  const timeFraction = () => {
    const rawTimeFraction = timeLeft() / secondsToRemember
    return rawTimeFraction - (1 / secondsToRemember) * (1 - rawTimeFraction)
  }

  const circleDasharray = () =>
    `${(timeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`

  const remainingPathColor = () => {
    const { alert, warning, info } = COLOR_CODES
    if (timeLeft() <= alert.threshold) {
      return alert.color
    } else if (timeLeft() <= warning.threshold) {
      return warning.color
    } else {
      return info.color
    }
  }

  return (
    <>
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
              strokeDasharray={circleDasharray()}
              className={`${classes.baseTimer__path__remaining}`}
              style={{ color: remainingPathColor() }}
              d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
            ></path>
          </g>
        </svg>
        <span className={classes.baseTimer__label}>{timeLeft()}</span>
      </div>
    </>
  )
}
