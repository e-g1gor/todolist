'use strict'

interface FormElements extends HTMLFormControlsCollection {
  id?: HTMLInputElement
  name: HTMLInputElement
  order: HTMLInputElement
  list: HTMLInputElement
}

// Write card changes to db
export default class Controller {

  static openEditor(e: Event, card: HTMLElement) {
    CardEditor.div.classList.remove("card_editor-hidden")
    let elements = CardEditor.form.elements as FormElements
    elements.name.focus()
    elements.name.value = card.dataset.name
    elements.list.value = card.dataset.list
    elements.order.value = card.dataset.order
    elements.id.value = card.dataset.key
  }

  static cancelEdit() {
    CardEditor.div.classList.add("card_editor-hidden")
  }

  static async updateCard(e: Event, form: HTMLFormElement) {
    e.preventDefault()
    let elements = form.elements as FormElements
    // Get form info
    let card = {
      id: elements.id.value,
      name: elements.name.value,
      order: elements.order.value,
      list: elements.list.value
    }
    // Update card
    let rez = await fetch('/cards',
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      })
    // Close editor
    Controller.cancelEdit()
    // Reload page after request
    location.reload();
  }

  static async addCard(e: Event, form: HTMLFormElement) {
    e.preventDefault()

    let elements = form.elements as FormElements
    // Get form info
    let card = {
      name: elements.name.value,
      order: elements.order.value,
      list: elements.list.value
    }
    // Add new card
    let rez = await fetch('/cards',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      })
    // Reload page after request
    location.reload();
  }

  static async deleteCard(e: Event, id: number) {
    e.stopPropagation()
    // Delete card by id
    let rez = await fetch('/cards?id=' + id, { method: 'DELETE' })
    // Reload page after request
    location.reload();
  }
}

