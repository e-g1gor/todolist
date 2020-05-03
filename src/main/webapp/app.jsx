'use strict'

let React = require('react')
let ReactDOM = require('react-dom')


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
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
    let hello = 'Hello, world(if)!'
    return pug`
    .list
      .card
        p Name
      .card
      .card
      .card
      .card
      .card
    .list
      .card
      .card
    .list
      .card
      .card
      .card
      .card
        `;
  }
}



// ENTRY POINT
window.onload = () => {
  document.title = "JS loaded"
  // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))
  ReactDOM.render(
    pug`Body`,
    document.getElementById('body')
  )
}