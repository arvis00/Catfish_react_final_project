import React from 'react'
import classes from './ContainerWithCards.module.scss'
import {
  getToRememberImgArray,
  getSizeOfImg,
  getFlipCards,
  getSelectionCounter,
  getNumberOfImg
} from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { setToRememberImgArrayAction } from '../../redux/actionCreators'
import { setSelectionCounterAction } from '../../redux/actions'

export const ContainerWithCards = () => {
  const toRememberImgArray = useSelector(getToRememberImgArray)
  const sizeOfImg = useSelector(getSizeOfImg)
  const flipCards = useSelector(getFlipCards)
  const selectionCounter = useSelector(getSelectionCounter)
  const numberOfImg = useSelector(getNumberOfImg)

  const dispatch = useDispatch()

  // const rowlength = Math.floor(
  //   document.body.clientWidth / sizeOfImg
  // )
  // console.log('rowlength', rowlength)

  const selectAnswer = (image, index) => {
    const updatedArray = toRememberImgArray.map((storedImage, indexMap) => {
      if (
        index === indexMap &&
        selectionCounter <= 1 &&
        !storedImage.selected
      ) {
        dispatch(setSelectionCounterAction(null, true))
        console.log('selected', toRememberImgArray)
        console.log('counter', selectionCounter)

        return {
          ...storedImage,
          selected: true
        }
      }
      if (storedImage.selected && index !== indexMap) {
        return storedImage
      }
      if (storedImage.selected && index === indexMap) {
        dispatch(setSelectionCounterAction(null, false, true))
        return {
          ...storedImage,
          selected: false
        }
      }
      return { ...storedImage, selected: false }
    })
    dispatch(setToRememberImgArrayAction(updatedArray))
  }

  return (
    <div className={classes.imgToRememberContainer}>
      <ul className={classes.imageList}>
        {toRememberImgArray.map((image, index) => (
          // {index===7&&<br>}
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
                    'rotateX(-90deg) translateZ(-' + sizeOfImg / 2 + 'px)',
                  backgroundPosition: `${(100 / numberOfImg) * index}% ${(100 /
                    numberOfImg) *
                    index}%`
                }}
                className={`${classes.frontCard}
                        ${image.selected && classes.selected}
                      `}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
