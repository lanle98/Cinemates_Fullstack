import React, { Component } from "react";

export class Nav extends Component {
  state = {
    input: ""
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.searchMovie(this.state.input);
  };
  render() {
    return (
      <nav className="text-center p-3 mb-5">
        <h1>The Cinemates</h1>
        <form onSubmit={this.onSubmit}>
          <input
            name="search"
            placeholder="search movie"
            onChange={this.onChange}
          ></input>
          <button type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default Nav;
