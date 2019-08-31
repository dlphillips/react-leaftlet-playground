import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from 'node-fetch';
import Grid from '@material-ui/core/Grid';
import AddressForm from './components/AddressForm.js'
import { makeStyles } from '@material-ui/core/styles';
import LocationMap from './components/Maps/Location.js'
import BaseMapSelect from './components/BaseMapSelect.js'

import dotenv from 'dotenv';

import * as tileLayers from './components/Maps/tileLayers.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const App = () => {

  dotenv.config();
  const mqKey = process.env.REACT_APP_MAPQUEST_KEY;

  const [lng, setLng] = useState(-85);
  const [lat, setLat] = useState(34);
  const [resStreet, setResStreet] = useState('');
  const [resCity, setResCity] = useState('');
  const [resState, setResState] = useState('');
  const [resZip, setResZip] = useState('');

  const [baseMap, setBaseMap] = useState('Thunderforest - Neighbourhood');

  const classes = useStyles();

  const getFormValues = (address, city, state, zip) => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${mqKey}&inFormat=kvp&outFormat=json&location=${address}+${city}+${state}+${zip}&thumbMaps=false`)
      .then(res => res.json())
      .then(json => {
        setLng(json.results[0].locations[0].displayLatLng.lng);
        setLat(json.results[0].locations[0].displayLatLng.lat);
        setResStreet(json.results[0].locations[0].street);
        setResCity(json.results[0].locations[0].adminArea5);
        setResState(json.results[0].locations[0].adminArea3);
        setResZip(json.results[0].locations[0].postalCode);
        console.log(json.results[0]);
      });
  }

  const getBaseLayer = (baseMap) => {
    setBaseMap(baseMap);
  }

  const getBaseMapObject = (baseMap) => {
    const baseMapObj = tileLayers.layers.find(o => o.name === baseMap)
    return baseMapObj
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
          <BaseMapSelect
            getBaseLayer={getBaseLayer}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LocationMap
            lat={lat}
            lng={lng}
            street={resStreet}
            city={resCity}
            state={resState}
            zip={resZip}
            zoom='13'
            baseMap={getBaseMapObject(baseMap)}
          />
        </Grid>
      </Grid>
    </div>
    </div>
  );
}

export default App;
