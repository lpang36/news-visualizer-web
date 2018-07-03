import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from "jquery";

class Home extends Component {
  handleClick() {
    var query = document.getElementById("SearchString").value
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    ReactDOM.render(<App query={query}/>,document.getElementById('root'))
  }
  render() {
    return (
      <div className="Home">
        <p>Enter a query: </p>
        <input type="text" id="SearchString"></input>
        <button id="SearchButton" onClick={this.handleClick}>Search</button>
      </div>
    )
  }
}

export default Home