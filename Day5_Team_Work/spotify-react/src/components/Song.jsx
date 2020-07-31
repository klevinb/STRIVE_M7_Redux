import React from 'react';

function Song(props) {
    return (
        <div key={props.song.id}>
            <div className="d-flex justify-content-between">
                <p><i className="fa fa-music pr-3"></i>{props.song.title}</p>
                <p>{props.song.duration / 100}</p>
            </div>
            <div className="text-left">
                <p>{props.song.artist.name}</p>
            </div>
        </div>
    );
}

export default Song;