import React, { useEffect, useState } from 'react'
import classes from './Game.module.scss'
import { Slider } from '../../components/Slider/Slider'
import { Timer } from '../../components/Timer/Timer'
import { Button } from '../../components/Button/Button'
import { BrowserRouter, Link, Redirect } from 'react-router-dom'
import {
  getToGuessImgArray,
  getTimePassedAfterFlip,
  getToRememberImgArray,
  getSizeOfImg,
  getNumberOfImg,
  getDataFetched
} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import {
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setSizeOfImgAction,
  setDataFetchedAction
} from '../../redux/actionCreators'
import {
  stopTimer,
  startTimerAfterStart,
  startTimerAfterFlip
} from '../../redux/actions'
import { useHistory } from 'react-router-dom'

export const Game = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const [selectionCounter, setSelectionCounter] = useState(0)
  const [tempResult, setTempResult] = useState(0)
  const [totalResult, setTotalResult] = useState(0)
  const [flipCards, setFlipCards] = useState(false)
  const [gameLives, setGameLives] = useState(3)
  const [itemsForMutating, setItemsForMutating] = useState({
    condition: [],
    change: []
  })
  const toGuessImgArray = useSelector(getToGuessImgArray)
  const timePassedAfterFlip = useSelector(getTimePassedAfterFlip)
  const toRememberImgArray = useSelector(getToRememberImgArray)
  const sizeOfImg = useSelector(getSizeOfImg)
  const numberOfImg = useSelector(getNumberOfImg)
  const dataFetched = useSelector(getDataFetched)

  const history = useHistory()
  const dispatch = useDispatch()

  const imageToGuessDisplayed = () => {
    console.log(toGuessImgArray[imageIndex])

    return toGuessImgArray[imageIndex]
  }

  const makeTwoDigitTimer = n => (n < 10 ? '0' : '') + n

  const changeTimeFormat = () => {
    const minutes = Math.floor(timePassedAfterFlip / 60)
    const seconds = timePassedAfterFlip % 60
    return `${makeTwoDigitTimer(minutes)}:${makeTwoDigitTimer(seconds)}`
  }

  // const text = changeTimeFormat()

  const nextImage = () => {
    if (tempResult === 2) {
      clearValues()
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

  const clearValues = () => {
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
        return storedImage
      })
      dispatch(setToRememberImgArrayAction(updatedRemArray))
      console.log(toRememberImgArray)
      setTotalResult(prev => prev + 2)
      setTempResult(0)
      setSelectionCounter(0)
      const tempArray = toRememberImgArray.map(storedImage => {
        return {
          ...storedImage,
          selected: false
        }
      })
      dispatch(setToRememberImgArrayAction(tempArray))
    } else {
      // flipIncorrectCardsTemp();
      const copyItemsForMutating = { ...itemsForMutating }
      copyItemsForMutating.condition = ['selected', true]
      copyItemsForMutating.change = ['guessed']
      setItemsForMutating(copyItemsForMutating)
      mutateImgArray(true, toRememberImgArray, itemsForMutating)
      setTimeout(() => {
        // flipIncorrectCardsTemp();
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

  // flipIncorrectCardsTemp () {
  //   console.log("timeout")

  //   const tempArray = toRememberImgArray.map(storedImage => {
  //     if (storedImage.selected === true && selectionCounter === 2) {
  //       return {
  //         ...storedImage,
  //         guessed: !storedImage.guessed
  //       }
  //     }
  //     return storedImage
  //   })
  //   setToRememberImgArray(tempArray)
  //   // const items = { condition: ["selected", true], change: ["guessed", false] }
  //   // mutateImgArray(toRememberImgArray, items)
  // }

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
    setGameLives(gameLives >= 0 && gameLives - 1)
    if (gameLives < 0) {
      dispatch(stopTimer())
      history.push('/gameover')
    }
  }

  const checkSelection = () => {
    toRememberImgArray.forEach(storedImage => {
      if (
        storedImage.selected &&
        storedImage.id === imageToGuessDisplayed().id
      ) {
        setTempResult(prev => prev + 1)
      }
    })
    tempResult === 2 ? nextImage() : failedAttempt()
  }

  const resetGame = () => {
    clearValues()
    setImageIndex(0)
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
    setTotalResult(0)
    dispatch(startTimerAfterStart())
  }

  useEffect(() => {
    if (localStorage.getItem('toRememberImg')) {
      const data = JSON.parse(localStorage.getItem('toRememberImg'))
      dispatch(setToRememberImgArrayAction(data))
      const result = JSON.parse(localStorage.getItem('toGuessImg')).map(
        storedImage => {
          return {
            ...storedImage,
            hidden: false
          }
        }
      )
      dispatch(setToGuessImgArrayAction(result))
      setDataFetchedAction(true)
    }

    setTempResult(0)
    setSelectionCounter(0)
    setTotalResult(0)
    setImageIndex(0)
    resetGame()
    dispatch(startTimerAfterStart())
  }, [])

  useEffect(() => {
    if (toRememberImgArray.length === totalResult) {
      dispatch(stopTimer)
      history.push('/results')
    }
  }, [totalResult])

  return (
    <div>
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
                  ${flipCards &&
                    !image.guessed &&
                    classes.imgListItemFlip} ${!flipCards ||
                        (image.guessed && classes.pointerEvent)}`}
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
                    className={`${classes.timerGame} ${flipCards &&
                      classes.hideImg} ${!flipCards && classes.showImg}`}
                    timerEnd={() => {
                      setFlipCards(true)
                      dispatch(startTimerAfterFlip())
                    }}
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
                <Button className={classes.bottomBtn} onClick={resetGame}>
                  RESET GAME
                </Button>
                <BrowserRouter>
                  <Link to="/" className={classes.homeLink}>
                    <Button className={classes.bottomBtn}>HOME</Button>
                  </Link>
                </BrowserRouter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
