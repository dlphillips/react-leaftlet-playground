import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {

  const state = {
    lat: 33.885498,
    lng: -78.446958,
    zoom: 13,
  }

  const position = [state.lat, state.lng];
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Simple react-leaflet example started with create-react-app.
        </p>
        <a
          className="App-link pad-bottom"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link pad-bottom"
          href="https://react-leaflet.js.org/en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React-Leaflet
        </a>
        <Map center={position} zoom={state.zoom}>
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
      </header>
    </div>
  );
}

export default App;
