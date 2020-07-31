import React, { Component } from "react";
import "./MainCss.css";
import "./ContentCss.css";
import { Col, Image, Button, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAlbumsWithThunk } from "../utilitis/";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbumsWithThunk()),
});

class Content extends Component {
  componentDidMount = async () => {
    this.props.fetchAlbums();
  };

  render() {
    return (
      <>
        {this.props.loading.albums ? (
          <Col md={10} className='myAlbum' style={{ height: "90vh" }}>
            <div
              className='d-flex justify-content-center'
              style={{ height: "400px", marginBottom: "150px" }}
            >
              <Spinner
                className='align-self-center'
                animation='border'
                variant='light'
              />
            </div>

            <div
              id='artistCards'
              className='row row-cols-1 row-cols-sm-2  row-cols-md-4 row-cols-lg-6 bolder justify-content-center '
              id='removeMarg'
            >
              <>
                {[1, 2, 3].map((item, i) => (
                  <Row key={i} className='row row-cols-xs-1'>
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
                  </Row>
                ))}
              </>
            </div>
          </Col>
        ) : (
          <Col md={10} className='myAlbum'>
            <div
              className=' d-flex  bolder justify-content-center'
              id='imgBackground'
            >
              <div id='text_alg' className=' flex-column'>
                <p>33.000 MONTHLY USERS</p>
                <h1>Eminem</h1>

                <div className='  flex-row  justify-content-center'>
                  <Button className='btn btn-primary btn1'>Play</Button>
                  <Button className='btn btn-outline-primary btn2'>
                    Follow
                  </Button>
                  <Button className='btn btn-outline-primary btn3'>
                    {" "}
                    <i className='fa'>&#xf141;</i>{" "}
                  </Button>
                </div>

                <div className=' menu bolder'>
                  {console.log(this.state)}
                  <a href='artistPage.html' className='a1'>
                    OVERVIEW
                  </a>
                  <a href='artistPage.html' className='a1'>
                    RELATED ARTISTS
                  </a>
                  <a href='artistPage.html' className='a1'>
                    ABOUT
                  </a>
                </div>
              </div>
            </div>

            <div id='content'>
              <div className='container mt-3 justify-content-center '>
                <div className='row  '>
                  <h4 className='bolder pr-3'> Albums</h4>
                  <hr></hr>
                </div>
              </div>

              <div
                id='artistCards'
                className='row row-cols-1 row-cols-sm-2  row-cols-md-4 row-cols-lg-6 bolder justify-content-center '
                id='removeMarg'
              >
                {this.props.albums &&
                  this.props.albums.map((album) => (
                    <>
                      <Col md={2} className='mr-3'>
                        <div className='card' style={{ width: "10rem" }}>
                          <Link to={"/albumdetails/" + album.album.id}>
                            <Image
                              fluid
                              src={album.album.cover_xl}
                              className='card-img-top'
                            />
                          </Link>
                          <div className='card-body d-flex justify-content-between flex-column'>
                            <Link to={"/artistdetails/" + album.artist.id}>
                              <h5 className='card-title'>
                                {album.artist.name}
                              </h5>
                            </Link>
                            <p className='card-text '>{album.album.title}</p>
                          </div>
                        </div>
                      </Col>
                    </>
                  ))}
              </div>
            </div>
          </Col>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
