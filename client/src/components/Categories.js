import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Categories extends Component {
  render() {
    return (
      <div>
        <ul className="row justify-content-around m-5">
          <li>
            <Link
              to="/home/upcoming"
              className="upcoming"
              onClick={this.props.categories}
            >
              Upcoming
            </Link>
          </li>
          <li>
            <Link
              to="/home/popular"
              className="popular"
              onClick={this.props.categories}
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/home/toprated"
              className="top_rated"
              onClick={this.props.categories}
            >
              Top Rated
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Categories;
