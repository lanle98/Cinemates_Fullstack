import React, { Component } from "react";
import Movie from "./Movie";

export class List extends Component {
  render() {
    return this.props.movies.map(movie => {
      return (
        <Movie
          key={movie.id}
          movie={movie}
          mouseEnter={this.props.mouseEnter}
          mouseLeave={this.props.mouseLeave}
          showInfo={this.props.showInfo}
        />
      );
    });
  }
}

export default List;
