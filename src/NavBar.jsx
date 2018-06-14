import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <h1>{this.props.userCount} {this.props.userCount > 1 ? 'users online' : 'user online'} </h1>
      </nav>
    );
  }
}

export default NavBar;
