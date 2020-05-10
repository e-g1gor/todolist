'use strict'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const pug: any
import ReactDOM from 'react-dom'
import React from 'react'
import Board from './Board'

import Controller from './Controller'
declare global {
  interface Window {Controller: Controller}
}
window.Controller=Controller

// ENTRY POINT
window.onload = () => {
  document.title = "JS is modifying this page"
  // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))
  // ReactDOM.render(
  //   <Board></Board>,
  //   document.getElementById('board')
  // )
}