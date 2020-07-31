import React, { Component } from "react";
import { Image, Col, Row, Spinner } from "react-bootstrap";
import Song from "./Song";
import "./MainCss.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAlbumInfos } from "../utilitis";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  fetchAlbumInfo: (id) => dispatch(fetchAlbumInfos(id)),
});
class AlbumDetails extends Component {
  componentDidMount() {
    this.props.fetchAlbumInfo(this.props.match.params.id);
  }
  render() {
    return (
      <>
        {console.log(this.props.albumInfo)}
        {this.props.albumInfo && (
          <Col md={10} className='col-10 gray-bg'>
            <Row className='row row-cols-xs-1'>
              <div
                id='content'
                className='col-12 col-md-4 d-flex justify-content-end'
              >
                <div id='artist' className='card mt-5'>
                  <Image
                    onClick={this.showComments}
                    src={this.props.albumInfo.cover_xl}
                    style={{ height: "250px" }}
                  />
                  <p></p>
                  <h4 id='label1'>
                    {this.props.albumInfo.artist.name} -{" "}
                    {this.props.albumInfo.title}
                  </h4>
                  <button type='button' className='btn'>
                    PLAY
                  </button>
                  <Link to={"/artistdetails/" + this.props.albumInfo.artist.id}>
                    <label id='label2'>
                      {this.props.albumInfo.artist.name}
                    </label>
                  </Link>
                </div>
              </div>
              <div id='songs' className='col'>
                <div className='card'>
                  {this.props.albumInfo.tracks.data.map((song, i) => (
                    <Song key={i} song={song} />
                  ))}
                </div>
              </div>
            </Row>
          </Col>
        )}
        {this.props.loading.albumInfo && (
          <Col md={10} style={{ height: "90vh" }} className='col-10 gray-bg'>
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);
