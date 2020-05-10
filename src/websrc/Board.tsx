'use strict'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const pug: any

import Controller from './RestController'
import React from 'react'

interface State {
  date: Date
  editedCard: number|null
  lists: {
    cards ?: {
      id:number
      name:string
    }
  }
}

interface Props {}

export default class Board extends React.Component<Props, State> {

  timerID: NodeJS.Timeout

  constructor(props: Readonly<Props>) {
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
    let cardInput = document.querySelector(`.card[data-key="${card}"]>.card_text`) as HTMLElement
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
    let text = document.querySelector(`.list[data-key="${list}"] > form > input[type="text"]`) as HTMLInputElement
    Controller.addCard({name:text.value, list, order})
    text.value = ""
  }

  deleteCard(e: KeyboardEvent, card) {
    e.stopPropagation()
    e.preventDefault()
    console.log("TODO: del card request")
    Controller.deleteCard(card)
  }

  // Sync dada
  async tick() {
    let lists = await Controller.syncLists()
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
                onClick = (e) => this.deleteCard(e, cardid)) Z
          form.list_addcard(method="POST" action="/cards" onSubmit = (e) => this.addCard(e, listid, Object.keys(list.cards).length) )
            input(name="name" type="text" placeholder="new card" autocomplete="off" onSubmit= e => e.target.value='')
            input(name="list" value=listid type="hidden")
            input(type="submit" value="ADD CARD")
      p next
      `;
  }
}
