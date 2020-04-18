import React, { useState, useEffect } from 'react'
import classes from './Start.module.scss'
import Box from '../../components/Box'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { useSelector, useDispatch } from 'react-redux'
import {
  getNumberOfImg,
  getSearchValue,
  getSecondsToRemember,
} from '../../redux/selectors'
import {
  setNumberOfImgAction,
  setSearchValueAction,
  setSecondsToRememberAction,
  setGameModeAction,
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setDataFetchedAction,
  setTimerEndAction,
} from '../../redux/actionCreators'
import { fetchImages } from '../../redux/actions'
import { getRandomPhotos, getSearchedPhotos } from '../../api'
import { useHistory } from 'react-router-dom'

export const Start = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState(false)

  const numberOfImg = useSelector(getNumberOfImg)
  const searchValue = useSelector(getSearchValue)
  const secondsToRemember = useSelector(getSecondsToRemember)

  const onInput = (event) => {
    setValue(event.target.value)
    setErrorMsg(false)
    dispatch(setSearchValueAction(event.target.value))
  }

  const onClickRandom = async () => {
    if (localStorage.getItem('toRememberImg')) {
      const data = JSON.parse(localStorage.getItem('toRememberImg'))
      dispatch(setToRememberImgArrayAction(data))
      const result = JSON.parse(localStorage.getItem('toGuessImg')).map(
        (storedImage) => {
          return {
            ...storedImage,
            hidden: false,
          }
        }
      )
      dispatch(setToGuessImgArrayAction(result))
    } else {
      dispatch(setGameModeAction('random'))
      const data = await getRandomPhotos(numberOfImg)
      dispatch(fetchImages(data))
    }
    history.push('/game')
  }

  const onClickSearch = async (event) => {
    event.preventDefault()
    if (value) {
      const result = await getSearchedPhotos(numberOfImg, searchValue)
      if (!result.errors) {
        setErrorMsg(false)
        dispatch(setGameModeAction('search'))
        dispatch(setSearchValueAction(value))
        dispatch(fetchImages(result))
        history.push('/game')
      } else {
        setValue('')
        setErrorMsg(true)
      }
    }
  }

  useEffect(() => {
    dispatch(setSearchValueAction(''))
    dispatch(setTimerEndAction(false))
    dispatch(setDataFetchedAction(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            classNameText={classes.settingsText}
            onChange={(event) =>
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
            classNameText={classes.settingsText}
            onChange={(event) =>
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
