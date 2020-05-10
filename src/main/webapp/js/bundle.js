(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'; // Write card changes to db

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Controller {
  static async updateCard(card) {
    return fetch('/cards/patch', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    });
  }

  static async addCard(card) {
    return fetch('/cards/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    });
  }

  static async deleteCard(id) {
    return fetch('/cards/delete?id=' + id, {
      method: 'DELETE'
    });
  }

}

exports.default = Controller;
},{}],2:[function(require,module,exports){
'use strict'; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Controller = _Controller.default; // ENTRY POINT

window.onload = () => {
  document.title = "JS is modifying this page"; // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))
  // ReactDOM.render(
  //   <Board></Board>,
  //   document.getElementById('board')
  // )
};
},{"./Controller":1}]},{},[2]);
