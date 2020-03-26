import React from 'react'
import classes from './Button.module.scss'

export const Button = ({ children }) => {
  return (
    <div>
      <button className={classes.button}>{children}</button>
    </div>
  )
}
