import React, { useEffect, useState } from 'react'
import classes from './Game.module.scss'
import { Slider } from '../../components/Slider/Slider'
import { Timer } from '../../components/Timer/Timer'
import { Button } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import {
  getToGuessImgArray,
  getTimePassedAfterFlip,
  getToRememberImgArray,
  getSizeOfImg,
  getNumberOfImg,
  getDataFetched,
  getTimerEnd
} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import {
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setSizeOfImgAction,
  setTimerEndAction
} from '../../redux/actionCreators'
import { useHistory } from 'react-router-dom'
import {
  startTimerAfterStart,
  startTimerAfterFlip,
  stopTimer
} from '../../redux/actions'

export const Game = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const [selectionCounter, setSelectionCounter] = useState(0)
  const [tempResult, setTempResult] = useState(0)
  const [totalResult, setTotalResult] = useState(0)
  const [flipCards, setFlipCards] = useState(false)
  const [gameLives, setGameLives] = useState(3)

  const toGuessImgArray = useSelector(getToGuessImgArray)
  const { counter: timePassedAfterFlip } = useSelector(getTimePassedAfterFlip)
  const toRememberImgArray = useSelector(getToRememberImgArray)
  const sizeOfImg = useSelector(getSizeOfImg)
  const numberOfImg = useSelector(getNumberOfImg)
  const dataFetched = useSelector(getDataFetched)
  const timerEnd = useSelector(getTimerEnd)

  const history = useHistory()

  const dispatch = useDispatch()

  const imageToGuessDisplayed = () => {
    return toGuessImgArray[imageIndex]
  }

  const makeTwoDigitTimer = n => (n < 10 ? '0' : '') + n

  const changeTimeFormat = () => {
    const minutes = Math.floor(timePassedAfterFlip / 60)
    const seconds = timePassedAfterFlip % 60
    return `${makeTwoDigitTimer(minutes)}:${makeTwoDigitTimer(seconds)}`
  }

  const nextImage = tempResult => {
    if (tempResult === 2) {
      clearValues(2)
    } else {
      setSelectionCounter(0)
      const tempArray = toRememberImgArray.map(storedImage => {
        return {
          ...storedImage,
          selected: false
        }
      })
      dispatch(setToRememberImgArrayAction(tempArray))
    }
    if (
      imageIndex < toGuessImgArray.length - 1 &&
      !toGuessImgArray[imageIndex + 1].hidden
    ) {
      setImageIndex(prev => prev + 1)
    } else if (
      imageIndex < toGuessImgArray.length - 1 &&
      toGuessImgArray[imageIndex + 1].hidden
    ) {
      const result = toGuessImgArray.map(e => e.hidden)
      setImageIndex(() => result.indexOf(false, imageIndex + 1))
    } else if (!toGuessImgArray[0].hidden) {
      setImageIndex(0)
    } else {
      const result = toGuessImgArray.map(e => e.hidden)
      setImageIndex(() => result.indexOf(false))
    }
    if (imageIndex === -1) {
      const result = toGuessImgArray.map(e => e.hidden)
      setImageIndex(() => result.indexOf(false))
    }
  }

  const selectAnswer = (image, index) => {
    const updatedArray = toRememberImgArray.map((storedImage, indexMap) => {
      if (
        index === indexMap &&
        selectionCounter <= 1 &&
        !storedImage.selected
      ) {
        setSelectionCounter(prev => prev + 1)
        return {
          ...storedImage,
          selected: true
        }
      }
      if (storedImage.selected && index !== indexMap) {
        return storedImage
      }
      if (storedImage.selected && index === indexMap) {
        setSelectionCounter(prev => prev - 1)
        return {
          ...storedImage,
          selected: false
        }
      }
      return { ...storedImage, selected: false }
    })
    dispatch(setToRememberImgArrayAction(updatedArray))
  }

  const clearValues = (tempResult, reset) => {
    if (reset) {
      setTempResult(0)
      setSelectionCounter(0)
      const tempArray = toRememberImgArray.map(storedImage => {
        return {
          ...storedImage,
          selected: false,
          guessed: false
        }
      })

      dispatch(setToRememberImgArrayAction(tempArray))
    } else {
      if (tempResult === 2) {
        const updatedGuessArray = toGuessImgArray.map(storedImage => {
          if (storedImage.id === imageToGuessDisplayed().id) {
            return {
              ...storedImage,
              hidden: true
            }
          }
          return storedImage
        })
        dispatch(setToGuessImgArrayAction(updatedGuessArray))

        const updatedRemArray = toRememberImgArray.map(storedImage => {
          if (storedImage.selected === true) {
            return {
              ...storedImage,
              guessed: true,
              selected: false
            }
          }
          return {
            ...storedImage,
            selected: false
          }
        })

        dispatch(setToRememberImgArrayAction(updatedRemArray))
        setTotalResult(prev => prev + 2)
        setTempResult(0)
        setSelectionCounter(0)
      } else {
        const itemsForMutating = {
          condition: ['selected', true],
          change: ['guessed']
        }

        mutateImgArray(true, toRememberImgArray, itemsForMutating)
        setTimeout(() => {
          mutateImgArray(true, toRememberImgArray, itemsForMutating)
          setTempResult(0)
          setSelectionCounter(0)
          const tempArray = toRememberImgArray.map(storedImage => {
            return {
              ...storedImage,
              selected: false
            }
          })
          dispatch(setToRememberImgArrayAction(tempArray))
        }, 600)
      }
    }
  }

  const mutateImgArray = (needIf, array, { condition, change }) => {
    const tempArray = array.map(storedImage => {
      if (needIf ? storedImage[condition[0]] === condition[1] : true) {
        return {
          ...storedImage,
          [change[0]]: !storedImage[change[0]]
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
      setGameLives(gameLives => gameLives - 1)
    }
  }

  const checkSelection = () => {
    let result = 0
    toRememberImgArray.forEach(storedImage => {
      if (
        storedImage.selected &&
        storedImage.id === imageToGuessDisplayed().id
      ) {
        result += 1
        setTempResult(tempResult => tempResult + 1)
      }
    })
    result === 2 ? nextImage(2) : failedAttempt()
  }

  const resetGame = firstRender => {
    dispatch(setTimerEndAction(false))

    const tempArray = toRememberImgArray.map(storedImage => {
      return {
        ...storedImage,
        guessed: false
      }
    })

    dispatch(setToRememberImgArrayAction(tempArray))

    const updatedGuessArray = toGuessImgArray.map(storedImage => {
      return {
        ...storedImage,
        hidden: false
      }
    })
    dispatch(setToGuessImgArrayAction(updatedGuessArray))
    setGameLives(3)
    setFlipCards(false)

    if (!firstRender) {
      setTempResult(0)
      setSelectionCounter(0)
      setTotalResult(0)
      setImageIndex(0)
      dispatch(startTimerAfterStart())
    }
  }

  useEffect(() => {
    dispatch(setTimerEndAction(false))

    clearValues(null, true)
    setTempResult(0)
    setSelectionCounter(0)
    setTotalResult(0)
    setImageIndex(0)
    resetGame(true)
    dispatch(startTimerAfterStart())
  }, [])

  useEffect(() => {}, [tempResult])

  useEffect(() => {}, [flipCards])

  useEffect(() => {
    if (toRememberImgArray.length === totalResult) {
      dispatch(stopTimer)
      history.push('/results')
    }
  }, [totalResult])

  useEffect(() => {
    if (gameLives < 0) {
      dispatch(stopTimer)
      history.push('/gameover')
    }
  }, [gameLives])

  useEffect(() => {
    if (timerEnd) {
      setFlipCards(true)
      dispatch(startTimerAfterFlip())
    }
  }, [timerEnd])

  return (
    <>
      <div className={classes.game}>
        <div className={classes.header}>
          <Slider
            className={classes.sizeSlider}
            min="50"
            max="300"
            step="1"
            value={sizeOfImg}
            padding="0 10px"
            onChange={event => dispatch(setSizeOfImgAction(event.target.value))}
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
        <div className={classes.gameContent}>
          <div className={classes.imgToRememberContainer}>
            {dataFetched && (
              <ul className={classes.imageList}>
                {toRememberImgArray.map((image, index) => (
                  <li key={index}>
                    <div
                      style={{ height: sizeOfImg + 'px' }}
                      className={`${classes.imgListItem}
                  ${
                    flipCards && !image.guessed ? classes.imgListItemFlip : ''
                  } ${!flipCards || image.guessed ? classes.pointerEvent : ''}`}
                      onClick={() => selectAnswer(image, index)}
                    >
                      <div
                        className={classes.backCard}
                        style={{
                          height: sizeOfImg + 'px',
                          width: sizeOfImg + 'px',
                          transform: ' translateZ(' + sizeOfImg / 2 + 'px)'
                        }}
                      >
                        <img
                          src={
                            image.urls.raw +
                            '&fit=crop&w=' +
                            sizeOfImg +
                            '&h=' +
                            sizeOfImg
                          }
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          height: sizeOfImg + 'px',
                          width: sizeOfImg + 'px',
                          transform:
                            'rotateX(-90deg) translateZ(-' +
                            sizeOfImg / 2 +
                            'px)',
                          backgroundPosition: `${(100 / numberOfImg) *
                            index}% ${(100 / numberOfImg) * index}%`
                        }}
                        className={`${classes.frontCard}
                        ${image.selected && classes.selected}
                      `}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={classes.selectImg}>
            {dataFetched && (
              <div className={classes.taskImgContainer}>
                <div style={{ height: 200 + 'px' }}>
                  <Timer
                    className={`${flipCards && classes.hideImg} ${!flipCards &&
                      classes.showImg}`}
                  />
                </div>
                <img
                  className={`${flipCards && classes.showImg} ${!flipCards &&
                    classes.hideImg}`}
                  src={
                    imageToGuessDisplayed().urls.raw + '&fit=crop&w=200&h=200'
                  }
                  alt=""
                />
              </div>
            )}
            <div
              className={`${classes.buttonContainer} ${flipCards &&
                classes.showBtn} ${!flipCards && classes.hideBtn}`}
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
      </div>
    </>
  )
}
