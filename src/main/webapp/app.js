'use strict';

let React = require('react');

let ReactDOM = require('react-dom');

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
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
    let hello = 'Hello, world(if)!';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("p", null, "Name")), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    })), /*#__PURE__*/React.createElement("div", {
      className: "list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    })), /*#__PURE__*/React.createElement("div", {
      className: "list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card"
    })));
  }

} // ENTRY POINT


window.onload = () => {
  document.title = "JS loaded"; // document.getElementsByClassName("card").map(x=>x.addEventListener('click',()=>{alert('oppa!')}))

  ReactDOM.render( /*#__PURE__*/React.createElement(Body, null), document.getElementById('body'));
};