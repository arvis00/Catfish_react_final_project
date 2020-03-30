import React, { useState, useEffect } from 'react'
import classes from './Results.module.scss'
import { fetchImages } from '../../redux/actions'
import { BrowserRouter, Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { getTimePassedAfterFlip } from '../../redux/selectors'
import { useSelector } from 'react-redux'

export const Results = () => {
  const [timestamp, setTimestamp] = useState(0)
  const { counter: timePassedAfterFlip } = useSelector(getTimePassedAfterFlip)

  const makeTwoDigitTimer = n => (n < 10 ? '0' : '') + n

  useEffect(() => {
    console.log('getTimePassedAfterFlip', timePassedAfterFlip)

    const minutes = Math.floor(timePassedAfterFlip / 60)
    const seconds = timePassedAfterFlip % 60
    setTimestamp(`${makeTwoDigitTimer(minutes)}:${makeTwoDigitTimer(seconds)}`)
  }, [])
  return (
    <>
      <div className={classes.results}>
        <h1>Congrats!</h1>
        <div className={classes.timeResult}>
          <h1>Your time is {timestamp}</h1>
        </div>
        <Link to="/game">
          <Button className={classes.resultBtn} onClick={fetchImages}>
            TRY AGAIN
          </Button>
        </Link>
        <Link to="/">
          <Button className={classes.resultBtn}>HOME</Button>
        </Link>
      </div>
    </>
  )
}
