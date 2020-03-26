import React from 'react'
import classes from './Gameover.module.scss'
import { Button } from '../../components/Button/Button'
import { BrowserRouter, Link } from 'react-router-dom'
import { fetchImages } from '../../redux/actions'

export const Gameover = () => {
  return (
    <div>
      <div className={classes.gameover}>
        <h1>GAME OVER!</h1>
        <BrowserRouter>
          <Link to="/game">
            <Button className={classes.gamoverBtn} onClick={fetchImages}>
              TRY AGAIN
            </Button>
          </Link>
        </BrowserRouter>
        <BrowserRouter>
          <Link to="/">
            <Button className={classes.gamoverBtn}>HOME</Button>
          </Link>
        </BrowserRouter>
      </div>
    </div>
  )
}
