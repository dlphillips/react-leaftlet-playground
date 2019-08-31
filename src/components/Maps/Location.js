import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import dotenv from 'dotenv';

dotenv.config();
const tfKey = process.env.REACT_APP_THUNDERFOREST_KEY;

const LocationMap = (props) => {
  
  const position = [props.lat, props.lng];
  const { baseMap, street, city, state, zip } = props;

  return (
    <Map center={position} zoom={Number(props.zoom)}>
      <TileLayer
          attribution={baseMap.attribution}
          url={(baseMap.apiKey) ? `${baseMap.url}?apikey=${tfKey}`: baseMap.url}
      />
      <Marker position={position}>
          { street &&
          <Popup>
            {street} <br /> {`${city}, ${state} ${zip}`}
          </Popup>
          }
      </Marker>
    </Map>
  );
}

export default LocationMap;