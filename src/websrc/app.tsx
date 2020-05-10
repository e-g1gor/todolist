'use strict'

import Controller from './Controller'
declare global {
  const CardEditor: {div:HTMLDivElement, form: HTMLFormElement}
  interface Window {
    Controller: Controller
    CardEditor:  {div:HTMLDivElement, form: HTMLFormElement}
  }
}
window.Controller=Controller

// ENTRY POINT
window.onload = () => {
  document.title = "JS is modifying this page"
  window.CardEditor = {
    div: document.querySelector(".card_editor"), form: document.querySelector(".card_editor>form")}
}