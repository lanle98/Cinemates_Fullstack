import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import List from "./components/List";
import Categories from "./components/Categories";
import MovieInfo from "./components/MovieInfo";
import queryString from "query-string";

import InfiniteScroll from "react-infinite-scroll-component";
import "./css/App.css";

export class App extends Component {
  state = {
    page: "1",
    movies: [],
    search: undefined,
    path: undefined,

    movieInfo: {
      title: undefined,
      overview: undefined,
      backdropPath: undefined,
      trailer: undefined
    }
  };

  // when component mount
  componentDidMount() {
    // this.setState({ movies: [] });
    // this.home();

    let value = queryString.parse(window.location.search);
    let input = value.input;
    if (input === undefined) {
      this.home();
    } else {
      this.setState({ search: input });
      this.searchMovie(input);
    }

    // this.searchMovie(this.state.search);
  }

  //home path
  home = () => {
    this.setState({ movies: [], search: undefined });
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
  };

  //parse data from fetch
  parseData = data => {
    this.setState({
      movies: this.state.movies.concat(data.results),
      page: data.page
    });
  };

  //infinite load
  // loadMore = () => {
  //   this.setState({ page: this.state.page + 1 });
  //   fetch(`/categories/${this.state.path}?page=${this.state.page}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.parseData(data);
  //       console.log(data);
  //     });
  // };

  //show info on click
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

  //hover effect
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

  //search path
  searchMovie = input => {
    console.log(input);
    this.setState({ movies: [], search: input });
    fetch(`/search?input=${input}&page=${this.state.page}`)
      .then(res => res.json())
      .then(data => {
        this.parseData(data);
        console.log(data);
      });
  };

  //categories path
  categories = e => {
    // e.preventDefault();
    let path = e.target.innerHTML.replace(/ /g, "").toLowerCase();
    this.setState({ movies: [], path: path });
    fetch(`/categories/${path}?page=${this.state.page}`)
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
          <MovieInfo movieInfo={this.state.movieInfo} />
          <Nav home={this.home} searchMovie={this.searchMovie} />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              path="/home"
              render={props => (
                <React.Fragment>
                  <Header
                    mouseEnter={this.mouseEnter}
                    mouseLeave={this.mouseLeave}
                    movies={this.state.movies}
                    showInfo={this.showInfo}
                  />

                  <Categories categories={this.categories} />

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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
