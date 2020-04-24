'use strict'


// Show loaded books
function render(data, error) {
  if (error) {
    output.innerHTML = JSON.stringify(data)
    return
  }
  let output = document.getElementById('output')
  let rez
  if (typeof data === 'string')
    rez = data
  else
    rez = `<table>${new Array(...data).map(x => "<tr><td>" + x.name + "</td></tr>").join("\n")}<table>`
  output.innerHTML = rez
}


// Load books list, show result
function getBooks(lang) {
  fetch('/all')
    .then(response => response.json())
    .then(render)
    .catch(err => render(err, false))
}


// ENTRY POINT
window.onload = () => {
  // Get all books
  getBooks('all')

  // If language changed, load new list
  document
    .getElementById('selectlang')
    .addEventListener('change', (e) => {
      // Show loading message
      render('Загрузка...')
      // Get data
      let lang = e.target[e.target.selectedIndex].value.replace(/[^a-z]/igm, '')
      getBooks(lang)
    })
}