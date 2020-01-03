import React, { Component } from "react";

export class Filter extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Trending</li>
          <li>Popular</li>
          <li>Best rated</li>
        </ul>
      </div>
    );
  }
}

export default Filter;
