import React from "react";
import "./MainCss.css";
import { InputGroup, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className='row light-gray-bg'
        >
          <div className='col-3 d-flex p-2 pl-2 align-center footer_hide'>
            <Image src='/assets/avatar.png' width='45px' height='45px' />
            <div className='pb-0 mb-0'>
              <p id='songTitle' className='pl-3 p-0 m-0'></p>
              <label id='artistName' className='pl-3 '></label>
            </div>
            <i className='fa fa-heart ml-3 pt-3'></i>
            <i className='fa fa-window-maximize ml-3 pt-3'></i>
          </div>
          <div className='col p-1'>
            <div className='row-1'>
              <div
                id='icons'
                className='col d-flex justify-content-center align-center'
              >
                <Button>
                  <i className='fa fa-random pr-2 pt-1'></i>
                </Button>
                <Button id='playBack'>
                  <i className='fa fa-step-backward pr-2 pt-1'></i>
                </Button>
                <Button id='play' onClick={this.togglePlay}>
                  <audio
                    id='audio'
                    ref={(audio) => {
                      this.audio = audio;
                    }}
                    src={this.props.selectedSong}
                  ></audio>
                  <i className='fa fa-play-circle pr-2'></i>
                </Button>
                <Button id='playNext'>
                  <i className='fa fa-step-forward pr-2 pt-1'></i>
                </Button>
                <Button id='loop'>
                  <i className='fa fa-retweet pt-1'></i>
                </Button>
              </div>
              <div className='col d-flex footer_hide'>
                <label id='currentSongTime'>0:00</label>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow='25'
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
                <label id='songLength'>2:54</label>
              </div>
            </div>
          </div>
          <div className='col-3 d-flex p-2 pl-2 justify-content-end align-center footer_hide'>
            <Button>
              <i className='fa fa-bars ml-3 pt-3'></i>
            </Button>
            <Button>
              <i className='fa fa-headphones ml-3 pt-3'></i>
            </Button>
            <Button id='volumeIcon'>
              <i className='fa fa-volume-up ml-3 pt-3'></i>
            </Button>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(mapStateToProps)(Footer);
