'use strict'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const pug: any
import ReactDOM from 'react-dom'
import React from 'react'
import Board from './Board'


// ENTRY POINT
window.onload = () => {
  document.title = "JS is modifying this page"
  ReactDOM.render(
    <Board></Board>,
    document.getElementById('board')
  )
}