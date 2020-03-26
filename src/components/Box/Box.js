import React from 'react'
import classes from './Box.module.scss'

export const Box = ({
  children,
  size,
  BgColorFront,
  fontSizeFront,
  paddingCenterFront,
  paddingCenterBack,
  textFront,
  BgColorBack,
  fontSizeBack,
  textBack
}) => {
  const clickOnBox = event => {
    event.click()
  }

  return (
    <>
      <div className={classes.imgListItem} style={{ height: size + 'px' }}>
        <div
          className={classes.backCard}
          style={{
            height: size + 'px',
            width: size + 'px',
            transform: ' translateZ(' + size / 2 + 'px)',
            backgroundColor: BgColorFront,
            fontSize: fontSizeFront
          }}
        >
          <p
            className={classes.textFront}
            style={{ padding: paddingCenterFront }}
          >
            {textFront}
          </p>
        </div>
        <div
          className={classes.frontCard}
          style={{
            height: size + 'px',
            width: size + 'px',
            transform: 'rotateX(-90deg) translateZ(-' + size / 2 + 'px)',
            backgroundColor: BgColorBack,
            fontSize: fontSizeBack
          }}
          onClick={clickOnBox}
        >
          <p
            className={classes.textBack}
            style={{ padding: paddingCenterBack }}
          >
            {textBack}
          </p>
          {children}
        </div>
      </div>
    </>
  )
}
