import React from 'react'
import classes from './Gameover.module.scss'
import { Button } from '../../components/Button/Button'
import { BrowserRouter, Link } from 'react-router-dom'
import { fetchImages } from '../../redux/actions'

export const Gameover = () => {
  //BUG Try Again button does not work
  return (
    <>
      <div className={classes.gameover}>
        <h1>GAME OVER!</h1>
        <Link to="/game">
          <Button className={classes.gamoverBtn} onClick={fetchImages}>
            TRY AGAIN
          </Button>
        </Link>
        <Link to="/">
          <Button className={classes.gamoverBtn}>HOME</Button>
        </Link>
      </div>
    </>
  )
}
