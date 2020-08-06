import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { APIResult } from "../types/type";

import { SetStateAction } from "react";
import { Dispatch } from "react";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchResult, setSeachResult]: [
    APIResult,
    Dispatch<SetStateAction<APIResult>>
  ] = useState({
    data: [
      {
        album: {
          cover: "",
          cover_big: "",
          cover_medium: "",
          cover_small: "",
          cover_xl: "",
          id: 0,
          title: "",
          tracklist: "",
          type: "",
        },
        artist: {
          id: 0,
          link: "",
          name: "",
          picture: "",
          picture_big: "",
          picture_medium: "",
          picture_small: "",
          picture_xl: "",
          tracklist: "",
          type: "",
        },
        duration: 0,
        explicit_content_cover: 0,
        explicit_content_lyrics: 0,
        explicit_lyrics: false,
        id: 0,
        link: "",
        preview: "",
        rank: 0,
        readable: false,
        title: "",
        title_short: "",
        title_version: "",
        type: "",
      },
    ],
    next: "",
    total: 0,
  });

  const keyPress = (e: any) => {
    if (e.key === "Enter" && search.length) {
      fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
        },
      })
        .then((resp) => resp.json())
        .then((respResult) => setSeachResult(respResult));
    }
  };

  return (
    <Row>
      <Col className='d-flex justify-content-center' sm={12}>
        <FormControl
          id='searchField'
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value.toLowerCase())}
          onKeyDown={(e: any) => keyPress(e)}
          className='mr-sm-2'
        />
      </Col>
      <Col className='songSearch' sm={12}>
        <Row className='row-cols-1 row-cols-md-3 row-cols-lg-4'>
          {searchResult &&
            searchResult.data.map((song, key) => (
              <Col className='d-flex-justify-content-center' sm={12}>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src={song.album.cover_xl} />
                    <Card.Title>{song.title_short}</Card.Title>
                    <Card.Text>
                      {song.artist.name} {song.album.title}
                    </Card.Text>
                    {song.album.title.length > 1 &&
                    song.album.title.includes(song.title_short) ? (
                      <Button className='play'>PLAY</Button>
                    ) : (
                      <>
                        {song.album.title.length > 1 && (
                          <div className='d-flex flex-column'>
                            <Button className='play'>PLAY</Button>
                            <Button variant='info'>Go to Album Page</Button>
                          </div>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
}

export default SearchPage;
