import React from 'react'
import classes from './Loader.module.scss'
import Spinner from 'react-loader-spinner'

export const Loader = () => {
  return (
    <div className={classes.background}>
      <Spinner
        type="CradleLoader"
        color="#00BFFF"
        height={600}
        width={600}
        timeout={2000}
      />
    </div>
  )
}
