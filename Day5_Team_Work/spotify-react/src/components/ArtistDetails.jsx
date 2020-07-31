import React, { Component } from "react";
import { Image, Col, Row, Spinner } from "react-bootstrap";
import "./MainCss.css";

class ArtistDetails extends Component {
  state = {
    loading: true,
    artist: undefined,
    artistTopSongs: undefined,
  };

  componentDidMount = async () => {
    Promise.all([
      fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
          this.props.match.params.id,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
          },
        }
      )
        .then((res) => res.json())
        .then((respObj) =>
          this.setState({
            artist: respObj,
          })
        ),
      fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
          this.props.match.params.id +
          "/top?limit=50",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
          },
        }
      )
        .then((res) => res.json())
        .then((respObj) =>
          this.setState({
            artistTopSongs: respObj,
          })
        ),
    ])
      .then(() =>
        this.setState({
          loading: false,
        })
      )
      .catch((err) => {});
  };
  render() {
    return (
      <>
        {this.state.artist && (
          <Col md={10} className='col-10 gray-bg'>
            <Row className='row row-cols-xs-1'>
              <div
                id='content'
                className='col-12 col-md-4 d-flex justify-content-end'
              >
                <div id='artist' className='card mt-5'>
                  <Image
                    src={this.state.artist.picture_xl}
                    style={{ height: "250px" }}
                  />
                  <p></p>
                  <h4 id='label1'>{this.state.artist.name} - Top 50</h4>
                  <button type='button' className='btn'>
                    PLAY
                  </button>
                  <label id='label2'></label>
                </div>
              </div>
              <div id='songs' className='col'>
                <div className='card'>
                  {this.state.artistTopSongs &&
                    this.state.artistTopSongs.data.map((song, i) => (
                      <div key={i}>
                        <div className='d-flex justify-content-between'>
                          <p>
                            <i className='fa fa-music pr-3'></i>
                            {song.title}
                          </p>
                          <p>{song.duration / 100}</p>
                        </div>
                        <div className='text-left'>
                          <p>{song.artist.name}</p>
                        </div>
                        <p className='songNr'>{i}</p>
                      </div>
                    ))}
                </div>
              </div>
            </Row>
          </Col>
        )}
        {this.state.loading && (
          <Col md={10} style={{ height: "90vh" }} className='col-10 gray-bg'>
            {console.log(this.props)}
            <Row className='row row-cols-xs-1'>
              <div
                id='content'
                className='col-12 col-md-4 d-flex justify-content-end'
              >
                <Spinner
                  className='align-self-center'
                  animation='border'
                  variant='light'
                />
              </div>
              <div id='songs' className='col pt-5'>
                <Spinner
                  className='align-self-center'
                  animation='border'
                  variant='light'
                />
              </div>
            </Row>
          </Col>
        )}
      </>
    );
  }
}

export default ArtistDetails;
