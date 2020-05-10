(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Write card changes to db
class Controller {
  static openEditor(e, card) {
    CardEditor.div.classList.remove("card_editor-hidden");
    let elements = CardEditor.form.elements;
    elements.name.focus();
    elements.name.value = card.dataset.name;
    elements.list.value = card.dataset.list;
    elements.order.value = card.dataset.order;
    elements.id.value = card.dataset.key;
  }

  static cancelEdit() {
    CardEditor.div.classList.add("card_editor-hidden");
  }

  static async updateCard(e, form) {
    e.preventDefault();
    let elements = form.elements; // Get form info

    let card = {
      id: elements.id.value,
      name: elements.name.value,
      order: elements.order.value,
      list: elements.list.value
    }; // Update card

    let rez = await fetch('/cards', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    }); // Close editor

    Controller.cancelEdit(); // Reload page after request

    location.reload();
  }

  static async addCard(e, form) {
    e.preventDefault();
    let elements = form.elements; // Get form info

    let card = {
      name: elements.name.value,
      order: elements.order.value,
      list: elements.list.value
    }; // Add new card

    let rez = await fetch('/cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    }); // Reload page after request

    location.reload();
  }

  static async deleteCard(e, id) {
    e.stopPropagation(); // Delete card by id

    let rez = await fetch('/cards?id=' + id, {
      method: 'DELETE'
    }); // Reload page after request

    location.reload();
  }

}

exports.default = Controller;
},{}],2:[function(require,module,exports){
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
},{"./Controller":1}]},{},[2]);
