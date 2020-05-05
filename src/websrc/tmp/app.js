'use strict';

let React = require('react');

let ReactDOM = require('react-dom'); // class List extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { cards: ["some cards maybe?"] };
//   }
//   render() {
//     return pug`.list`
//   }
// }


class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      lists: {
        list1: ["card1?", "card2 maybe"],
        list2: ["dsfasfasf?", "qwef", "dsfasfasf?", "qwef", "dsfasfasf?", "qwef"],
        oof: ["oof"]
      }
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "white"
    }, "React example: ", this.state.date.toLocaleTimeString(), "."), Object.keys(this.state.lists).map(list => {
      return /*#__PURE__*/React.createElement("div", {
        className: "list unselect"
      }, /*#__PURE__*/React.createElement("p", null, list), this.state.lists[list].map(card => {
        return /*#__PURE__*/React.createElement("div", {
          className: "card"
        }, /*#__PURE__*/React.createElement("p", null, card));
      }));
    }));
  }

} // ENTRY POINT


window.onload = () => {
  document.title = "JS loaded"; // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))

  ReactDOM.render( /*#__PURE__*/React.createElement(Kanban, null), document.getElementById('container'));
};