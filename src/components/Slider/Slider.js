import React from 'react'
import classes from './Slider.module.scss'

export const Slider = ({ children, padding, value, range, min, max, step }) => {
  return (
    <div>
      <div className={classes.slideContainer} style={{ padding: padding }}>
        <input
          type={range}
          min={min}
          max={max}
          step={step}
          className={classes.slider}
          value={value}
        />
        <p>
          {children} {value}
        </p>
      </div>
    </div>
  )
}
