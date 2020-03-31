import React, { useState, useEffect } from 'react'
import classes from './Results.module.scss'
import { fetchImages } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import {
  getTimePassedAfterFlip,
  getGameMode,
  getNumberOfImg,
  getSearchValue
} from '../../redux/selectors'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTimerEndAction } from '../../redux/actionCreators'
import { getSearchedPhotos, getRandomPhotos } from '../../api'

export const Results = () => {
  const [timestamp, setTimestamp] = useState(0)
  const { counter: timePassedAfterFlip } = useSelector(getTimePassedAfterFlip)
  const gameMode = useSelector(getGameMode)
  const numberOfImg = useSelector(getNumberOfImg)
  const searchValue = useSelector(getSearchValue)
  const dispatch = useDispatch()

  const makeTwoDigitTimer = n => (n < 10 ? '0' : '') + n

  const clickAction = async () => {
    if (gameMode === 'search') {
      const data = await getSearchedPhotos(numberOfImg, searchValue)
      dispatch(fetchImages(data))
    } else if (gameMode === 'random') {
      const data = getRandomPhotos(numberOfImg)
      dispatch(fetchImages(data))
    }
  }
  useEffect(() => {
    const minutes = Math.floor(timePassedAfterFlip / 60)
    const seconds = timePassedAfterFlip % 60
    setTimestamp(`${makeTwoDigitTimer(minutes)}:${makeTwoDigitTimer(seconds)}`)
    dispatch(setTimerEndAction(false))
  }, [])
  return (
    <>
      <div className={classes.results}>
        <h1>Congrats!</h1>
        <div className={classes.timeResult}>
          <h1>Your time is {timestamp}</h1>
        </div>
        <Link to="/game">
          <Button className={classes.resultBtn} onClick={clickAction}>
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
