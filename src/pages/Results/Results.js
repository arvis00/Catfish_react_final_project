import React, { useState, useEffect } from 'react'
import classes from './Results.module.scss'
import { fetchImages } from '../../redux/actions'
import { BrowserRouter, Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { getTimePassedAfterFlip } from '../../redux/selectors'

export const Results = () => {
  const [timestamp, setTimestamp] = useState(0)

  const makeTwoDigitTimer = n => (n < 10 ? '0' : '') + n

  useEffect(() => {
    console.log('getTimePassedAfterFlip', getTimePassedAfterFlip)

    const minutes = Math.floor(getTimePassedAfterFlip / 60)
    const seconds = getTimePassedAfterFlip % 60
    setTimestamp(`${makeTwoDigitTimer(minutes)}:${makeTwoDigitTimer(seconds)}`)
  }, [])
  return (
    <div>
      <div className={classes.results}>
        <h1>Congrats!</h1>
        <div className={classes.timeResult}>
          <h1>Your time is {timestamp}</h1>
        </div>
        <BrowserRouter>
          <Link to="/game">
            <Button className={classes.resultBtn} onClick={fetchImages}>
              TRY AGAIN
            </Button>
          </Link>
        </BrowserRouter>
        <BrowserRouter>
          <Link to="/">
            <Button className={classes.resultBtn}>HOME</Button>
          </Link>
        </BrowserRouter>
      </div>
    </div>
  )
}
