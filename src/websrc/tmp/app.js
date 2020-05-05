'use strict';

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
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      lists: {}
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 300);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
        className: "list unselect"
      }, /*#__PURE__*/React.createElement("h1", null, _list.name), Object.keys(_list.cards).map(cardid => {
        let _card;

        return [(_card = _list.cards[cardid], null), /*#__PURE__*/React.createElement("div", {
          "data-key": cardid,
          className: "card"
        }, /*#__PURE__*/React.createElement("p", null, _card.name))];
      }))];
    }));
  }

} // ENTRY POINT


window.onload = () => {
  document.title = "JS loaded"; // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))

  ReactDOM.render( /*#__PURE__*/React.createElement(Board, null), document.getElementById('board'));
};