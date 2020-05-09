'use strict'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const pug: any


let React = require('react')
let ReactDOM = require('react-dom')



async function syncLists() {
  let rezult = {}
  let cards: any
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
class Controller {
  static async  updateCard(card: { id: Number; name: string }) {
    return fetch('/cards',
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      })
  }

  static async addCard(card: { name: string, list: Number, order: Number }) {
    return fetch('/cards',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      })
  }

  static async deleteCard(id) {
    return fetch('/cards?id='+id, {method: 'DELETE'})
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
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  editCard(e: KeyboardEvent, list, card) {
    if (this.state.editedCard !== card) {
      this.setState({ editedCard: card })
      return
    }
    // Save or discard
    let cardInput = document.querySelectorAll(`.card[data-key="${card}"]>.card_text`)[0] as HTMLElement
    // alert
    let name = cardInput.innerText
    if (e.key === "Escape")
      cardInput.innerText = this.state.lists[list].cards[card].name
    if (e.which === 13)
      Controller.updateCard({ id: card, name: name })
    if (e.which === 13 || e.key === "Escape")
      this.setState({ editedCard: null })
  }

  addCard(e: KeyboardEvent, list, order) {
    e.preventDefault()
    let name = (document.querySelectorAll(`.list[data-key="${list}"] > form > input[type="text"]`)[0] as HTMLInputElement).value
    Controller.addCard({name, list, order})
  }

  deleteCard(e: KeyboardEvent, card) {
    e.stopPropagation()
    e.preventDefault()
    console.log("TODO: del card request")
    Controller.deleteCard(card)
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
      - let list = this.state.lists[listid];
      .list.unselect(data-key=listid key=listid)
        h1=list.name
        each cardid in Object.keys(list.cards)
          - let card = list.cards[cardid], isEdited = (this.state.editedCard === cardid);
          .card(data-key=cardid key=cardid className=isEdited?"card-edited":null
              onKeyDown= (e) => this.editCard(e, listid, cardid)
              onClick = (e) => this.editCard(e, listid, cardid)
              )
            .card_text(contentEditable=isEdited?true:null
              suppressContentEditableWarning=true
              )=card.name
            .card_del(
              className=isEdited?"card_del-edited":null
              onClick = (e) => this.deleteCard(e, cardid)) X
        form.list_addcard
          input(type="text" placeholder="new card name")
          input(type="button" value="ADD CARD" onClick = (e) => this.addCard(e, listid, Object.keys(list.cards).length))
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