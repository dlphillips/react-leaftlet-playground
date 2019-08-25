import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddressForm from './components/address.js'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  const state = {
    lat: 33.885498,
    lng: -78.446958,
    zoom: 13,
  }

  const position = [state.lat, state.lng];
  
  return (
    <div className="App">
      <div className={classes.root}>
      <Grid container style={{ padding: 10 }} spacing={1}>
        <Grid item xs={12} sm={12}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <p>
                Simple react-leaflet example started with create-react-app.
              </p>
          </header>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressForm/>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
    </div>
    </div>
  );
}

export default App;
