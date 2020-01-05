import React, { Component } from "react";

export class MovieInfo extends Component {
  closeModal = () => {
    console.log("clicked");
    document.querySelector(".modal").classList.remove("show");
    document.querySelector("iframe").src = "";
  };
  render() {
    return (
      <div className="modal">
        <span className="close" onClick={this.closeModal}>
          &times;
        </span>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content p-4"
            style={{
              background: `url(
              https://image.tmdb.org/t/p/original/${this.props.movieInfo.backdropPath}
            ) no-repeat`
            }}
          >
            <div className="modal-body row p-0 justify-content-around align-items-center">
              <div className="info col-lg-5">
                <h3 className="display-4 font-weight-bold">
                  {this.props.movieInfo.title}
                </h3>
                <p>{this.props.movieInfo.overview}</p>
              </div>
              <div className="trailer col-lg-6 p-0">
                <div className="videoWrapper">
                  <iframe
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${this.props.movieInfo.trailer}?&autoplay=1&mute=1&`}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieInfo;
