'use strict'; // eslint-disable-next-line @typescript-eslint/no-explicit-any

let React = require('react');

let ReactDOM = require('react-dom');

async function syncLists() {
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
} // Write card changes to db


class Controller {
  static async updateCard(card) {
    return fetch('/cards', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    });
  } // static async  addCard(card: {name: string }) {
  //   return fetch('/cards',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(card)
  //     })
  // }


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


    let cardInput = document.querySelectorAll(`.card[data-key="${card}"]>.card_text`)[0]; // alert

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

  addCard(e) {
    e.preventDefault();
    console.log("TODO: add card request");
  }

  deleteCard(e, list, card) {
    e.stopPropagation();
    e.preventDefault();
  } // Sync dada


  async tick() {
    let lists = await syncLists();
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
          onClick: e => this.deleteCard(e, listid, cardid),
          className: "card_del " + (_isEdited ? "card_del-edited" : null)
        }, "X"))];
      }), /*#__PURE__*/React.createElement("div", {
        className: "list_addcard"
      }, /*#__PURE__*/React.createElement("textarea", {
        placeholder: "new card name"
      }), /*#__PURE__*/React.createElement("div", null, "ADD CARD")))];
    }));
  }

} // ☒ 
// ENTRY POINT


window.onload = () => {
  document.title = "JS loaded"; // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))

  ReactDOM.render( /*#__PURE__*/React.createElement(Board, null), document.getElementById('board'));
};