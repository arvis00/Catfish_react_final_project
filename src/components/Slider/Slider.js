import React from 'react'
import classes from './Slider.module.scss'

export const Slider = ({
  children,
  padding,
  value,
  min,
  max,
  step,
  className,
  onChange,
  classNameText
}) => {
  return (
    <>
      <div
        className={`${classes.slideContainer} ${className}`}
        style={{ padding: padding }}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          className={classes.slider}
          value={value}
          onChange={onChange}
        />
        <p className={classNameText}>
          {children} {value}
        </p>
      </div>
    </>
  )
}
