'use strict'; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _Board = _interopRequireDefault(require("./Board"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ENTRY POINT
window.onload = () => {
  document.title = "JS is modifying this page";

  _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Board.default, null), document.getElementById('board'));
};