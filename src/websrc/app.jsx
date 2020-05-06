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

// Write card changes to db
async function updateCard(id, name) {
  return fetch('/cards',
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, name: name })
    })
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
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  editCard(e, list, card) {
    if (this.state.editedCard === null) return
    // Save or discard
    let cardInput = document.querySelectorAll(`.card[data-key="${card}"]`)[0]
    let name = cardInput.innerText
    if (e.key === "Escape")
      cardInput.innerText = this.state.lists[list].cards[card].name
    if (e.which === 13) 
      updateCard(card, name)
    if (e.which === 13 || e.key === "Escape")
      this.setState({ editedCard: null })
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
      .list.unselect(data-key=listid key=listid)
        h1=list.name
        each cardid in Object.keys(list.cards)
          - let card = list.cards[cardid], isEdited = (this.state.editedCard === cardid)
          .card(data-key=cardid key=cardid
            className=isEdited?"card-edited":null
            contentEditable=isEdited?true:null
            suppressContentEditableWarning=true
            onKeyDown= (e) => this.editCard(e, listid, cardid)
            onClick = () => this.setState({ editedCard: cardid })
            )=card.name
        .card_add ADD CARD
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