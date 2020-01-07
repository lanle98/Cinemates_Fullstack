import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Nav extends Component {
  state = {
    input: ""
  };

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // e.target.input.value = "";
    this.props.searchMovie(this.state.input);
  };
  render() {
    return (
      <nav className="text-center p-3 mb-5">
        <h1>
          <Link to="/" onClick={this.props.home}>
            The Cinemates
          </Link>
        </h1>

        <form action={`/search?input=${this.state.input}`}>
          <input
            name="input"
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
