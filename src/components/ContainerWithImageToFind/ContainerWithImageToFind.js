import React from 'react'
import classes from './ContainerWithImageToFind.module.scss'
import { useSelector } from 'react-redux'
import { getFlipCards } from '../../redux/selectors'
import { Timer } from '../Timer/Timer'

export const ContainerWithImageToFind = ({ imageToGuessDisplayed }) => {
  const flipCards = useSelector(getFlipCards)

  return (
    <>
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
          src={imageToGuessDisplayed.urls.raw + '&fit=crop&w=200&h=200'}
          alt=""
        />
      </div>
    </>
  )
}
