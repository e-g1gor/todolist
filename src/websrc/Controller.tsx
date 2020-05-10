'use strict'

// Write card changes to db
export default class Controller {
  
  static async updateCard(card: { id: Number; name: string }) {
    return fetch('/cards/patch',
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
    return fetch('/cards/post',
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
    return fetch('/cards/delete?id='+id, {method: 'DELETE'})
  }
}

