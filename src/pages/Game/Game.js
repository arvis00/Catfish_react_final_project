import React, { useEffect, useState } from 'react'
import classes from './Game.module.scss'
import Slider from '../../components/Slider'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import {
  getToGuessImgArray,
  getTimePassedAfterFlip,
  getToRememberImgArray,
  getSizeOfImg,
  getDataFetched,
  getTimerEnd,
  getFlipCards,
  getSelectionCounter,
} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import {
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setSizeOfImgAction,
  setTimerEndAction,
  setFlipCards,
} from '../../redux/actionCreators'
import { useHistory } from 'react-router-dom'
import {
  startTimerAfterStart,
  startTimerAfterFlip,
  stopTimer,
  setSelectionCounterAction,
  setTimePassedAfterStartAction,
  setTimePassedAfterFlipAction,
} from '../../redux/actions'
import ContainerWithCards from '../../components/ContainerWithCards'
import ContainerWithImageToFind from '../../components/ContainerWithImageToFind'
import Loader from '../../components/Loader'

export const Game = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const [totalResult, setTotalResult] = useState(0)
  const [gameLives, setGameLives] = useState(3)
  const [isLoading, setIsLoading] = useState(true)

  const toGuessImgArray = useSelector(getToGuessImgArray)
  const timePassedAfterFlip = useSelector(getTimePassedAfterFlip)
  const toRememberImgArray = useSelector(getToRememberImgArray)
  const sizeOfImg = useSelector(getSizeOfImg)
  const dataFetched = useSelector(getDataFetched)
  const timerEnd = useSelector(getTimerEnd)
  const flipCards = useSelector(getFlipCards)
  const selectionCounter = useSelector(getSelectionCounter)

  const history = useHistory()
  const dispatch = useDispatch()

  const imageToGuessDisplayed = () => {
    return toGuessImgArray[imageIndex]
  }

  const makeTwoDigitTimer = (n) => (n < 10 ? '0' : '') + n

  const changeTimeFormat = () => {
    const minutes = Math.floor(timePassedAfterFlip / 60)
    const seconds = timePassedAfterFlip % 60
    return `${makeTwoDigitTimer(minutes)}:${makeTwoDigitTimer(seconds)}`
  }

  const nextImage = (tempResult) => {
    if (tempResult === 2) {
      clearValues(2)
    } else {
      dispatch(setSelectionCounterAction(0))
      const tempArray = toRememberImgArray.map((storedImage) => {
        return {
          ...storedImage,
          selected: false,
        }
      })
      dispatch(setToRememberImgArrayAction(tempArray))
    }
    if (
      imageIndex < toGuessImgArray.length - 1 &&
      !toGuessImgArray[imageIndex + 1].hidden
    ) {
      setImageIndex((prev) => prev + 1)
    } else if (
      imageIndex < toGuessImgArray.length - 1 &&
      toGuessImgArray[imageIndex + 1].hidden
    ) {
      const result = toGuessImgArray.map((e) => e.hidden)
      setImageIndex(() => result.indexOf(false, imageIndex + 1))
    } else if (!toGuessImgArray[0].hidden) {
      setImageIndex(0)
    } else {
      const result = toGuessImgArray.map((e) => e.hidden)
      setImageIndex(() => result.indexOf(false))
    }
    if (imageIndex === -1) {
      const result = toGuessImgArray.map((e) => e.hidden)
      setImageIndex(() => result.indexOf(false))
    }
  }

  const clearValues = (tempResult, reset) => {
    if (reset) {
      dispatch(setSelectionCounterAction(0))
      const tempArray = toRememberImgArray.map((storedImage) => {
        return {
          ...storedImage,
          selected: false,
          guessed: false,
        }
      })
      dispatch(setToRememberImgArrayAction(tempArray))
    } else {
      if (tempResult === 2) {
        const updatedGuessArray = toGuessImgArray.map((storedImage) => {
          if (storedImage.id === imageToGuessDisplayed().id) {
            return {
              ...storedImage,
              hidden: true,
            }
          }
          return storedImage
        })
        dispatch(setToGuessImgArrayAction(updatedGuessArray))
        const updatedRemArray = toRememberImgArray.map((storedImage) => {
          if (storedImage.selected === true) {
            return {
              ...storedImage,
              guessed: true,
              selected: false,
            }
          }
          return {
            ...storedImage,
            selected: false,
          }
        })
        dispatch(setToRememberImgArrayAction(updatedRemArray))
        setTotalResult((prev) => prev + 2)
        dispatch(setSelectionCounterAction(0))
      } else {
        const itemsForMutating = {
          condition: ['selected', true],
          change: ['guessed'],
        }
        mutateImgArray(true, toRememberImgArray, itemsForMutating)
        setTimeout(() => {
          mutateImgArray(true, toRememberImgArray, itemsForMutating)
          dispatch(setSelectionCounterAction(0))
          const tempArray = toRememberImgArray.map((storedImage) => {
            return {
              ...storedImage,
              selected: false,
            }
          })
          dispatch(setToRememberImgArrayAction(tempArray))
        }, 600)
      }
    }
  }

  const mutateImgArray = (needIf, array, { condition, change }) => {
    const tempArray = array.map((storedImage) => {
      if (needIf ? storedImage[condition[0]] === condition[1] : true) {
        return {
          ...storedImage,
          [change[0]]: !storedImage[change[0]],
        }
      }
      return storedImage
    })
    if (array === toRememberImgArray) {
      dispatch(setToRememberImgArrayAction(tempArray))
    } else {
      dispatch(setToGuessImgArrayAction(tempArray))
    }
  }

  const failedAttempt = () => {
    clearValues()
    if (gameLives >= 0) {
      setGameLives((gameLives) => gameLives - 1)
    }
  }

  const checkSelection = () => {
    let result = 0
    toRememberImgArray.forEach((storedImage) => {
      if (
        storedImage.selected &&
        storedImage.id === imageToGuessDisplayed().id
      ) {
        result += 1
      }
    })
    result === 2 ? nextImage(2) : failedAttempt()
  }

  const resetGame = (firstRender) => {
    dispatch(setTimerEndAction(false))
    const tempArray = toRememberImgArray.map((storedImage) => {
      return {
        ...storedImage,
        guessed: false,
      }
    })
    dispatch(setToRememberImgArrayAction(tempArray))
    const updatedGuessArray = toGuessImgArray.map((storedImage) => {
      return {
        ...storedImage,
        hidden: false,
      }
    })
    dispatch(setToGuessImgArrayAction(updatedGuessArray))
    setGameLives(3)
    dispatch(setFlipCards(false))
    if (!firstRender) {
      dispatch(setSelectionCounterAction(0))
      setTotalResult(0)
      setImageIndex(0)
      dispatch(setTimePassedAfterStartAction(0))
      dispatch(setTimePassedAfterFlipAction(0))
      dispatch(startTimerAfterStart())
    }
  }

  useEffect(() => {
    dispatch(setTimerEndAction(false))
    clearValues(null, true)
    dispatch(setSelectionCounterAction(0))
    setTotalResult(0)
    setImageIndex(0)
    resetGame(true)

    toRememberImgArray.length !== 0 &&
      setTimeout(
        () => {
          setIsLoading(false)
          dispatch(startTimerAfterStart())
        },
        dataFetched ? 2000 : 0
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      toRememberImgArray.length !== 0 &&
      toRememberImgArray.length === totalResult
    ) {
      dispatch(stopTimer)
      history.push('/results')
    }
    if (toRememberImgArray.length === 0) {
      dispatch(stopTimer)
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalResult])

  useEffect(() => {
    if (gameLives < 1) {
      dispatch(stopTimer)
      history.push('/gameover')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLives])

  useEffect(() => {
    if (timerEnd) {
      dispatch(setFlipCards(true))
      dispatch(startTimerAfterFlip())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnd])

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.game}>
        <div className={classes.header}>
          <Slider
            className={classes.sizeSlider}
            min="50"
            max="300"
            step="1"
            value={sizeOfImg}
            padding="0 10px"
            onChange={(event) =>
              dispatch(setSizeOfImgAction(event.target.value))
            }
          >
            Change size of cards:
          </Slider>
          <div className={classes.timePassedTimer}>
            <div>{changeTimeFormat()}</div>
          </div>
          <div className={classes.lives}>
            <p>Tries left</p>
            {gameLives}
          </div>
        </div>
        {toRememberImgArray.length !== 0 && toGuessImgArray.length !== 0 && (
          <div
            className={`${classes.gameContent} ${isLoading && classes.hidden}`}
          >
            <ContainerWithCards />
            <div className={classes.selectImg}>
              <ContainerWithImageToFind
                imageToGuessDisplayed={toGuessImgArray[imageIndex]}
              />

              <div
                className={`${classes.buttonContainer} ${
                  flipCards && classes.showBtn
                } ${!flipCards && classes.hideBtn}`}
              >
                <div className={classes.nextContainer}>
                  {selectionCounter !== 2 && (
                    <Button className={classes.bottomBtn} onClick={nextImage}>
                      NEXT IMAGE
                    </Button>
                  )}
                  {selectionCounter === 2 && (
                    <Button
                      className={classes.bottomBtn}
                      disabled={selectionCounter !== 2}
                      onClick={checkSelection}
                    >
                      CHECK
                    </Button>
                  )}
                </div>
                <div className={classes.otherBtnContainer}>
                  <Button
                    className={classes.bottomBtn}
                    onClick={() => resetGame(false)}
                  >
                    RESET GAME
                  </Button>
                  <Link to="/" className={classes.homeLink}>
                    <Button className={classes.bottomBtn}>HOME</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
