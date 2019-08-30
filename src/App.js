import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from 'node-fetch';
import Grid from '@material-ui/core/Grid';
import AddressForm from './components/AddressForm.js'
import { makeStyles } from '@material-ui/core/styles';
import LocationMap from './components/Maps/Location.js'
import dotenv from 'dotenv';

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

const App = () => {

  dotenv.config();
  const mqKey = process.env.REACT_APP_MAPQUEST_KEY;

  const [lng, setLng] = useState(-85);
  const [lat, setLat] = useState(34);

  const classes = useStyles();

  const getFormValues = (address, city, state, zip, value) => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${mqKey}&inFormat=kvp&outFormat=json&location=${address}+${city}+${state}+${zip}&thumbMaps=false`)
      .then(res => res.json())
      .then(json => {
        setLng(json.results[0].locations[0].displayLatLng.lng);
        setLat(json.results[0].locations[0].displayLatLng.lat);
        console.log(value);
      });
  }

  return (
    <div className="App">
      <div className={classes.root}>
      <Grid container style={{ padding: 10 }} spacing={1}>
        <Grid item xs={12} sm={12}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <p>
                Simple react-leaflet example created with create-react-app.
              </p>
          </header>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AddressForm
            getFormValues={getFormValues}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LocationMap
            lat={lat}
            lng={lng}
            zoom='13'
          />
        </Grid>
      </Grid>
    </div>
    </div>
  );
}

export default App;
