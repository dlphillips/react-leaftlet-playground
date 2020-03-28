import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import dotenv from 'dotenv'

dotenv.config()
const tfKey = process.env.REACT_APP_THUNDERFOREST_KEY

const LocationMap = props => {
  const { baseMap, street, city, state, zip, onMapMove, lat, lng } = props
  const position = [lat, lng]

  return (
    <Map center={position} zoom={Number(props.zoom)} onMoveend={onMapMove}>
      <TileLayer
        attribution={baseMap.attribution}
        url={baseMap.apiKey ? `${baseMap.url}?apikey=${tfKey}` : baseMap.url}
      />
      <Marker position={position}>
        {!street && <Popup>{`Lat: ${lat} Lon: ${lng}`}</Popup>}
        {street && (
          <Popup>
            {street} <br /> {`${city}, ${state} ${zip}`}
          </Popup>
        )}
      </Marker>
    </Map>
  )
}

export default LocationMap
