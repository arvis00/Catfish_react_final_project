import React from 'react'
import classes from './Timer.module.scss'
// import { stopTimer, startTimerAfterFlip } from '../../redux/actions'
import { stopTimer, startTimerAfterFlip } from './utils'
import {
  getSecondsToRemember,
  getTimePassedAfterStart,
  getTimerEnd
} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { setTimerEndAction } from '../../redux/actionCreators'

export const Timer = ({ className }) => {
  const secondsToRemember = useSelector(getSecondsToRemember)
  const { counter: timePassedAfterStart } = useSelector(getTimePassedAfterStart)
  const timerEnd = useSelector(getTimerEnd)
  const dispatch = useDispatch()
  const FULL_DASH_ARRAY = 283
  const WARNING_THRESHOLD = 5
  const ALERT_THRESHOLD = 3
  // console.log('hidetimer', className)

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
  // const timerEndFunction = (data = false) => data

  const onTimesUp = () => dispatch => {
    console.log('ontimesup')
    stopTimer()
    dispatch(setTimerEndAction(true))
    console.log('newTimerEnd', timerEnd)

    // setFlipCards(true)
    // dispatch(startTimerAfterFlip())
    // $emit("timerEnd")
  }

  const timeLeft = () => dispatch => {
    if (!timerEnd) {
      const time = secondsToRemember - timePassedAfterStart
      // console.log('secondsToRemember', secondsToRemember)
      console.log('timePassedAfterStart', timePassedAfterStart)

      if (time === 0) {
        dispatch(onTimesUp())
      } else {
        console.log('time', time)

        return time
      }
    }
  }

  // const time = timeLeft()

  // useEffect(() => {
  //   if (time === 0) {
  //     onTimesUp()

  // }, [timeLeft])

  const timeFraction = () => dispatch => {
    const rawTimeFraction = dispatch(timeLeft()) / secondsToRemember
    // console.log('timeFraction', dispatch(timeLeft()))

    return rawTimeFraction - (1 / secondsToRemember) * (1 - rawTimeFraction)
  }

  const circleDasharray = () => dispatch =>
    `${(dispatch(timeFraction()) * FULL_DASH_ARRAY).toFixed(0)} 283`

  // const text = circleDasharray()

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

  return (
    <>
      <div
        // className={`${classes.baseTimer} ${className}`}
        // className={`${classes.baseTimer} ${hideTimer} ${showTimer}`}
        className={`${classes.baseTimer} ${className}`}
      >
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
              strokeDasharray={dispatch(circleDasharray())}
              className={`${classes.baseTimer__path__remaining}`}
              style={{ color: remainingPathColor() }} //BUG color not changing
              d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
            ></path>
          </g>
        </svg>
        <span className={classes.baseTimer__label}>{dispatch(timeLeft())}</span>
      </div>
    </>
  )
}
