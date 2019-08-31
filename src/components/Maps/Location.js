import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import dotenv from 'dotenv';

dotenv.config();
const tfKey = process.env.REACT_APP_THUNDERFOREST_KEY;

const LocationMap = (props) => {
  
  const position = [props.lat, props.lng];
  const baseMap = props.baseMap;

  return (
    <Map center={position} zoom={Number(props.zoom)}>
    <TileLayer
        attribution={baseMap.attribution}
        url={(baseMap.apiKey) ? `${baseMap.url}?apikey=${tfKey}`: baseMap.url}
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