import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import List from "./components/List";
import Filter from "./components/Filter";
import MovieInfo from "./components/MovieInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import "./css/App.css";

export class App extends Component {
  state = {
    page: 1,
    movies: [],

    movieInfo: {
      title: undefined,
      overview: undefined,
      backdropPath: undefined,
      trailer: undefined
    }
  };
  componentDidMount(page) {
    fetch("/discover", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.parseData(data);
        console.log(data.total_pages);
      });
  }

  parseData = data => {
    this.setState({
      movies: this.state.movies.concat(data.results),
      page: data.page
    });
  };

  loadMore = () => {
    let page_number = this.state.page;

    // this.componentDidMount(page_number + 1);
  };

  showInfo = (overview, backdrop_path, id, title) => {
    console.log("clicked");
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8b3aa7357a1283c0b7821398836c387f&language=en-US`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          movieInfo: {
            overview,
            backdropPath: backdrop_path,
            trailer: data.results[0].key,
            title: title
          }
        });
      });
    document.querySelector(".modal").classList.add("show");
  };

  mouseEnter = e => {
    let movies = document.querySelectorAll(".movie");
    movies.forEach(movie => {
      movie.classList.add("gray-scale");
    });
    e.target.classList.remove("gray-scale");
  };
  mouseLeave = () => {
    let movies = document.querySelectorAll(".movie");
    movies.forEach(movie => {
      movie.classList.remove("gray-scale");
    });
  };

  searchMovie = e => {
    console.log(e);
    this.setState({ movies: [] });
    fetch("/search")
      .then(res => res.json())
      .then(data => {
        this.parseData(data);
        console.log(data);
      });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav searchMovie={this.searchMovie} />
          <Header
            mouseEnter={this.mouseEnter}
            mouseLeave={this.mouseLeave}
            movies={this.state.movies}
            showInfo={this.showInfo}
          />
          <Filter />
          <MovieInfo movieInfo={this.state.movieInfo} />
          <Route
            path="/"
            render={props => (
              <React.Fragment>
                <div className="container-fluid">
                  <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={this.loadMore}
                    hasMore={true}
                    className="row movie-wrapper"
                    loader={
                      <div className="loader" key={0}>
                        Loading ...
                      </div>
                    }
                  >
                    <List
                      mouseEnter={this.mouseEnter}
                      mouseLeave={this.mouseLeave}
                      movies={this.state.movies}
                      showInfo={this.showInfo}
                    />
                  </InfiniteScroll>
                </div>
              </React.Fragment>
            )}
          />
          <Route
            path="/search"
            render={props => (
              <React.Fragment>
                <div className="container-fluid">
                  <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={this.loadMore}
                    hasMore={true}
                    className="row movie-wrapper"
                    loader={
                      <div className="loader" key={0}>
                        Loading ...
                      </div>
                    }
                  >
                    <List
                      mouseEnter={this.mouseEnter}
                      mouseLeave={this.mouseLeave}
                      movies={this.state.movies}
                      showInfo={this.showInfo}
                    />
                  </InfiniteScroll>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
