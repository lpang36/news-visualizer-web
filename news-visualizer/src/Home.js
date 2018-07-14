import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from "jquery";

class Home extends Component {
  handleClick() {
    var query = document.getElementById("namanyay-search-box").value
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    ReactDOM.render(<App query={query}/>,document.getElementById('root'))
  }
  render() {
    return (
      <div className="Home">
        <p>enter a topic</p>
        <input type="text" id="namanyay-search-box"></input>
        <button id="namanyay-search-btn" onClick={this.handleClick}>search</button>
      </div>
    )
  }
}

export default Home