import React from 'react'
import classes from './Button.module.scss'

export const Button = ({ children, className, onClick }) => {
  return (
    <>
      <button className={`${classes.button} ${className}`} onClick={onClick}>
        {children}
      </button>
    </>
  )
}
