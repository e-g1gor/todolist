'use strict'; // eslint-disable-next-line @typescript-eslint/no-explicit-any

let React = require('react');

let ReactDOM = require('react-dom'); // Write card changes to db


class Controller {
  static async syncLists() {
    let rezult = {};
    let cards;
    let lists = await (await fetch("/lists")).json(); // Load data

    for (let list of lists) {
      rezult[list.id] = {
        name: list.name,
        cards: {}
      };
      cards = await (await fetch("/cards?list=" + list.id)).json();

      for (let card of cards) rezult[list.id].cards[card.id] = {
        name: card.name
      };
    } // Return


    return rezult;
  }

  static async updateCard(card) {
    return fetch('/cards', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    });
  }

  static async addCard(card) {
    return fetch('/cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    });
  }

  static async deleteCard(id) {
    return fetch('/cards?id=' + id, {
      method: 'DELETE'
    });
  }

}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedCard: null,
      date: new Date(),
      lists: {}
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  editCard(e, list, card) {
    if (this.state.editedCard !== card) {
      this.setState({
        editedCard: card
      });
      return;
    } // Save or discard


    let cardInput = document.querySelector(`.card[data-key="${card}"]>.card_text`); // alert

    let name = cardInput.innerText;
    if (e.key === "Escape") cardInput.innerText = this.state.lists[list].cards[card].name;
    if (e.which === 13) Controller.updateCard({
      id: card,
      name: name
    });
    if (e.which === 13 || e.key === "Escape") this.setState({
      editedCard: null
    });
  }

  addCard(e, list, order) {
    e.preventDefault();
    let text = document.querySelector(`.list[data-key="${list}"] > form > input[type="text"]`);
    Controller.addCard({
      name: text.value,
      list,
      order
    });
    text.value = "";
  }

  deleteCard(e, card) {
    e.stopPropagation();
    e.preventDefault();
    console.log("TODO: del card request");
    Controller.deleteCard(card);
  } // Sync dada


  async tick() {
    let lists = await Controller.syncLists();
    this.setState({
      date: new Date(),
      lists: lists
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "white"
    }, "React example: ", this.state.date.toLocaleTimeString(), "."), Object.keys(this.state.lists).map(listid => {
      let _list;

      return [(_list = this.state.lists[listid], null), /*#__PURE__*/React.createElement("div", {
        "data-key": listid,
        key: listid,
        className: "list unselect"
      }, /*#__PURE__*/React.createElement("h1", null, _list.name), Object.keys(_list.cards).map(cardid => {
        let _card, _isEdited;

        return [(_card = _list.cards[cardid], _isEdited = this.state.editedCard === cardid, null), /*#__PURE__*/React.createElement("div", {
          "data-key": cardid,
          key: cardid,
          onKeyDown: e => this.editCard(e, listid, cardid),
          onClick: e => this.editCard(e, listid, cardid),
          className: "card " + (_isEdited ? "card-edited" : null)
        }, /*#__PURE__*/React.createElement("div", {
          contentEditable: _isEdited ? true : null,
          suppressContentEditableWarning: true,
          className: "card_text"
        }, _card.name), /*#__PURE__*/React.createElement("div", {
          onClick: e => this.deleteCard(e, cardid),
          className: "card_del " + (_isEdited ? "card_del-edited" : null)
        }, "X"))];
      }), /*#__PURE__*/React.createElement("form", {
        method: "POST",
        action: "/cards",
        onSubmit: e => this.addCard(e, listid, Object.keys(_list.cards).length),
        className: "list_addcard"
      }, /*#__PURE__*/React.createElement("input", {
        name: "name",
        type: "text",
        placeholder: "new card",
        autocomplete: "off",
        onSubmit: e => e.target.value = ''
      }), /*#__PURE__*/React.createElement("input", {
        name: "list",
        value: listid,
        type: "hidden"
      }), /*#__PURE__*/React.createElement("input", {
        type: "submit",
        value: "ADD CARD"
      })))];
    }), /*#__PURE__*/React.createElement("p", null, "next"));
  }

} // ☒ 
// ENTRY POINT


window.onload = () => {
  document.title = "JS loaded"; // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))

  ReactDOM.render( /*#__PURE__*/React.createElement(Board, null), document.getElementById('board'));
};