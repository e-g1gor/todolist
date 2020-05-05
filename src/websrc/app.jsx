'use strict'

let React = require('react')
let ReactDOM = require('react-dom')

// class List extends React.Component {
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
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
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
    return pug`
    p.white React example: #{this.state.date.toLocaleTimeString()}.
    each list in Object.keys(this.state.lists)
      .list.unselect
        p=list
        each card in this.state.lists[list]
          .card
            p=card
        `;
  }
}



// ENTRY POINT
window.onload = () => {
  document.title = "JS loaded"
  // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))
  ReactDOM.render(
    pug`Kanban`,
    document.getElementById('container')
  )
}