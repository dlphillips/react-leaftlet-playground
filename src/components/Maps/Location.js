import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationMap = (props) => {
  
  const position = [props.lat, props.lng];
  
  return (
    <Map center={position} zoom={Number(props.zoom)}>
    <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
        <Popup>
        #4 Private Drive <br /> Ocean Isle Beach, NC.
        </Popup>
    </Marker>
    </Map>
  );
}

export default LocationMap;