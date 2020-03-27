import React, { useState, useEffect } from 'react'
import classes from './Start.module.scss'
import { Box } from '../../components/Box/Box'
import { Button } from '../../components/Button/Button'
import { Slider } from '../../components/Slider/Slider'
import { useSelector, useDispatch } from 'react-redux'
import {
  getNumberOfImg,
  getSearchValue,
  getSecondsToRemember
} from '../../redux/selectors'
import {
  setNumberOfImgAction,
  setSearchValueAction,
  setSecondsToRememberAction,
  setGameModeAction
} from '../../redux/actionCreators'
import { passGameMode, passSearchValue, fetchImages } from '../../redux/actions'
import { Redirect } from 'react-router'
import { getRandomPhotos, getSearchedPhotos } from '../../api'
import { useHistory } from 'react-router-dom'

export const Start = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = useState('')
  const [gameModeStr, setGameModeStr] = useState('random')
  const [errorMsg, setErrorMsg] = useState(false)

  const numberOfImg = useSelector(getNumberOfImg)
  const searchValue = useSelector(getSearchValue)
  const secondsToRemember = useSelector(getSecondsToRemember)

  const onInput = () => {
    setErrorMsg(false)
    dispatch(passSearchValue(value))
  }

  const onClickRandom = async () => {
    // dispatch(
    //   setGameModeAction(
    //     `https://api.unsplash.com/photos/random?client_id=KdhCvP8tXfN1Byw49YkwKeDjHe5oa8fpZS2YGgmTYIM&count=${numberOfImg}`
    //   ))
    // dispatch(passGameMode('random'))

    const data = await getRandomPhotos(numberOfImg)
    console.log(data)

    dispatch(fetchImages(data))
    history.push('/game')
    // return <Redirect push to="/game" />
  }

  const onClickSearch = async event => {
    event.preventDefault()
    if (value) {
      const result = getSearchedPhotos(numberOfImg, searchValue)
      // dispatch(passGameMode('search'))
      // const result = await dispatch(fetchImages())
      if (result) {
        setErrorMsg(false)
        history.push('/game')
      } else {
        setValue(null)
        setErrorMsg(true)
      }
    }
  }
  useEffect(() => {
    dispatch(setSearchValueAction(null))
    // setGameModeStr('random')
  }, [])

  return (
    <>
      <div className={classes.start}>
        <Box
          className={`${classes.startBox} ${classes.boxTitle}`}
          size="300"
          textFront="catfish"
        ></Box>
        <Box
          className={`${classes.startBox} ${classes.boxRandom}`}
          size="300"
          textFront="RANDOM"
          textBack="START"
          BgColorFront="#434364"
          BgColorBack="#742854"
          onClick={onClickRandom}
        ></Box>
        <Box
          className={`${classes.startBox} ${classes.boxSearch}`}
          size="300"
          textFront="SEARCH"
          BgColorFront="#ff6860"
          BgColorBack="#D8AD4E"
          paddingCenterBack="0"
        >
          <form className={classes.searchForm}>
            <div className={classes.inputContainer}>
              <input
                className={classes.startInput}
                type="text"
                value={value}
                placeholder={
                  errorMsg
                    ? 'Oops, nothing found. Try again'
                    : 'Search for photos'
                }
                onChange={onInput}
              />
            </div>
            <Button
              className={classes.startBtn}
              type="submit"
              onClick={onClickSearch}
            >
              SEARCH
            </Button>
          </form>
        </Box>
        <Box
          className={`${classes.startBox} ${classes.boxSize}`}
          size="300"
          textFront="SETTINGS"
          BgColorFront="rgb(23, 68, 116)"
          BgColorBack="#414141"
          paddingCenterBack="0"
        >
          <Slider
            className={classes.numberOfImgSelect}
            min="4"
            max="30"
            step="2"
            value={numberOfImg}
            onChange={event =>
              dispatch(setNumberOfImgAction(event.target.value))
            }
          >
            Number of cards:
          </Slider>
          <Slider
            className={classes.secondsToRemember}
            min="1"
            max="60"
            step="1"
            value={secondsToRemember}
            onChange={event =>
              dispatch(setSecondsToRememberAction(event.target.value))
            }
          >
            Time to memorize:
          </Slider>
        </Box>
      </div>
    </>
  )
}
