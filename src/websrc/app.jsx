'use strict'

let React = require('react')
let ReactDOM = require('react-dom')



async function syncLists() {
  let rezult = {}
  let cards
  let lists = await (await fetch("/lists")).json()
  // Load data
  for (let list of lists) {
    rezult[list.id] = { name: list.name, cards: {} }
    cards = await (await fetch("/cards?list=" + list.id)).json()
    for (let card of cards)
      rezult[list.id].cards[card.id] = { name: card.name }
  }
  // Return
  return rezult
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
    this.timerID = setInterval(
      () => this.tick(),
      300
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  // Sync dada
  async tick() {
    let lists = await syncLists()
    this.setState({
      date: new Date(),
      lists: lists
    });
  }

  render() {
    return pug`
    p.white React example: #{this.state.date.toLocaleTimeString()}.
    each listid in Object.keys(this.state.lists)
      - let list = this.state.lists[listid]
      .list.unselect
        h1=list.name
        each cardid in Object.keys(list.cards)
          - let card = list.cards[cardid]
          .card(data-key=cardid)
            p=card.name
        `;
  }
}

// ☒

// ENTRY POINT
window.onload = () => {
  document.title = "JS loaded"
  // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))
  ReactDOM.render(
    pug`Board`,
    document.getElementById('board')
  )
}