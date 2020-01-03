import React, { Component } from "react";

export class Movie extends Component {
  state = {
    overview: this.props.movie.overview,
    backdrop_path: this.props.movie.backdrop_path,
    id: this.props.movie.id
  };

  render() {
    const { title, poster_path } = this.props.movie;
    return (
      <div
        className="col-lg-2 col-md-3 col-12 movie p-0 shadow-lg"
        onMouseEnter={this.props.mouseEnter}
        onMouseLeave={this.props.mouseLeave}
        onClick={this.props.showInfo.bind(
          this,
          this.state.overview,
          this.state.backdrop_path,
          this.state.id,
          this.props.movie.title
        )}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={title}
          className="w-100"
        />
        {/* <h4 className="text-center title">{title}</h4> */}
      </div>
    );
  }
}

export default Movie;
