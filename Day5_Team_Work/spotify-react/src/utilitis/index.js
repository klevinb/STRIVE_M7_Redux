export const fetchAlbumsWithThunk = () => {
  let albums = [];
  const artistsArray = [
    "halsey",
    "eminem",
    "adele",
    "drake",
    "jessie",
    "stormzy",
  ];
  return (dispatch, getState) => {
    let promises = [];
    artistsArray.forEach((artist) =>
      promises.push(
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
          },
        })
          .then((resp) => resp.json())
          .then((respObj) => albums.push(respObj.data[8]))
      )
    );
    Promise.all(promises)
      .then(() => console.log("its done"))
      .then(() =>
        dispatch({
          type: "FETCH_ALBUMS",
          payload: albums,
        })
      );
  };
};

export const fetchAlbumInfos = (id) => {
  return (dispatch, getState) => {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + id, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
      },
    })
      .then((res) => res.json())
      .then((respObj) =>
        dispatch({
          type: "FETCH_ALBUM_INFO",
          payload: respObj,
        })
      );
  };
};
