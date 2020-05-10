'use strict';

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Controller = _Controller.default; // ENTRY POINT

window.onload = () => {
  document.title = "JS is modifying this page";
  window.CardEditor = {
    div: document.querySelector(".card_editor"),
    form: document.querySelector(".card_editor>form")
  };
};