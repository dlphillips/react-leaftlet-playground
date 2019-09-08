import React, { useState } from 'react'
import './App.css'
import fetch from 'node-fetch'
import Grid from '@material-ui/core/Grid'
import AppBar from './components/AppBar.js'
import { makeStyles } from '@material-ui/core/styles'
import LocationMap from './components/Maps/Location.js'
import BaseMapSelect from './components/BaseMapSelect.js'
import BaseMapSelectDrawer from './components/BaseMapSelectDrawer.js'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'
import changeCase from 'change-case'

import dotenv from 'dotenv'

import * as tileLayers from './components/Maps/tileLayers.json'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#282c34'
    }
  },
  root: {
    flexGrow: 1,
    padding: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  containerClasses: {
    backgroundColor: '#fff',
    padding: '10px'
  }
}))

const App = () => {
  dotenv.config()
  const mqKey = process.env.REACT_APP_MAPQUEST_KEY

  const [lng, setLng] = useState(-85)
  const [lat, setLat] = useState(34)
  const [resStreet, setResStreet] = useState('')
  const [resCity, setResCity] = useState('')
  const [resState, setResState] = useState('')
  const [resZip, setResZip] = useState('')
  const [inputError, setInputError] = useState('')
  const [drawerState, setDrawerState] = React.useState(false)
  const [baseMap, setBaseMap] = useState('OpenStreetMap')

  const classes = useStyles()

  const geocodeSearch = searchValue => {
    if (searchValue.indexOf('/') > -1) {
      const searchSplit = searchValue.split('/')
      const company = searchSplit[0].split().join()
      const companyPascal = changeCase.pascalCase(company)
      const address = searchSplit[1].split(' ').join('+')
      fetch(
        `https://www.mapquestapi.com/geocoding/v1/address?key=${mqKey}&inFormat=kvp&outFormat=json&location=${address}&thumbMaps=false`
      )
        .then(res => res.json())
        .then(json => {
          setLng(json.results[0].locations[0].displayLatLng.lng)
          setLat(json.results[0].locations[0].displayLatLng.lat)
          setResStreet(json.results[0].locations[0].street)
          setResCity(json.results[0].locations[0].adminArea5)
          setResState(json.results[0].locations[0].adminArea3)
          setResZip(json.results[0].locations[0].postalCode)
          console.log(companyPascal)
          console.log(
            changeCase.pascalCase(json.results[0].locations[0].adminArea5) +
              '_' +
              json.results[0].locations[0].adminArea3
          )
        })
    } else {
      setInputError('No company submitted. Please try again')
    }
  }

  const getBaseLayer = baseMap => {
    setBaseMap(baseMap)
  }

  const getBaseMapObject = baseMap => {
    const baseMapObj = tileLayers.layers.find(o => o.name === baseMap)
    return baseMapObj
  }

  const toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    console.log(event)
    setDrawerState(!drawerState)
  }

  const reportError = () => {
    toast.notify(inputError)
    setInputError('')
  }

  return (
    <div className='App'>
      <div className={classes.root}>
        {inputError && reportError()}
        <BaseMapSelectDrawer
          toggleDrawer={toggleDrawer}
          drawerState={drawerState}
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <AppBar
              handleSearch={geocodeSearch}
              drawerState={drawerState}
              toggleDrawer={toggleDrawer}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container className={classes.containerClasses}>
              <Grid item xs={12} sm={12}>
                <BaseMapSelect getBaseLayer={getBaseLayer} />
              </Grid>
            </Grid>
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
  )
}

export default App
