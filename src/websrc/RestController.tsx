'use strict'

// Write card changes to db
export default class Controller {


  static async syncLists() {
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

  static async updateCard(card: { id: Number; name: string }) {
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

