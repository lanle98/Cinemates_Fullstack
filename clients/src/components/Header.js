import React, { Component } from "react";

export class Header extends Component {
  state = {
    movie: [],
    index: 0
  };
  nextSlide = () => {
    if (this.state.index === 80) {
      return;
    } else {
      this.setState({ index: this.state.index + 20 });
    }
  };

  prevSlide = () => {
    if (this.state.index === 0) {
      return;
    } else {
      this.setState({ index: this.state.index - 20 });
    }
  };

  render() {
    return (
      <header className="container slide-show">
        <span className="slide-btn prev" onClick={this.prevSlide}>
          ◄
        </span>
        <span className="slide-btn next" onClick={this.nextSlide}>
          ▶
        </span>
        <div
          className="img-wrapper d-flex slide"
          style={{ transform: `translate(-${this.state.index}%)` }}
        >
          {this.props.movies.slice(0, 5).map(movie => {
            return (
              <div className="hero" key={movie.id}>
                <img
                  className="img-fluid"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt="hero"
                />
                <h3 className="display-4 p-3">{movie.title}</h3>
              </div>
            );
          })}
        </div>
      </header>
    );
  }
}

export default Header;
