import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

function MapContainer(props: any) {
  return (
    <>
      <Map
        google={props.google}
        style={mapStyles}
        initialCenter={{ lat: props.lat, lng: props.lng }}
        zoom={2}
      >
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      </Map>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
})(MapContainer);
